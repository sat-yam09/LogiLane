'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.022);

    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Three-quarter low-angle hero composition (Polestar / Volvo Trucks commercial perspective)
    camera.position.set(4.6, 1.85, 6.8);
    camera.lookAt(0, 1.15, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- Lighting Setup (High-Key Architectural Studio Daylight) ---
    // 1. Daylight Ambient Light (crisp architectural white)
    const ambientLight = new THREE.AmbientLight(0xe2e8f0, 2.2);
    scene.add(ambientLight);

    // 2. Signature Electric Cobalt Atmospheric Rim Light behind the truck
    const cobaltRimLight = new THREE.DirectionalLight(0x2563eb, 2.6);
    cobaltRimLight.position.set(-6, 3.5, -4);
    scene.add(cobaltRimLight);

    // 3. Overhead Daylight Key Sun/Floodlight
    const overheadLight = new THREE.DirectionalLight(0xffffff, 3.4);
    overheadLight.position.set(6, 13, 5);
    overheadLight.castShadow = true;
    overheadLight.shadow.mapSize.width = 2048;
    overheadLight.shadow.mapSize.height = 2048;
    overheadLight.shadow.camera.near = 0.5;
    overheadLight.shadow.camera.far = 30;
    overheadLight.shadow.bias = -0.0003;
    scene.add(overheadLight);

    // 4. Soft Steel Fill Light
    const fillLight = new THREE.DirectionalLight(0x94a3b8, 1.4);
    fillLight.position.set(3, 2, 5);
    scene.add(fillLight);

    // --- Ground: Polished Light Architectural Tarmac ---
    const groundGeo = new THREE.PlaneGeometry(80, 80, 1, 1);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.32,
      metalness: 0.15,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // --- PBR Materials for Semi-Tractor Unit ---
    // Deep Nordic Slate / Titanium automotive paint with crisp metallic sheen
    const matteBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.28,
      metalness: 0.75,
    });

    // Mirror chrome & brushed steel for grille, stacks, mirrors, rims
    const brushedSteelMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.1,
      metalness: 0.98,
    });

    // Dark tinted aerodynamic glass
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      roughness: 0.05,
      metalness: 0.9,
      transmission: 0.45,
      transparent: true,
      opacity: 0.92,
    });

    // Deep crimson aerodynamic stripe (focal precision accent)
    const crimsonAccentMat = new THREE.MeshStandardMaterial({
      color: 0xb3122e,
      emissive: 0x8b0000,
      emissiveIntensity: 0.85,
      roughness: 0.25,
      metalness: 0.5,
    });

    // Heavy duty rubber tires
    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.88,
      metalness: 0.05,
    });

    // LED Headlight projector lenses
    const ledHeadlightMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xbae6fd,
      emissiveIntensity: 0,
      roughness: 0.1,
      metalness: 0.9,
    });

    // Chassis mechanical steel
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.5,
      metalness: 0.82,
    });

    // --- Truck Model Assembly (Group) ---
    const truckGroup = new THREE.Group();

    // 1. Main Aerodynamic Cab Body
    const cabMainGeo = new THREE.BoxGeometry(2.32, 2.08, 3.4);
    const cabMain = new THREE.Mesh(cabMainGeo, matteBodyMat);
    cabMain.position.set(0, 1.84, 0.2);
    cabMain.castShadow = true;
    cabMain.receiveShadow = true;
    truckGroup.add(cabMain);

    // 2. Aerodynamic Roof Wind Fairing
    const roofFairingGeo = new THREE.CylinderGeometry(1.16, 1.25, 3.2, 20, 1, false, 0, Math.PI);
    const roofFairing = new THREE.Mesh(roofFairingGeo, matteBodyMat);
    roofFairing.position.set(0, 2.88, 0.2);
    roofFairing.rotation.z = Math.PI / 2;
    roofFairing.rotation.y = Math.PI / 2;
    roofFairing.castShadow = true;
    truckGroup.add(roofFairing);

    // 3. Front Nose & Brushed Steel Grille
    const grilleSurroundGeo = new THREE.BoxGeometry(2.1, 1.1, 0.3);
    const grilleSurround = new THREE.Mesh(grilleSurroundGeo, matteBodyMat);
    grilleSurround.position.set(0, 1.35, 1.95);
    grilleSurround.castShadow = true;
    truckGroup.add(grilleSurround);

    const grilleMeshGeo = new THREE.BoxGeometry(1.88, 0.86, 0.08);
    const grilleMesh = new THREE.Mesh(grilleMeshGeo, brushedSteelMat);
    grilleMesh.position.set(0, 1.35, 2.11);
    truckGroup.add(grilleMesh);

    // 4. Sleek Tinted Windshield & Side Windows
    const windshieldGeo = new THREE.BoxGeometry(2.1, 0.84, 0.15);
    const windshield = new THREE.Mesh(windshieldGeo, glassMat);
    windshield.position.set(0, 2.34, 1.85);
    windshield.rotation.x = -0.22;
    truckGroup.add(windshield);

    const sideWindowGeo = new THREE.BoxGeometry(0.1, 0.74, 1.42);
    const leftWindow = new THREE.Mesh(sideWindowGeo, glassMat);
    leftWindow.position.set(1.17, 2.29, 0.5);
    truckGroup.add(leftWindow);

    const rightWindow = new THREE.Mesh(sideWindowGeo, glassMat);
    rightWindow.position.set(-1.17, 2.29, 0.5);
    truckGroup.add(rightWindow);

    // 5. Heavy-Duty Front Bumper with LED Headlights
    const bumperGeo = new THREE.BoxGeometry(2.42, 0.45, 0.5);
    const bumper = new THREE.Mesh(bumperGeo, chassisMat);
    bumper.position.set(0, 0.65, 2.05);
    bumper.castShadow = true;
    truckGroup.add(bumper);

    const headlightGeo = new THREE.BoxGeometry(0.46, 0.16, 0.08);
    const leftHeadlight = new THREE.Mesh(headlightGeo, ledHeadlightMat);
    leftHeadlight.position.set(0.85, 0.7, 2.31);
    truckGroup.add(leftHeadlight);

    const rightHeadlight = new THREE.Mesh(headlightGeo, ledHeadlightMat);
    rightHeadlight.position.set(-0.85, 0.7, 2.31);
    truckGroup.add(rightHeadlight);

    // Forward Projector Spotlights onto Ground
    const leftSpot = new THREE.SpotLight(0x38bdf8, 0, 22, Math.PI / 6, 0.42, 1.2);
    leftSpot.position.set(0.85, 0.7, 2.35);
    leftSpot.target.position.set(1.5, 0, 10);
    scene.add(leftSpot);
    scene.add(leftSpot.target);

    const rightSpot = new THREE.SpotLight(0x38bdf8, 0, 22, Math.PI / 6, 0.42, 1.2);
    rightSpot.position.set(-0.85, 0.7, 2.35);
    rightSpot.target.position.set(-1.5, 0, 10);
    scene.add(rightSpot);
    scene.add(rightSpot.target);

    // 6. Single Thin Deep Crimson Red Accent Line
    const accentLineGeo = new THREE.BoxGeometry(2.44, 0.04, 3.62);
    const accentLine = new THREE.Mesh(accentLineGeo, crimsonAccentMat);
    accentLine.position.set(0, 0.89, 0.1);
    truckGroup.add(accentLine);

    // Side Aerodynamic Skirts
    const skirtGeo = new THREE.BoxGeometry(0.2, 0.55, 3.25);
    const leftSkirt = new THREE.Mesh(skirtGeo, matteBodyMat);
    leftSkirt.position.set(1.16, 0.6, 0.1);
    truckGroup.add(leftSkirt);

    const rightSkirt = new THREE.Mesh(skirtGeo, matteBodyMat);
    rightSkirt.position.set(-1.16, 0.6, 0.1);
    truckGroup.add(rightSkirt);

    // 7. Dual Vertical Exhaust Stacks (Brushed Steel Chrome)
    const stackGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.6, 16);
    const leftStack = new THREE.Mesh(stackGeo, brushedSteelMat);
    leftStack.position.set(1.05, 2.8, -1.35);
    leftStack.castShadow = true;
    truckGroup.add(leftStack);

    const rightStack = new THREE.Mesh(stackGeo, brushedSteelMat);
    rightStack.position.set(-1.05, 2.8, -1.35);
    rightStack.castShadow = true;
    truckGroup.add(rightStack);

    // 8. Aerodynamic Side Mirrors
    const mirrorFaceGeo = new THREE.BoxGeometry(0.12, 0.45, 0.18);
    const leftMirror = new THREE.Mesh(mirrorFaceGeo, brushedSteelMat);
    leftMirror.position.set(1.46, 2.2, 1.5);
    truckGroup.add(leftMirror);

    const rightMirror = new THREE.Mesh(mirrorFaceGeo, brushedSteelMat);
    rightMirror.position.set(-1.46, 2.2, 1.5);
    truckGroup.add(rightMirror);

    // 9. Heavy Duty Chassis Rails & Fifth-Wheel Hitch
    const chassisRailGeo = new THREE.BoxGeometry(1.6, 0.25, 4.8);
    const chassisRail = new THREE.Mesh(chassisRailGeo, chassisMat);
    chassisRail.position.set(0, 0.75, -0.8);
    chassisRail.castShadow = true;
    truckGroup.add(chassisRail);

    const fifthWheelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.1, 16);
    const fifthWheel = new THREE.Mesh(fifthWheelGeo, brushedSteelMat);
    fifthWheel.position.set(0, 0.92, -2.1);
    fifthWheel.rotation.x = -0.1;
    truckGroup.add(fifthWheel);

    // 10. Heavy Duty Wheels & Precision Rims
    const wheelPositions = [
      { x: 1.15, y: 0.52, z: 1.45, width: 0.32, radius: 0.52 },
      { x: -1.15, y: 0.52, z: 1.45, width: 0.32, radius: 0.52 },
      { x: 1.18, y: 0.52, z: -1.4, width: 0.42, radius: 0.52 },
      { x: -1.18, y: 0.52, z: -1.4, width: 0.42, radius: 0.52 },
      { x: 1.18, y: 0.52, z: -2.6, width: 0.42, radius: 0.52 },
      { x: -1.18, y: 0.52, z: -2.6, width: 0.42, radius: 0.52 },
    ];

    wheelPositions.forEach((pos) => {
      const wheelGroup = new THREE.Group();
      const tireGeo = new THREE.CylinderGeometry(pos.radius, pos.radius, pos.width, 24);
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      wheelGroup.add(tire);

      const rimGeo = new THREE.CylinderGeometry(pos.radius * 0.58, pos.radius * 0.58, pos.width + 0.02, 16);
      const rim = new THREE.Mesh(rimGeo, brushedSteelMat);
      rim.rotation.z = Math.PI / 2;
      wheelGroup.add(rim);

      wheelGroup.position.set(pos.x, pos.y, pos.z);
      truckGroup.add(wheelGroup);
    });

    // Initial entrance setup
    truckGroup.position.set(0, 0, -3.2);
    truckGroup.rotation.y = 0.42;
    scene.add(truckGroup);

    // --- Minimal Architectural Light Studio Background Objects ---
    const containerMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.6,
      metalness: 0.15,
    });
    const containerGeo = new THREE.BoxGeometry(2.4, 2.6, 6.2);

    const bgContainer1 = new THREE.Mesh(containerGeo, containerMat);
    bgContainer1.position.set(-8.5, 1.3, -6.5);
    bgContainer1.rotation.y = 0.18;
    bgContainer1.receiveShadow = true;
    scene.add(bgContainer1);

    const bgContainer2 = new THREE.Mesh(containerGeo, containerMat);
    bgContainer2.position.set(-8.7, 3.9, -6.2);
    bgContainer2.rotation.y = 0.16;
    bgContainer2.receiveShadow = true;
    scene.add(bgContainer2);

    // --- Mouse & Parallax State ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0.36;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth) * 2 - 1;
      mouseY = -(e.clientY / innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- Animation Sequence ---
    const startTime = performance.now();
    let isSettled = false;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) / 1000;

      // 1. Entrance Drive-In (0 to 2.0 seconds)
      if (elapsed < 2.0) {
        const progress = Math.min(elapsed / 1.8, 1.0);
        const ease = 1 - Math.pow(1 - progress, 3.2);

        truckGroup.position.z = -3.2 + ease * 3.2;
        truckGroup.rotation.y = 0.42 - ease * 0.06;

        if (elapsed > 0.8) {
          const lightProgress = Math.min((elapsed - 0.8) / 0.8, 1.0);
          ledHeadlightMat.emissiveIntensity = lightProgress * 2.5;
          leftSpot.intensity = lightProgress * 10.0;
          rightSpot.intensity = lightProgress * 10.0;
        }
      } else {
        if (!isSettled) {
          isSettled = true;
        }

        // 2. Subtle Idle Suspension Breathing Loop
        const idleSuspension = Math.sin(elapsed * 1.5) * 0.009;
        const idlePitch = Math.cos(elapsed * 1.1) * 0.002;
        truckGroup.position.y = idleSuspension;
        truckGroup.rotation.x = idlePitch;

        // 3. Capped Parallax (Strictly bounded to ±5.5 degrees)
        targetRotY = 0.36 + mouseX * 0.09;
        targetRotX = idlePitch - mouseY * 0.04;

        truckGroup.rotation.y += (targetRotY - truckGroup.rotation.y) * 0.04;
        truckGroup.rotation.x += (targetRotX - truckGroup.rotation.x) * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[640px] md:min-h-[820px] flex items-center justify-center overflow-hidden pointer-events-none">
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

      {/* Atmospheric Soft Cyan/Blue Sky Glow Behind the Truck */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] md:w-[980px] h-[450px] md:h-[600px] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.1) 0%, rgba(56, 189, 248, 0.06) 40%, rgba(248, 250, 252, 0) 75%)',
          filter: 'blur(50px)',
        }}
      />
    </div>
  );
}
