import React, {useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'; // 🔄 Use FBXLoader

const HeroSection = ({ darkMode = false, modelPath = null }) => {
  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);

  const [animationEnabled, setAnimationEnabled] = useState(true);

  // Generate random position for the bubbles
  const generateBubbles = (count) => {
    const bubbles = [];
    for (let i = 0; i < count; i++) {
      bubbles.push({
        id: i,
        size: Math.floor(Math.random() * 150) + 50, // 50-200px
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 15 + 10}s`, // 10-25s
        animationDelay: `${Math.random() * 5}s`,
      });
    }
    return bubbles;
  };

  const [bubbles, setBubbles] = useState([]);
  
  useEffect(() => {
    setBubbles(generateBubbles(12));
  }, []);

  // useEffect(() => {
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //   camera.position.z = 10;

  //   const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  //   const containerWidth = mountRef.current.clientWidth;
  //   const containerHeight = mountRef.current.clientHeight;
  //   renderer.setSize(containerWidth, containerHeight);
  //   renderer.setClearColor(0x000000, 0);

  //   if (mountRef.current.childNodes.length > 0) {
  //     mountRef.current.removeChild(mountRef.current.childNodes[0]);
  //   }
  //   mountRef.current.appendChild(renderer.domElement);

  //   const modelObject = new THREE.Object3D();
  //   modelRef.current = modelObject;
  //   scene.add(modelObject);

   
  //   if (modelPath) {
  //     const loader = new FBXLoader();
  //     loader.load(
  //       modelPath,
  //       (fbx) => {
  //         modelRef.current.add(fbx);

  //         // Centering and scaling
  //         const box = new THREE.Box3().setFromObject(fbx);
  //         const center = box.getCenter(new THREE.Vector3());
  //         fbx.position.sub(center);

  //         const size = box.getSize(new THREE.Vector3());
  //         const maxDim = Math.max(size.x, size.y, size.z);
  //         let scale = 15 / maxDim;
  //         if (maxDim < 0.1) scale = 500;
  //         fbx.scale.set(scale, scale, scale);

  //         const newBox = new THREE.Box3().setFromObject(fbx);
  //         const newSize = newBox.getSize(new THREE.Vector3());
  //         if (Math.max(newSize.x, newSize.y, newSize.z) < 3) {
  //           const additionalScale = 3 / Math.max(newSize.x, newSize.y, newSize.z);
  //           fbx.scale.multiplyScalar(additionalScale);
  //         }
  //       },
  //       (xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
  //       (error) => console.error('Error loading FBX model:', error)
  //     );
  //   } else {
  //     const geometry = new THREE.IcosahedronGeometry(4, 1);
  //     const material = new THREE.MeshStandardMaterial({
  //       color: darkMode ? 0x6d28d9 : 0x3b82f6,
  //       wireframe: true,
  //       emissive: darkMode ? 0x6d28d9 : 0x3b82f6,
  //       emissiveIntensity: 0.2,
  //     });

  //     const mesh = new THREE.Mesh(geometry, material);
  //     modelRef.current.add(mesh);
  //   }
    
      

  //   scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  //   const pointLight = new THREE.PointLight(darkMode ? 0xa855f7 : 0x60a5fa, 1.5);
  //   pointLight.position.set(5, 5, 5);
  //   scene.add(pointLight);
  //   const secondPointLight = new THREE.PointLight(0xffffff, 1);
  //   secondPointLight.position.set(-5, -5, 5);
  //   scene.add(secondPointLight);

  //   const handleMouseDown = (e) => {
  //     isDragging.current = true;
  //     autoRotateRef.current = false;
  //     previousMousePosition.current = { x: e.clientX, y: e.clientY };
  //   };
  //   const handleMouseMove = (e) => {
  //     if (!isDragging.current) return;
  //     const delta = { x: e.clientX - previousMousePosition.current.x, y: e.clientY - previousMousePosition.current.y };
  //     targetRotation.current.y += delta.x * 0.01;
  //     targetRotation.current.x += delta.y * 0.01;
  //     previousMousePosition.current = { x: e.clientX, y: e.clientY };
  //   };
  //   const handleMouseUp = () => (isDragging.current = false);

  //   const container = mountRef.current;
  //   container.addEventListener('mousedown', handleMouseDown);
  //   window.addEventListener('mousemove', handleMouseMove);
  //   window.addEventListener('mouseup', handleMouseUp);

  //   const handleTouchStart = (e) => {
  //     if (e.touches.length === 1) {
  //       isDragging.current = true;
  //       autoRotateRef.current = false;
  //       previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  //     }
  //   };
  //   const handleTouchMove = (e) => {
  //     if (!isDragging.current || e.touches.length !== 1) return;
  //     const delta = { x: e.touches[0].clientX - previousMousePosition.current.x, y: e.touches[0].clientY - previousMousePosition.current.y };
  //     targetRotation.current.y += delta.x * 0.01;
  //     targetRotation.current.x += delta.y * 0.01;
  //     previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  //     e.preventDefault();
  //   };
  //   const handleTouchEnd = () => (isDragging.current = false);

  //   container.addEventListener('touchstart', handleTouchStart);
  //   container.addEventListener('touchmove', handleTouchMove, { passive: false });
  //   container.addEventListener('touchend', handleTouchEnd);

  //   const handleResize = () => {
  //     if (!mountRef.current) return;
  //     camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
  //   };
  //   window.addEventListener('resize', handleResize);

  //   let autoRotateSpeed = 0.005;
  //   let lastTimestamp = 0;
  //   const animate = (timestamp) => {
  //     requestAnimationFrame(animate);
  //     const deltaTime = lastTimestamp ? (timestamp - lastTimestamp) / 16 : 1;
  //     lastTimestamp = timestamp;

  //     if (autoRotateRef.current) targetRotation.current.y += autoRotateSpeed * deltaTime;
  //     if (!isDragging.current && !autoRotateRef.current) targetRotation.current.x *= 0.95;

  //     currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.1;
  //     currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.1;

  //     if (modelRef.current) {
  //       modelRef.current.rotation.x = currentRotation.current.x;
  //       modelRef.current.rotation.y = currentRotation.current.y;
  //     }

  //     renderer.render(scene, camera);
  //   };

  //   animate();

  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //     window.removeEventListener('mouseup', handleMouseUp);
  //     window.removeEventListener('resize', handleResize);
  //     container.removeEventListener('mousedown', handleMouseDown);
  //     container.removeEventListener('touchstart', handleTouchStart);
  //     container.removeEventListener('touchmove', handleTouchMove);
  //     container.removeEventListener('touchend', handleTouchEnd);
  //     if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
  //       mountRef.current.removeChild(renderer.domElement);
  //     }
      

  //     modelRef.current?.traverse((child) => {
  //       if (child.geometry) child.geometry.dispose();
  //       if (child.material) {
  //         Array.isArray(child.material) ? child.material.forEach(m => m.dispose()) : child.material.dispose();
  //       }
  //     });
  //     renderer.dispose();
  //   };
  // }, [darkMode, modelPath]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
      {/* Animated bubbles */}
      {animationEnabled && bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full opacity-30 bg-white blur-xl animate-float"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: bubble.left,
            top: bubble.top,
            animationDuration: bubble.animationDuration,
            animationDelay: bubble.animationDelay,
          }}
        />
      ))}
       {/* Controls */}
       <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={() => setAnimationEnabled(!animationEnabled)}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded-full text-sm transition-all duration-300"
        >
          {animationEnabled ? '' : ''}
        </button>
      </div>
    <div className={`flex flex-col min-h-screen ${darkMode ? ' text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto px-4 py-16 md:py-24 h-screen">
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <h1 className={`text-4xl md:text-6xl lg:text-6xl font-bold leading-tight mb-6 ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
            Create Amazing <br />
            Digital Experiences
          </h1>
          <p className={`text-2xl font-semibold md:text-xl mb-8 max-w-lg ${darkMode ? 'text-black' : 'text-cyan-500'}`}>
            An Inclusive Audio to Indian Sign Language converter for the Deaf and Hard of Hearing Community.
          </p>
          <div className="flex space-x-4">
            <button onClick={() => document.getElementById('cards').scrollIntoView({ behavior: 'smooth' })} className={`px-6 py-3 rounded-lg font-medium text-white ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'} transition duration-300 ease-in-out transform hover:scale-105`}>
              Get Started
            </button>
          
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
        <img src='/AurisVue_logo.png' alt="Logo" className={`w-96 h-96  ${darkMode ? 'text-purple-300' : 'text-blue-600'}`} />
          {/* <div ref={mountRef} className="w-full h-100 md:h-106"></div> */}
          
        </div>
      </div>
    </div>
    </div>
  );
};

export default HeroSection;


const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0) rotate(0);
      opacity: 0.3;
    }
    33% {
      transform: translateY(-50px) translateX(50px) rotate(120deg);
      opacity: 0.6;
    }
    66% {
      transform: translateY(50px) translateX(-30px) rotate(240deg);
      opacity: 0.3;
    }
    100% {
      transform: translateY(0) translateX(0) rotate(360deg);
      opacity: 0.3;
    }
  }
  
  .animate-float {
    animation-name: float;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
`;
document.head.appendChild(style);