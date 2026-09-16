import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HolographicCoreProps {
  size?: number;
  interactive?: boolean;
}

export const HolographicCore: React.FC<HolographicCoreProps> = ({
  size = 380,
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // Sculpture Group
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Studio Lighting (warm key, ambient, bronze rim with deep soft shadows)
    const ambientLight = new THREE.AmbientLight(0xF4ECE1, 2.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xFFFAF2, 3.8);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xD6CEC3, 1.5);
    fillLight.position.set(-6, -3, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xC88A58, 3.6);
    rimLight.position.set(0, -5, -4);
    scene.add(rimLight);

    const topRimLight = new THREE.DirectionalLight(0xE29D68, 1.8);
    topRimLight.position.set(0, 6, -4);
    scene.add(topRimLight);

    // Main Sculpture: Organic Mathematical Torus Knot (rich glazed dark obsidian stoneware)
    const knotGeo = new THREE.TorusKnotGeometry(1.6, 0.44, 140, 36, 2, 3);
    const stonewareMat = new THREE.MeshPhysicalMaterial({
      color: 0x1E1C1A,
      roughness: 0.32,
      metalness: 0.22,
      clearcoat: 0.65,
      clearcoatRoughness: 0.2,
      reflectivity: 0.6,
    });
    const mainKnot = new THREE.Mesh(knotGeo, stonewareMat);
    sculptureGroup.add(mainKnot);

    // Fine Spun Bronze Orbital Ring
    const ringGeo = new THREE.TorusGeometry(2.35, 0.015, 24, 120);
    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0xC88A58,
      metalness: 0.9,
      roughness: 0.18,
      transparent: true,
      opacity: 0.85,
    });
    const orbitalRing = new THREE.Mesh(ringGeo, bronzeMat);
    orbitalRing.rotation.x = Math.PI / 3.2;
    orbitalRing.rotation.y = Math.PI / 5.5;
    sculptureGroup.add(orbitalRing);

    // Micro Core Accent Bead
    const beadGeo = new THREE.SphereGeometry(0.12, 24, 24);
    const beadMat = new THREE.MeshStandardMaterial({
      color: 0xDF9B66,
      metalness: 0.92,
      roughness: 0.1,
    });
    const bead = new THREE.Mesh(beadGeo, beadMat);
    sculptureGroup.add(bead);

    // Interaction & Spring Physics State
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;
    let targetScale = 1;
    let curScale = 1;
    let isMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isMouseDown) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        dragVelocityX = deltaX * 0.01;
        dragVelocityY = deltaY * 0.01;
        targetRotY += dragVelocityX;
        targetRotX += dragVelocityY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        targetRotY = mouseX * 0.55;
        targetRotX = -mouseY * 0.55;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isMouseDown = true;
      setIsDragging(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      dragVelocityX = 0;
      dragVelocityY = 0;
    };

    const onPointerUp = () => {
      isMouseDown = false;
      setIsDragging(false);
    };

    const onPointerEnter = () => {
      targetScale = 1.04;
      setIsHovered(true);
    };

    const onPointerLeave = () => {
      if (!isMouseDown) {
        targetRotX = 0;
        targetRotY = 0;
      }
      targetScale = 1;
      setIsHovered(false);
      isMouseDown = false;
      setIsDragging(false);
    };

    if (interactive) {
      mount.addEventListener('mousemove', onPointerMove);
      mount.addEventListener('mousedown', onPointerDown);
      window.addEventListener('mouseup', onPointerUp);
      mount.addEventListener('mouseenter', onPointerEnter);
      mount.addEventListener('mouseleave', onPointerLeave);
    }

    // Animation Loop with Clock
    let animId: number;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Inertia decay if dragged
      if (!isMouseDown) {
        dragVelocityX *= 0.95;
        dragVelocityY *= 0.95;
        targetRotY += dragVelocityX;
        targetRotX += dragVelocityY;
      }

      // Base ambient kinetic spin
      const baseSpinX = elapsed * 0.12;
      const baseSpinY = elapsed * 0.18;

      // Smooth lerp toward targets
      const lerpFactor = 1 - Math.exp(-6 * delta);
      curRotX += (targetRotX + baseSpinX - curRotX) * lerpFactor;
      curRotY += (targetRotY + baseSpinY - curRotY) * lerpFactor;
      curScale += (targetScale - curScale) * (1 - Math.exp(-8 * delta));

      sculptureGroup.rotation.x = curRotX;
      sculptureGroup.rotation.y = curRotY;
      sculptureGroup.scale.set(curScale, curScale, curScale);

      // Micro orbit animation
      orbitalRing.rotation.z = -elapsed * 0.14;
      bead.position.x = Math.sin(elapsed * 0.8) * 2.35 * Math.cos(Math.PI / 3.2);
      bead.position.y = Math.cos(elapsed * 0.8) * 2.35 * Math.sin(Math.PI / 5.5);
      bead.position.z = Math.cos(elapsed * 0.8) * 1.5;

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      if (interactive) {
        mount.removeEventListener('mousemove', onPointerMove);
        mount.removeEventListener('mousedown', onPointerDown);
        window.removeEventListener('mouseup', onPointerUp);
        mount.removeEventListener('mouseenter', onPointerEnter);
        mount.removeEventListener('mouseleave', onPointerLeave);
      }
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      renderer.dispose();
      knotGeo.dispose();
      stonewareMat.dispose();
      ringGeo.dispose();
      bronzeMat.dispose();
      beadGeo.dispose();
      beadMat.dispose();
    };
  }, [size, interactive]);

  return (
    <div className="relative flex flex-col items-center justify-center select-none group" role="img" aria-label="Interactive 3D sculpture — decorative visual">
      {/* Soft warm amber background ambient bloom */}
      <div 
        className={`absolute rounded-full transition-all duration-700 pointer-events-none w-72 h-72 bg-[#C88A58]/15 blur-3xl ${
          isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-60'
        }`} 
      />

      {/* Subtle organic contact shadow underneath */}
      <div className="absolute -bottom-2 w-48 h-6 bg-[#2B2319]/10 rounded-full blur-md pointer-events-none" />

      <div
        ref={mountRef}
        className={`relative flex items-center justify-center transition-transform duration-300 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ width: size, height: size }}
      />
    </div>
  );
};
