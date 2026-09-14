import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 28);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Group for world objects that respond to mouse tilt
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Lighting for dark obsidian neon environment
    const ambientLight = new THREE.AmbientLight(0x221c35, 2.2);
    scene.add(ambientLight);

    const pointLightViolet = new THREE.PointLight(0x8b5cf6, 5.5, 60);
    pointLightViolet.position.set(-15, 10, 10);
    scene.add(pointLightViolet);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 5.5, 60);
    pointLightCyan.position.set(15, -8, 12);
    scene.add(pointLightCyan);

    const pointLightMagenta = new THREE.PointLight(0xec4899, 3.5, 45);
    pointLightMagenta.position.set(0, -12, 5);
    scene.add(pointLightMagenta);

    // 1. Flowing Distorted Gradient Wave Mesh
    const planeWidth = 65;
    const planeHeight = 45;
    const segmentsX = 64;
    const segmentsY = 48;
    const planeGeo = new THREE.PlaneGeometry(planeWidth, planeHeight, segmentsX, segmentsY);
    const planePosAttr = planeGeo.attributes.position;
    const originalPositions = new Float32Array(planePosAttr.array);

    // Dynamic vertex colors for the flowing mesh
    const colors = new Float32Array(planePosAttr.count * 3);
    const cViolet = new THREE.Color(0x8b5cf6);
    const cCyan = new THREE.Color(0x06b6d4);
    const cDeepIndigo = new THREE.Color(0x1e1b4b);
    const cMagenta = new THREE.Color(0xd946ef);

    for (let i = 0; i < planePosAttr.count; i++) {
      const u = (originalPositions[i * 3] / planeWidth) + 0.5;
      const v = (originalPositions[i * 3 + 1] / planeHeight) + 0.5;

      const mixed = cDeepIndigo.clone()
        .lerp(cViolet, u)
        .lerp(cCyan, v * 0.7)
        .lerp(cMagenta, (1 - u) * v * 0.5);

      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }
    planeGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const planeMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.42,
      roughness: 0.2,
      metalness: 0.8,
    });

    const waveMesh = new THREE.Mesh(planeGeo, planeMat);
    waveMesh.rotation.x = -Math.PI / 2.3;
    waveMesh.position.set(0, -9, -5);
    worldGroup.add(waveMesh);

    // 2. Floating Refractive Glass Shards & Crystalline Polyhedra
    interface ShardItem {
      mesh: THREE.Mesh;
      rotSpeed: { x: number; y: number; z: number };
      floatSpeed: number;
      initY: number;
      initX: number;
    }

    const shards: ShardItem[] = [];
    const shardGeometries = [
      new THREE.OctahedronGeometry(2.4, 0),
      new THREE.IcosahedronGeometry(2.0, 0),
      new THREE.TetrahedronGeometry(2.2, 0),
      new THREE.DodecahedronGeometry(1.8, 0),
      new THREE.ConeGeometry(1.6, 3.2, 4),
    ];

    const shardMaterials = [
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.05,
        transmission: 0.85,
        thickness: 1.5,
        ior: 1.6,
        transparent: true,
        opacity: 0.85,
        wireframe: false,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.2,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        roughness: 0.1,
        transmission: 0.8,
        thickness: 2.0,
        ior: 1.5,
        transparent: true,
        opacity: 0.8,
        wireframe: false,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.25,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xec4899,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      }),
    ];

    const shardPositions = [
      { x: 16, y: 4, z: -4 },
      { x: -16, y: -2, z: -2 },
      { x: 12, y: -6, z: 2 },
      { x: -10, y: 7, z: -6 },
      { x: 18, y: 9, z: -8 },
      { x: -18, y: -8, z: -4 },
      { x: 6, y: 10, z: -10 },
    ];

    shardPositions.forEach((pos, idx) => {
      const geo = shardGeometries[idx % shardGeometries.length];
      const mat = shardMaterials[idx % shardMaterials.length];
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos.x, pos.y, pos.z);

      // Add a subtle wireframe outline overlay to glass shards for high-tech precision
      const wireframeMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? 0x06b6d4 : 0xa78bfa,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const wireMesh = new THREE.Mesh(geo, wireframeMat);
      mesh.add(wireMesh);

      worldGroup.add(mesh);
      shards.push({
        mesh,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.01,
        },
        floatSpeed: 0.6 + Math.random() * 0.6,
        initY: pos.y,
        initX: pos.x,
      });
    });

    // 3. Cinematic Depth-of-Field Particles (Near = sharp & luminous, Far = soft & faded)
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const pSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 35;

      pPositions[i3] = x;
      pPositions[i3 + 1] = y;
      pPositions[i3 + 2] = z;

      // Depth of field calculation: particles further away or closer to focal plane
      const depthDist = Math.abs(z);
      const isClose = depthDist < 8;

      const pColor = isClose
        ? (Math.random() > 0.5 ? cCyan : cViolet)
        : (Math.random() > 0.6 ? cMagenta : new THREE.Color(0xf8fafc));

      pColors[i3] = pColor.r;
      pColors[i3 + 1] = pColor.g;
      pColors[i3 + 2] = pColor.b;

      // Size scales based on distance to simulate camera aperture bokeh
      pSizes[i] = isClose ? 0.35 : 0.75 + Math.random() * 0.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particles);

    // Mouse Tracking with Inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 4;
      targetY = y * 3;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.035;
      mouseY += (targetY - mouseY) * 0.035;

      worldGroup.rotation.y = mouseX * 0.08;
      worldGroup.rotation.x = -mouseY * 0.08;

      // 1. Undulating wave vertex displacement
      const posArray = planeGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < planePosAttr.count; i++) {
        const u = originalPositions[i * 3];
        const v = originalPositions[i * 3 + 1];

        // Complex multi-octave harmonic waves
        const wave1 = Math.sin(u * 0.15 + t * 1.2) * 1.5;
        const wave2 = Math.cos(v * 0.2 + t * 0.9) * 1.2;
        const wave3 = Math.sin((u + v) * 0.1 + t * 1.5) * 0.8;
        const mouseFactor = Math.exp(-((u - mouseX * 3) ** 2 + (v - mouseY * 3) ** 2) / 80) * 2.5;

        posArray[i * 3 + 2] = wave1 + wave2 + wave3 + mouseFactor;
      }
      planeGeo.attributes.position.needsUpdate = true;

      // 2. Rotate and float glass shards
      shards.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.rotation.z += item.rotSpeed.z;
        item.mesh.position.y = item.initY + Math.sin(t * item.floatSpeed) * 0.9;
        item.mesh.position.x = item.initX + Math.cos(t * item.floatSpeed * 0.7) * 0.5;
      });

      // 3. Gentle particle galaxy drift
      particles.rotation.y = t * 0.02;
      particles.rotation.z = Math.sin(t * 0.015) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      resizeObserver.disconnect();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      shardGeometries.forEach((g) => g.dispose());
      shardMaterials.forEach((m) => m.dispose());
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="three-hero-canvas-container"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-95 transition-opacity duration-700"
    />
  );
};
