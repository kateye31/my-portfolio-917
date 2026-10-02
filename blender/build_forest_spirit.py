"""Builds a chubby forest-spirit (Totoro-style fan art) and exports it as a .glb.

Run headless:
  blender --background --python blender/build_forest_spirit.py -- public/models/forest-spirit.glb [preview.png]
"""
import math
import sys

import bpy
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT = argv[0] if argv else "forest-spirit.glb"
PREVIEW = argv[1] if len(argv) > 1 else None

bpy.ops.wm.read_factory_settings(use_empty=True)


def mat(name, hex_color, rough=0.9):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    h = hex_color.lstrip("#")
    rgb = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in rgb]
    bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*lin, 1)
    bsdf.inputs["Roughness"].default_value = rough
    return m


FUR = mat("fur", "#868c95")
FUR_DARK = mat("fur_dark", "#5d636c")
BELLY = mat("belly", "#efe6cc")
INK = mat("ink", "#2b2724")
WHITE = mat("eye_white", "#fffdf6")
LEAF = mat("leaf", "#7fb069")
STEM = mat("stem", "#5b8a4a")
BLUSH = mat("blush", "#f2a7b5")


def smooth(obj, levels=2):
    mod = obj.modifiers.new("subd", "SUBSURF")
    mod.levels = levels
    mod.render_levels = levels
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.shade_smooth()


def blob(name, loc, scale, material, rot=(0, 0, 0), segs=32):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segs, ring_count=segs // 2, location=loc, rotation=rot)
    o = bpy.context.active_object
    o.name = name
    o.scale = scale
    o.data.materials.append(material)
    bpy.ops.object.shade_smooth()
    return o


def tube(name, points, radius, material):
    """A thin inked line through 3D points (mouth, whiskers)."""
    cd = bpy.data.curves.new(name, "CURVE")
    cd.dimensions = "3D"
    cd.bevel_depth = radius
    cd.bevel_resolution = 3
    cd.use_fill_caps = True
    sp = cd.splines.new("POLY")
    sp.points.add(len(points) - 1)
    for pt, co in zip(sp.points, points):
        pt.co = (*co, 1)
    o = bpy.data.objects.new(name, cd)
    bpy.context.collection.objects.link(o)
    o.data.materials.append(material)
    bpy.ops.object.select_all(action="DESELECT")
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.convert(target="MESH")
    bpy.ops.object.shade_smooth()
    return bpy.context.active_object


parts = []

# body: one big soft pear (Totoro's head and body are a single shape)
BODY_C, BODY_S = 1.05, (1.0, 0.86, 1.12)


def squash(lz):
    return 1.0 + 0.24 * max(0.0, -lz)  # fatter hips


body = blob("body", (0, 0, BODY_C), BODY_S, FUR, segs=64)
for v in body.data.vertices:
    z = v.co.z
    v.co.x *= squash(z)
    v.co.y *= squash(z)
    if z < -0.75:
        v.co.z = -0.75 + (z + 0.75) * 0.35  # flat-ish bottom so it sits
parts.append(body)


def front_y(x, z, lift=0.0):
    """y of the body's front surface at (x, z); features sit just on top of it."""
    lz = (z - BODY_C) / BODY_S[2]
    lx = x / (BODY_S[0] * squash(lz))
    t = max(1 - lx * lx - lz * lz, 0.0)
    return -BODY_S[1] * squash(lz) * math.sqrt(t) - lift


# belly patch: big cream oval from the chest down
BELLY_C, BELLY_S = (0, -0.5, 0.82), (0.78, 0.5, 0.66)
parts.append(blob("belly", BELLY_C, BELLY_S, BELLY, segs=48))


def belly_y(x, z):
    t = 1 - (x / BELLY_S[0]) ** 2 - ((z - BELLY_C[2]) / BELLY_S[2]) ** 2
    return BELLY_C[1] - BELLY_S[1] * math.sqrt(max(t, 0)) - 0.004


# the classic ^ markings: 3 on top, 4 below
for row, (z, xs) in enumerate([(1.27, (-0.25, 0.0, 0.25)), (1.06, (-0.375, -0.125, 0.125, 0.375))]):
    for x in xs:
        for side in (-1, 1):
            cx = x + side * 0.062
            cz = z - 0.025
            bpy.ops.mesh.primitive_cube_add(size=1, location=(cx, belly_y(cx, cz), cz))
            c = bpy.context.active_object
            c.scale = (0.15, 0.03, 0.05)
            # tilt in the front (XZ) plane so each pair forms a ^, and lean back with the belly curve
            c.rotation_euler = (0.25 + 0.35 * (z - BELLY_C[2]), side * 0.6, 0)
            c.data.materials.append(FUR_DARK)
            c.name = f"chevron_{row}"
            smooth(c, 1)
            parts.append(c)

# ears: tall and pointed, straight up on top of the head
for side in (-1, 1):
    bpy.ops.mesh.primitive_cone_add(vertices=24, radius1=0.16, radius2=0.015, depth=0.75,
                                    location=(side * 0.36, 0.0, 2.3), rotation=(0, side * 0.12, 0))
    ear = bpy.context.active_object
    ear.name = "ear"
    ear.data.materials.append(FUR)
    smooth(ear, 2)
    parts.append(ear)

# eyes: small, round and wide-set, with tiny centered pupils
for side in (-1, 1):
    ex, ez = side * 0.4, 1.8
    ey = front_y(ex, ez)
    parts.append(blob("eye", (ex, ey - 0.01, ez), (0.12, 0.05, 0.12), WHITE))
    parts.append(blob("pupil", (ex, ey - 0.055, ez), (0.05, 0.02, 0.05), INK))

# nose: small, wide and dark
parts.append(blob("nose", (0, front_y(0, 1.68) - 0.01, 1.68), (0.1, 0.04, 0.045), INK))

# the big wide grin
grin = []
for i in range(25):
    t = i / 24 * 2 - 1  # -1..1
    x = t * 0.5
    z = 1.56 - 0.07 * (1 - t * t) + 0.03 * t ** 4
    grin.append((x, front_y(x, z, 0.012), z))
parts.append(tube("mouth", grin, 0.022, INK))

# blush
for side in (-1, 1):
    bx, bz = side * 0.6, 1.62
    parts.append(blob("blush", (bx, front_y(bx, bz, -0.01), bz), (0.09, 0.03, 0.05), BLUSH, rot=(0, 0, side * -0.55)))

# whiskers: three per side, fanning out from the cheeks
for side in (-1, 1):
    for i, dz in enumerate((0.07, 0.0, -0.07)):
        sx, sz = side * 0.55, 1.68 + dz
        start = (sx, front_y(sx, sz, 0.01), sz)
        end = (side * 1.12, start[1] + 0.12, sz + dz * 1.6)
        parts.append(tube("whisker", [start, end], 0.009, INK))

# arms: stubby paws hanging close against the sides
for side in (-1, 1):
    parts.append(blob("arm", (side * 0.88, -0.12, 0.98), (0.19, 0.21, 0.5), FUR, rot=(0, side * 0.22, 0)))
    for k in (-1, 0, 1):
        parts.append(blob("claw", (side * (0.8 + k * 0.045), -0.3, 0.52), (0.022, 0.022, 0.055), INK))

# feet
for side in (-1, 1):
    parts.append(blob("foot", (side * 0.45, -0.4, 0.12), (0.32, 0.32, 0.13), FUR))
    for k in (-1, 0, 1):
        parts.append(blob("toe_claw", (side * 0.45 + k * 0.09, -0.72, 0.14), (0.022, 0.04, 0.022), INK))

# leaf hat with a stem
bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=16, location=(0.05, 0.05, 2.5))
leaf = bpy.context.active_object
leaf.name = "leaf"
leaf.scale = (0.72, 0.4, 0.07)
leaf.rotation_euler = (0.08, -0.12, 0.35)
for v in leaf.data.vertices:  # pointy tip + droop at the ends, like a little umbrella
    v.co.x = math.copysign(abs(v.co.x) ** 1.4, v.co.x)
    v.co.z -= 0.9 * (v.co.x ** 2) + 0.5 * (v.co.y ** 2)
leaf.data.materials.append(LEAF)
bpy.ops.object.shade_smooth()
parts.append(leaf)
bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=0.025, depth=0.32, location=(0.05, 0.05, 2.42))
stem = bpy.context.active_object
stem.name = "stem"
stem.data.materials.append(STEM)
parts.append(stem)

# apply modifiers so the export is plain meshes
for o in parts:
    bpy.ops.object.select_all(action="DESELECT")
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    for m in list(o.modifiers):
        bpy.ops.object.modifier_apply(modifier=m.name)

# parent everything to an empty so three.js gets one root
bpy.ops.object.empty_add(location=(0, 0, 0))
root = bpy.context.active_object
root.name = "forest_spirit"
for o in parts:
    o.parent = root

bpy.ops.export_scene.gltf(filepath=OUT, export_format="GLB", export_apply=True, export_yup=True)
print("exported", OUT)

if PREVIEW:
    scene = bpy.context.scene
    bpy.ops.object.camera_add(location=(0, -7.0, 1.6) if PREVIEW.endswith("front.png") else (2.6, -6.2, 2.2))
    cam = bpy.context.active_object
    direction = Vector((0, 0, 1.25)) - cam.location
    cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    scene.camera = cam
    bpy.ops.object.light_add(type="SUN", location=(3, -4, 6))
    bpy.context.active_object.data.energy = 3
    world = bpy.data.worlds.new("w")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs[0].default_value = (0.95, 0.92, 0.85, 1)
    scene.world = world
    scene.render.engine = "BLENDER_EEVEE_NEXT" if "BLENDER_EEVEE_NEXT" in [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items] else "BLENDER_EEVEE"
    scene.render.resolution_x = 600
    scene.render.resolution_y = 600
    scene.render.filepath = PREVIEW
    bpy.ops.render.render(write_still=True)
