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


FUR = mat("fur", "#8a9097")
BELLY = mat("belly", "#f3ead2")
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


parts = []

# body: a soft pear shape, wider at the bottom
body = blob("body", (0, 0, 1.05), (1.0, 0.88, 1.12), FUR, segs=48)
for v in body.data.vertices:
    z = v.co.z
    squash = 1.0 + 0.22 * max(0.0, -z)  # fatter hips
    v.co.x *= squash
    v.co.y *= squash
    if z < -0.75:
        v.co.z = -0.75 + (z + 0.75) * 0.35  # flat-ish bottom so it sits
parts.append(body)

# belly patch
belly = blob("belly", (0, -0.45, 1.0), (0.72, 0.5, 0.85), BELLY, segs=40)
parts.append(belly)

# chevron markings on the belly (little upside-down V's)
def belly_y(x, z):
    t = 1 - (x / 0.72) ** 2 - ((z - 1.0) / 0.85) ** 2
    return -0.45 - 0.5 * math.sqrt(max(t, 0)) - 0.005


for row, (z, xs) in enumerate([(1.4, (-0.2, 0.0, 0.2)), (1.22, (-0.32, -0.1, 0.1, 0.32))]):
    for x in xs:
        for side in (-1, 1):
            cx = x + side * 0.045
            bpy.ops.mesh.primitive_cube_add(size=1, location=(cx, belly_y(cx, z), z))
            c = bpy.context.active_object
            c.scale = (0.1, 0.03, 0.025)
            c.rotation_euler = (0.12, 0, side * -0.6)
            c.data.materials.append(FUR)
            c.name = f"chevron_{row}"
            smooth(c, 1)
            parts.append(c)

# ears: tall pointy cones, a little splayed
for side in (-1, 1):
    bpy.ops.mesh.primitive_cone_add(vertices=24, radius1=0.17, radius2=0.02, depth=0.7,
                                    location=(side * 0.38, 0.05, 2.28), rotation=(0, side * 0.18, 0))
    ear = bpy.context.active_object
    ear.name = "ear"
    ear.data.materials.append(FUR)
    smooth(ear, 2)
    parts.append(ear)

# eyes: white circles with small centered pupils
for side in (-1, 1):
    parts.append(blob("eye", (side * 0.34, -0.66, 1.78), (0.15, 0.06, 0.15), WHITE))
    parts.append(blob("pupil", (side * 0.34, -0.71, 1.78), (0.065, 0.03, 0.065), INK))

# nose
parts.append(blob("nose", (0, -0.8, 1.66), (0.09, 0.05, 0.05), INK))

# blush
for side in (-1, 1):
    parts.append(blob("blush", (side * 0.55, -0.6, 1.58), (0.1, 0.03, 0.06), BLUSH, rot=(0, 0, side * -0.5)))

# whiskers: three per side
for side in (-1, 1):
    for i, tilt in enumerate((0.18, 0.0, -0.18)):
        length = 0.55
        bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=0.012, depth=length,
                                            location=(side * 0.78, -0.62, 1.62 + i * -0.07))
        w = bpy.context.active_object
        w.rotation_euler = (0, math.pi / 2 + side * tilt, side * 0.35)
        w.data.materials.append(INK)
        w.name = "whisker"
        parts.append(w)

# arms: stubby, resting at the sides
for side in (-1, 1):
    parts.append(blob("arm", (side * 0.98, -0.1, 0.95), (0.2, 0.22, 0.5), FUR, rot=(0, side * 0.35, 0)))
    # three little claws
    for k in (-1, 0, 1):
        parts.append(blob("claw", (side * (0.8 + k * 0.05), -0.26, 0.5), (0.025, 0.025, 0.06), INK))

# feet
for side in (-1, 1):
    parts.append(blob("foot", (side * 0.45, -0.35, 0.12), (0.3, 0.3, 0.13), FUR))

# leaf hat with a stem
bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=16, location=(0.05, 0.05, 2.47))
leaf = bpy.context.active_object
leaf.name = "leaf"
leaf.scale = (0.66, 0.36, 0.07)
leaf.rotation_euler = (0.08, -0.12, 0.35)
for v in leaf.data.vertices:  # pointy tip + slight droop at the ends
    v.co.x = math.copysign(abs(v.co.x) ** 1.4, v.co.x)
    v.co.z -= 0.9 * (v.co.x ** 2)
leaf.data.materials.append(LEAF)
bpy.ops.object.shade_smooth()
parts.append(leaf)
bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=0.025, depth=0.3, location=(0.05, 0.05, 2.4))
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
    bpy.ops.object.camera_add(location=(2.2, -6.5, 2.4))
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
