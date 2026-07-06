'use client';

import { useGLTF } from '@react-three/drei';

export default function ProductModel() {
  const { scene } = useGLTF('/models/product.glb');

  return (
    <primitive
      object={scene}
      scale={1.5}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
}