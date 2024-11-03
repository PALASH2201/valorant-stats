import React, { Suspense } from "react";
import { useState , useEffect} from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { database} from '../../firebase-config/config';
import { ref, get } from "firebase/database";

const Model = ({url}) => {
  if (!url) {
    console.warn("URL is not defined. Cannot load model.");
    return null;
  }
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} scale={5} />;
};

const WeaponModel = ({name}) => {
  // console.log("WeaponModel:", name);
   const [modelUrl, setModelUrl] = useState("");

  useEffect(() => {
    const getModelUrlByName = async (name) => {
      try {
        const modelRef = ref(database, `models/${name}`); 
        const snapshot = await get(modelRef);
        if (snapshot.exists()) {
          const  url  = snapshot.val();
          setModelUrl(url);
        } else {
          console.log("No such model found!");
        }
      } catch (error) {
        console.error("Error getting model URL: ", error);
      }
    };

    if (name) {
      getModelUrlByName(name);
    }
  }, [name]);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <directionalLight position={[10, 10, 5]} intensity={5} />
      <directionalLight position={[-10, -10, -5]} intensity={5} />
      <directionalLight position={[-10, -10, 5]} intensity={5} />
      <pointLight position={[0, 10, 0]} intensity={1} />
      <Suspense fallback={null}>
        <Model url={modelUrl}/>
      </Suspense>
      <Environment preset="sunset"/>
    </Canvas>
  );
};

export default WeaponModel;