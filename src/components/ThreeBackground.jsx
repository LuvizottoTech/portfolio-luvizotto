import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = ({ onMouseMove, onTransition }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x2f2c29, 1);
    mountRef.current.appendChild(renderer.domElement);

    // Particles geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 10;
      posArray[i + 1] = (Math.random() - 0.5) * 10;
      posArray[i + 2] = (Math.random() - 0.5) * 10;

      // Colors - inspirado no anime.js (tons de cinza com toques brancos)
      const intensity = Math.random();
      colorArray[i] = 0.8 + intensity * 0.2;     // R
      colorArray[i + 1] = 0.8 + intensity * 0.2; // G
      colorArray[i + 2] = 0.8 + intensity * 0.2; // B
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Particles material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    // Particles mesh
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Geometric shapes (inspirado no anime.js)
    const geometries = [
      new THREE.TetrahedronGeometry(0.1),
      new THREE.OctahedronGeometry(0.1),
      new THREE.IcosahedronGeometry(0.1)
    ];

    const shapeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });

    const shapes = [];
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const shape = new THREE.Mesh(geometry, shapeMaterial);
      
      shape.position.x = (Math.random() - 0.5) * 8;
      shape.position.y = (Math.random() - 0.5) * 8;
      shape.position.z = (Math.random() - 0.5) * 8;
      
      shape.rotation.x = Math.random() * Math.PI;
      shape.rotation.y = Math.random() * Math.PI;
      
      shapes.push(shape);
      scene.add(shape);
    }

    camera.position.z = 3;

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    particlesRef.current = particles;

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      if (onMouseMove) {
        onMouseMove(mouseRef.current);
      }
    };

    // Mouse wheel handler for transition
    const handleWheel = (event) => {
      if (event.deltaY > 0 && onTransition) {
        onTransition('next');
      }
    };

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Rotate particles based on mouse
      if (particles) {
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.001;
        
        // Mouse interaction
        particles.rotation.x += mouseRef.current.y * 0.0005;
        particles.rotation.y += mouseRef.current.x * 0.0005;
      }

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 + index * 0.001;
        shape.rotation.y += 0.005 + index * 0.001;
        
        // Float animation
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.0005;
        
        // Mouse interaction
        const distance = Math.sqrt(
          Math.pow(shape.position.x - mouseRef.current.x * 3, 2) +
          Math.pow(shape.position.y - mouseRef.current.y * 3, 2)
        );
        
        if (distance < 1) {
          shape.scale.setScalar(1 + (1 - distance) * 0.5);
        } else {
          shape.scale.setScalar(1);
        }
      });

      renderer.render(scene, camera);
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleWheel);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      scene.clear();
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      geometries.forEach(geo => geo.dispose());
      shapeMaterial.dispose();
    };
  }, [onMouseMove, onTransition]);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default ThreeBackground;
