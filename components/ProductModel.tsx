function ProductModel() {
  const modelRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!modelRef.current) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
      .to(modelRef.current.rotation, { y: Math.PI * 2, x: Math.PI * 0.5, ease: 'none' }, 0)
      .to(modelRef.current.position, { x: 1.8, y: -0.2, ease: 'none' }, 0.2)
      .to(modelRef.current.scale, { x: 1.4, y: 1.4, z: 1.4, ease: 'none' }, 0.35)
      .to(modelRef.current.position, { x: -1.8, y: 0.3, ease: 'none' }, 0.6)
      .to(modelRef.current.rotation, { y: Math.PI * 4, x: Math.PI * 1, ease: 'none' }, 0.6)
      .to(modelRef.current.scale, { x: 0.9, y: 0.9, z: 0.9, ease: 'none' }, 0.85);
  }, []);

  useFrame(() => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={modelRef} rotation={[0.4, 0.6, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#c9a45c" metalness={0.7} roughness={0.18} />
    </mesh>
  );
}