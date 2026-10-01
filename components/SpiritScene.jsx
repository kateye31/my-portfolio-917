"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const MODEL = "/models/forest-spirit.glb";
useGLTF.preload(MODEL);

// 3-step gradient so the toon shading reads like flat marker fills
function useToonRamp() {
  return useMemo(() => {
    const tex = new THREE.DataTexture(new Uint8Array([90, 90, 90, 255, 190, 190, 190, 255, 255, 255, 255, 255]), 3, 1);
    tex.minFilter = tex.magFilter = THREE.NearestFilter;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

// inverted hull: a back-face copy pushed out along its normals reads as an ink line
function useOutlineMaterial(thickness = 0.03) {
  return useMemo(() => {
    const m = new THREE.MeshBasicMaterial({ color: "#2b2724", side: THREE.BackSide });
    m.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `vec3 transformed = position + normalize(normal) * ${thickness.toFixed(3)};`
      );
    };
    return m;
  }, [thickness]);
}

function Spirit() {
  const { scene } = useGLTF(MODEL);
  const ramp = useToonRamp();
  const outline = useOutlineMaterial();
  const group = useRef();
  const hop = useRef(0);

  // flatten the glTF into plain meshes so each one can get its own outline
  const meshes = useMemo(() => {
    const out = [];
    scene.updateMatrixWorld(true);
    scene.traverse((o) => {
      if (!o.isMesh) return;
      const color = o.material.color.clone();
      const isInk = color.getHSL({}).l < 0.08;
      out.push({ key: o.uuid, geometry: o.geometry, matrix: o.matrixWorld.clone(), color, outline: !isInk && !o.name.startsWith("whisker") });
    });
    return out;
  }, [scene]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // turn toward the pointer, gently
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.6, 4, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.18, 4, dt);
    // breathing + click hop
    hop.current = Math.max(0, hop.current - dt * 1.6);
    const h = Math.sin(hop.current * Math.PI) * 0.7;
    const breathe = 1 + Math.sin(t * 1.8) * 0.018;
    g.position.y = -1.25 + h;
    g.scale.set(1 / Math.sqrt(breathe), breathe, 1 / Math.sqrt(breathe));
  });

  return (
    <group ref={group} onClick={() => { if (hop.current <= 0) hop.current = 1; }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}>
      {meshes.map((m) => (
        <group key={m.key} matrixAutoUpdate={false} matrix={m.matrix}>
          <mesh geometry={m.geometry}>
            <meshToonMaterial color={m.color} gradientMap={ramp} />
          </mesh>
          {m.outline && <mesh geometry={m.geometry} material={outline} />}
        </group>
      ))}
    </group>
  );
}

export default function SpiritScene() {
  return (
    <Canvas camera={{ position: [0, 0.6, 6.2], fov: 36 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.3} />
      <directionalLight position={[3, 5, 4]} intensity={1.8} />
      <Spirit />
      <ContactShadows position={[0, -1.26, 0]} opacity={0.35} scale={6} blur={2.4} far={2} color="#4a3f35" />
    </Canvas>
  );
}
