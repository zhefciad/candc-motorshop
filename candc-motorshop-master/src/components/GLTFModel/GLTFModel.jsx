// components/GLTFModel.jsx
import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = ({ modelPath, scale }) => {
  const { scene } = useGLTF(modelPath, true); // Ensure binary data is loaded
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001;
    }
  });

  return <primitive object={scene} ref={modelRef} scale={scale} />;
};
const CameraControls = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      args={[camera, gl.domElement]}
    />
  );
};
const GLTFModel = ({
  modelPath,
  scale = [, 1, 1],
  width = "100%",
  height = "1000px",
}) => {
  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        justifyCenter: "center",
        alignItems: "center",
      }}
    >
      <Canvas
      // style={{
      //   width: "10rem",
      //   height: "10rem",
      //   position: "absolute",
      //   top: "0",
      //   left: "0",
      // }}
      >
        <CameraControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Model modelPath={modelPath} scale={scale} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default GLTFModel;
