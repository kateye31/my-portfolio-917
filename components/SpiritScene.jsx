"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// generated with Meshy (npm run model); any glb works, it gets auto-fitted below
export const MODEL = "/models/spirit.glb";
const HEIGHT = 2.7; // world units the character is scaled to
const FLOOR = -1.25;
useGLTF.preload(MODEL);

// inverted hull: a back-face copy pushed out along its normals reads as an ink line
function useOutlineMaterial(thickness) {
  return useMemo(() => {
    const m = new THREE.MeshBasicMaterial({ color: "#2b2724", side: THREE.BackSide });
    m.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `vec3 transformed = position + normalize(normal) * ${thickness.toFixed(4)};`
      );
    };
    return m;
  }, [thickness]);
}

function Spirit() {
  const { scene } = useGLTF(MODEL);
  const group = useRef();
  const hop = useRef(0);

  // clone, scale to a fixed height, stand it on the floor, and add ink outlines
  const { model, outlineScale } = useMemo(() => {
    const model = scene.clone(true);
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const s = HEIGHT / size.y;
    const center = box.getCenter(new THREE.Vector3());
    model.scale.setScalar(s);
    model.position.set(-center.x * s, FLOOR - box.min.y * s, -center.z * s);
    return { model, outlineScale: 1 / s };
  }, [scene]);

  const outline = useOutlineMaterial(0.025 * outlineScale);

  useMemo(() => {
    const meshes = [];
    model.traverse((o) => o.isMesh && meshes.push(o));
    meshes.forEach((o) => {
      if (o.material) {
        o.material = o.material.clone();
        o.material.roughness = Math.max(o.material.roughness ?? 1, 0.75); // soft, matte, storybook look
        o.material.metalness = 0;
      }
      const hull = new THREE.Mesh(o.geometry, outline);
      hull.raycast = () => {};
      o.add(hull);
    });
  }, [model, outline]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // turn toward the pointer, gently
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.6, 4, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.12, 4, dt);
    // slow ghostly float + click hop
    hop.current = Math.max(0, hop.current - dt * 1.6);
    g.position.y = Math.sin(t * 1.4) * 0.06 + Math.sin(hop.current * Math.PI) * 0.6;
  });

  return (
    <group ref={group} onClick={() => { if (hop.current <= 0) hop.current = 1; }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}>
      <primitive object={model} />
    </group>
  );
}

export default function SpiritScene() {
  return (
    <Canvas camera={{ position: [0, 0.4, 6.4], fov: 36 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#f4a9b8" />
      <Spirit />
      <ContactShadows position={[0, FLOOR - 0.01, 0]} opacity={0.35} scale={6} blur={2.4} far={2} color="#4a3f35" />
    </Canvas>
  );
}
