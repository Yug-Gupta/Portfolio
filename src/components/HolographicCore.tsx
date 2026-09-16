import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface HolographicCoreProps {
  size?: number;
  interactive?: boolean;
}

export function HolographicCore({ size = 340, interactive = true }: HolographicCoreProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Responsive size
    const containerWidth = container.parentElement?.clientWidth || size;
    const actualSize = Math.min(size, containerWidth - 16);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(actualSize, actualSize);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.5, 7.2);

    // ── Lighting (warm amber/bronze for dark theme) ──
    const ambientLight = new THREE.AmbientLight(0x1a1a20, 0.6);
    scene.add(ambientLight);

    // Key light — warm amber
    const keyLight = new THREE.DirectionalLight(0xD4915A, 1.2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    // Fill light — cool blue for contrast
    const fillLight = new THREE.DirectionalLight(0x4A6FA5, 0.4);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    // Rim light — accent highlight
    const rimLight = new THREE.DirectionalLight(0xE8A96E, 0.7);
    rimLight.position.set(-2, -1, 4);
    scene.add(rimLight);

    // ── Main Sculpture — Torus Knot ──
    const knotGeom = new THREE.TorusKnotGeometry(1.6, 0.44, 140, 36, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1e,
      metalness: 0.3,
      roughness: 0.35,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 0.6,
      envMapIntensity: 0.5,
    });
    const knot = new THREE.Mesh(knotGeom, knotMat);
    scene.add(knot);

    // ── Orbital Ring ──
    const ringGeom = new THREE.TorusGeometry(2.8, 0.03, 16, 100);
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: 0xD4915A,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0xD4915A,
      emissiveIntensity: 0.15,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2.2;
    scene.add(ring);

    // ── Satellite Bead ──
    const beadGeom = new THREE.SphereGeometry(0.12, 24, 24);
    const beadMat = new THREE.MeshPhysicalMaterial({
      color: 0xD4915A,
      metalness: 0.8,
      roughness: 0.15,
      emissive: 0xD4915A,
      emissiveIntensity: 0.3,
    });
    const bead = new THREE.Mesh(beadGeom, beadMat);
    scene.add(bead);

    // ── Interaction State ──
    const mouse = { x: 0, y: 0 };
    const target = { rotX: 0, rotY: 0 };
    let targetScale = 1;
    let dragVelocityX = 0;
    let dragVelocityY = 0;
    let lastPointer = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging.current) {
        dragVelocityX = (e.clientX - lastPointer.x) * 0.003;
        dragVelocityY = (e.clientY - lastPointer.y) * 0.003;
        lastPointer = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      isDragging.current = true;
      lastPointer = { x: e.clientX, y: e.clientY };
      container.style.cursor = 'grabbing';
    };

    const onPointerUp = () => {
      isDragging.current = false;
      container.style.cursor = interactive ? 'grab' : 'default';
    };

    const onPointerEnter = () => { targetScale = 1.03; };
    const onPointerLeave = () => {
      targetScale = 1;
      mouse.x = 0;
      mouse.y = 0;
      isDragging.current = false;
      container.style.cursor = interactive ? 'grab' : 'default';
    };

    if (interactive) {
      container.addEventListener('pointermove', onPointerMove);
      container.addEventListener('pointerdown', onPointerDown);
      container.addEventListener('pointerup', onPointerUp);
      container.addEventListener('pointerenter', onPointerEnter);
      container.addEventListener('pointerleave', onPointerLeave);
      container.style.cursor = 'grab';
    }

    // ── Animation Loop ──
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const lerpFactor = 1 - Math.exp(-6 * delta);

      if (prefersReduced) {
        // Static display
        renderer.render(scene, camera);
        return;
      }

      // Idle rotation
      if (!isDragging.current) {
        target.rotY += 0.003;
        target.rotX = mouse.y * 0.3;
      } else {
        target.rotY += dragVelocityX;
        target.rotX += dragVelocityY;
        dragVelocityX *= 0.95;
        dragVelocityY *= 0.95;
      }

      // Apply tilt from mouse hover
      knot.rotation.y += (target.rotY - knot.rotation.y) * lerpFactor * 0.5;
      knot.rotation.x += (target.rotX - knot.rotation.x) * lerpFactor * 0.5;

      // Subtle float
      knot.position.y = Math.sin(elapsed * 0.8) * 0.08;

      // Scale
      const currentScale = knot.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * lerpFactor;
      knot.scale.setScalar(newScale);

      // Ring rotation
      ring.rotation.z = elapsed * 0.15;
      ring.rotation.x = Math.PI / 2.2 + Math.sin(elapsed * 0.3) * 0.05;

      // Bead orbit
      const beadAngle = elapsed * 0.5;
      const beadRadius = 2.8;
      bead.position.x = Math.cos(beadAngle) * beadRadius;
      bead.position.z = Math.sin(beadAngle) * beadRadius * 0.4;
      bead.position.y = Math.sin(beadAngle) * beadRadius * Math.cos(ring.rotation.x);

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const resizeObserver = new ResizeObserver(() => {
      const newWidth = container.parentElement?.clientWidth || size;
      const newSize = Math.min(size, newWidth - 16);
      renderer.setSize(newSize, newSize);
    });
    if (container.parentElement) resizeObserver.observe(container.parentElement);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      if (interactive) {
        container.removeEventListener('pointermove', onPointerMove);
        container.removeEventListener('pointerdown', onPointerDown);
        container.removeEventListener('pointerup', onPointerUp);
        container.removeEventListener('pointerenter', onPointerEnter);
        container.removeEventListener('pointerleave', onPointerLeave);
      }
      renderer.dispose();
      knotGeom.dispose();
      knotMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      beadGeom.dispose();
      beadMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size, interactive]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient glow */}
      <div
        className="absolute w-64 h-64 rounded-full blur-[80px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,145,90,0.12) 0%, transparent 70%)' }}
      />
      {/* Contact shadow */}
      <div className="absolute -bottom-2 w-40 h-5 rounded-full bg-accent/[0.06] blur-md pointer-events-none" />
      {/* Canvas mount */}
      <div
        ref={mountRef}
        role="img"
        aria-label="Interactive 3D sculpture — a glazed torus knot with orbital ring"
        className="relative z-10"
        style={{ width: size, height: size, maxWidth: '100%', aspectRatio: '1' }}
      />
    </div>
  );
}
