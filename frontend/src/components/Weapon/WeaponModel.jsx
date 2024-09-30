import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

const Model = () => {
  const gltf = useGLTF("/Aries.glb");
  return <primitive object={gltf.scene} scale={5} />;
};

const WeaponModel = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <directionalLight position={[10, 10, 5]} intensity={5} />
      <directionalLight position={[-10, -10, -5]} intensity={5} />
      <directionalLight position={[-10, -10, 5]} intensity={5} />
      <pointLight position={[0, 10, 0]} intensity={1} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <Environment preset="sunset"/>
    </Canvas>
  );
};

export default WeaponModel;