import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls, TransformControls } from 'three-stdlib';
import { useEditorStore } from '../core/store';

export default function ThreeCanvas() {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const transformRef = useRef(null);
  const animationIdRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const pointerRef = useRef(new THREE.Vector2());

  const setThreeRefs = useEditorStore(s => s.setThreeRefs);
  const selectObject = useEditorStore(s => s.selectObject);
  const mode = useEditorStore(s => s.mode);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f1115);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(3, 3, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    const grid = new THREE.GridHelper(50, 50, 0x4b5563, 0x1f2937);
    grid.material.opacity = 0.25;
    grid.material.transparent = true;
    scene.add(grid);
    const axes = new THREE.AxesHelper(2);
    scene.add(axes);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const transformControls = new TransformControls(camera, renderer.domElement);
    transformControls.setMode(mode);
    transformControls.addEventListener('dragging-changed', (e) => {
      controls.enabled = !e.value;
    });
    scene.add(transformControls);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    controlsRef.current = controls;
    transformRef.current = transformControls;

    setThreeRefs({ scene, camera, renderer, orbitControls: controls, transformControls });

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const onPointerDown = (event) => {
      const bounds = container.getBoundingClientRect();
      const x = ( (event.clientX - bounds.left) / bounds.width ) * 2 - 1;
      const y = - ( (event.clientY - bounds.top) / bounds.height ) * 2 + 1;
      pointerRef.current.set(x, y);
      const raycaster = raycasterRef.current;
      raycaster.setFromCamera(pointerRef.current, camera);

      const candidates = [];
      scene.traverse((obj) => {
        if (obj.isMesh && obj.visible) candidates.push(obj);
      });
      const intersects = raycaster.intersectObjects(candidates, true);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        selectObject(hit);
        transformControls.attach(hit);
      } else {
        selectObject(null);
        transformControls.detach();
      }
    };
    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      transformControls.dispose();
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (transformRef.current) {
      transformRef.current.setMode(mode);
    }
  }, [mode]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
  );
}