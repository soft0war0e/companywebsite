// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbarLinks = document.querySelectorAll('.nav-links a');
const contactForm = document.getElementById('contact-form');
const navbar = document.querySelector('.navbar');

// Initialize Animation On Scroll
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Initialize 3D elements
    initHero3D();
    initTechCanvas();
    
    // Set up smooth scrolling
    setupSmoothScrolling();
    
    // Set up contact form
    if (contactForm) {
        setupContactForm();
    }
});

// Navigation menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

// Close the mobile menu when a link is clicked
navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
    });
});

// Change navbar styling on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1.5rem 0';
        navbar.style.boxShadow = 'none';
    }
    
    // Highlight active section in navbar
    highlightActiveSection();
});

// Smooth scrolling for internal links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Highlight active section in the navigation
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navbarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Contact form submission handler
function setupContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For now, let's just show a success message
        
        const formData = new FormData(this);
        let formValues = {};
        
        formData.forEach((value, key) => {
            formValues[key] = value;
        });
        
        console.log('Form submitted:', formValues);
        
        // Simulating form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            
            this.parentNode.insertBefore(successMessage, this);
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            // Remove message after some time
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }, 1500);
    });
}

// Hero section 3D animation with Three.js
function initHero3D() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Responsive canvas
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Creating a neural network-like structure
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    // Generate random positions and colors
    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 6;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
        
        // Blue-purple gradient for AI theme
        colors[i * 3] = 0.2 + Math.random() * 0.2;     // R
        colors[i * 3 + 1] = 0.3 + Math.random() * 0.3; // G
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    // Create the particles
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Add lines to connect some particles (neural connections)
    const connectionsMaterial = new THREE.LineBasicMaterial({ 
        color: 0x8338ec,
        transparent: true,
        opacity: 0.2
    });
    
    // Create connections between nearby particles
    const connectionsGeometry = new THREE.BufferGeometry();
    const connectionPositions = [];
    
    // Find connections between nearby particles
    for (let i = 0; i < particlesCount; i++) {
        const posA = new THREE.Vector3(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2]
        );
        
        for (let j = i + 1; j < particlesCount; j++) {
            const posB = new THREE.Vector3(
                positions[j * 3],
                positions[j * 3 + 1],
                positions[j * 3 + 2]
            );
            
            const distance = posA.distanceTo(posB);
            
            // Only connect if they're close enough
            if (distance < 1.5) {
                connectionPositions.push(posA.x, posA.y, posA.z);
                connectionPositions.push(posB.x, posB.y, posB.z);
            }
        }
    }
    
    connectionsGeometry.setAttribute(
        'position', 
        new THREE.Float32BufferAttribute(connectionPositions, 3)
    );
    
    const connections = new THREE.LineSegments(connectionsGeometry, connectionsMaterial);
    scene.add(connections);
    
    // Animated neural network node (center piece)
    const sphereGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x3a86ff,
        emissive: 0x3a86ff,
        emissiveIntensity: 0.5,
        shininess: 100
    });
    
    const mainSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(mainSphere);
    
    // Add a few more spheres as main nodes
    const nodePositions = [
        new THREE.Vector3(1.5, 1, 0),
        new THREE.Vector3(-1.2, -0.8, 0.5),
        new THREE.Vector3(0, 1.2, -1),
        new THREE.Vector3(-1, 0.5, 1)
    ];
    
    const nodes = [];
    
    nodePositions.forEach(position => {
        const nodeGeometry = new THREE.SphereGeometry(0.1, 24, 24);
        const nodeMaterial = new THREE.MeshPhongMaterial({
            color: 0xff006e,
            emissive: 0xff006e,
            emissiveIntensity: 0.3,
            shininess: 80
        });
        
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.copy(position);
        scene.add(node);
        nodes.push(node);
    });
    
    // Connect main nodes
    const nodeConnectionsGeometry = new THREE.BufferGeometry();
    const nodeConnectionPositions = [];
    
    // Connect center to all nodes
    nodes.forEach(node => {
        nodeConnectionPositions.push(0, 0, 0);
        nodeConnectionPositions.push(
            node.position.x,
            node.position.y,
            node.position.z
        );
    });
    
    // Connect nodes to each other
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            nodeConnectionPositions.push(
                nodes[i].position.x,
                nodes[i].position.y,
                nodes[i].position.z
            );
            nodeConnectionPositions.push(
                nodes[j].position.x,
                nodes[j].position.y,
                nodes[j].position.z
            );
        }
    }
    
    nodeConnectionsGeometry.setAttribute(
        'position', 
        new THREE.Float32BufferAttribute(nodeConnectionPositions, 3)
    );
    
    const nodeConnectionsMaterial = new THREE.LineBasicMaterial({ 
        color: 0xff006e,
        transparent: true,
        opacity: 0.4
    });
    
    const nodeConnections = new THREE.LineSegments(nodeConnectionsGeometry, nodeConnectionsMaterial);
    scene.add(nodeConnections);
    
    // Position camera
    camera.position.z = 4;
    
    // Animate the scene
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the entire neural network
        particles.rotation.y += 0.002;
        particles.rotation.x += 0.001;
        connections.rotation.y += 0.002;
        connections.rotation.x += 0.001;
        
        // Pulse the main node
        const time = Date.now() * 0.001;
        mainSphere.scale.x = 1 + 0.2 * Math.sin(time);
        mainSphere.scale.y = 1 + 0.2 * Math.sin(time);
        mainSphere.scale.z = 1 + 0.2 * Math.sin(time);
        
        // Animate the connection nodes
        nodes.forEach((node, index) => {
            node.position.y += Math.sin(time + index) * 0.003;
            node.position.x += Math.cos(time + index * 0.6) * 0.003;
            
            // Reset position if it moves too far
            const dist = node.position.distanceTo(nodePositions[index]);
            if (dist > 0.3) {
                node.position.lerp(nodePositions[index], 0.05);
            }
        });
        
        // Update the node connections
        const nodeConnectionPositions = [];
        
        // Connect center to all nodes
        nodes.forEach(node => {
            nodeConnectionPositions.push(0, 0, 0);
            nodeConnectionPositions.push(
                node.position.x,
                node.position.y,
                node.position.z
            );
        });
        
        // Connect nodes to each other
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                nodeConnectionPositions.push(
                    nodes[i].position.x,
                    nodes[i].position.y,
                    nodes[i].position.z
                );
                nodeConnectionPositions.push(
                    nodes[j].position.x,
                    nodes[j].position.y,
                    nodes[j].position.z
                );
            }
        }
        
        nodeConnections.geometry.setAttribute(
            'position', 
            new THREE.Float32BufferAttribute(nodeConnectionPositions, 3)
        );
        nodeConnections.geometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Technologies section visualization
function initTechCanvas() {
    const container = document.getElementById('tech-canvas-container');
    if (!container) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Responsive canvas
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Create abstract AI brain visualization
    // Base sphere
    const brainGeometry = new THREE.SphereGeometry(2, 32, 32);
    const brainMaterial = new THREE.MeshPhongMaterial({
        color: 0x1a1a2e,
        emissive: 0x3a86ff,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.7,
        wireframe: true
    });
    
    const brain = new THREE.Mesh(brainGeometry, brainMaterial);
    scene.add(brain);
    
    // Create floating data cubes
    const cubes = [];
    const cubeCount = 20;
    
    for (let i = 0; i < cubeCount; i++) {
        const size = Math.random() * 0.3 + 0.1;
        const geometry = new THREE.BoxGeometry(size, size, size);
        
        // Random color between blue and purple
        const hue = 0.6 + Math.random() * 0.1; // Blue to purple in HSL
        const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
        
        const material = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: 0.7,
            shininess: 80
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Position cubes around the brain
        const radius = 2.5 + Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 2;
        
        cube.position.x = radius * Math.sin(phi) * Math.cos(theta);
        cube.position.y = radius * Math.sin(phi) * Math.sin(theta);
        cube.position.z = radius * Math.cos(phi);
        
        // Store original position
        cube.userData.originalPosition = cube.position.clone();
        cube.userData.orbitSpeed = Math.random() * 0.01 + 0.005;
        cube.userData.pulseSpeed = Math.random() * 2;
        
        scene.add(cube);
        cubes.push(cube);
    }
    
    // Create energy lines between cubes and brain
    const linesMaterial = new THREE.LineBasicMaterial({ 
        color: 0x3a86ff,
        transparent: true,
        opacity: 0.3
    });
    
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    
    // Connect each cube to the brain center
    cubes.forEach(cube => {
        linePositions.push(0, 0, 0);
        linePositions.push(
            cube.position.x,
            cube.position.y,
            cube.position.z
        );
    });
    
    linesGeometry.setAttribute(
        'position', 
        new THREE.Float32BufferAttribute(linePositions, 3)
    );
    
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);
    
    // Create pulsing rings
    const rings = [];
    const ringCount = 3;
    
    for (let i = 0; i < ringCount; i++) {
        const ringGeometry = new THREE.TorusGeometry(2.5, 0.03, 16, 100);
        const ringMaterial = new THREE.MeshPhongMaterial({
            color: 0x8338ec,
            emissive: 0x8338ec,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.5
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.userData.rotationAxis = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize();
        
        ring.userData.rotationSpeed = Math.random() * 0.01 + 0.005;
        
        scene.add(ring);
        rings.push(ring);
    }
    
    // Position camera
    camera.position.z = 6;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        const time = Date.now() * 0.001;
        
        // Rotate the brain
        brain.rotation.y += 0.003;
        brain.rotation.x += 0.001;
        
        // Animate cubes
        cubes.forEach(cube => {
            const originalPos = cube.userData.originalPosition;
            
            // Orbit around brain
            const orbitSpeed = cube.userData.orbitSpeed;
            const orbitAngle = time * orbitSpeed;
            
            cube.position.x = originalPos.x * Math.cos(orbitAngle) - originalPos.z * Math.sin(orbitAngle);
            cube.position.z = originalPos.x * Math.sin(orbitAngle) + originalPos.z * Math.cos(orbitAngle);
            
            // Pulse size
            const pulseSpeed = cube.userData.pulseSpeed;
            const pulseFactor = 0.2 * Math.sin(time * pulseSpeed) + 1;
            
            cube.scale.set(pulseFactor, pulseFactor, pulseFactor);
            
            // Rotate cube
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        });
        
        // Update energy lines
        const linePositions = [];
        
        cubes.forEach(cube => {
            linePositions.push(0, 0, 0);
            linePositions.push(
                cube.position.x,
                cube.position.y,
                cube.position.z
            );
        });
        
        lines.geometry.setAttribute(
            'position', 
            new THREE.Float32BufferAttribute(linePositions, 3)
        );
        lines.geometry.attributes.position.needsUpdate = true;
        
        // Animate rings
        rings.forEach(ring => {
            const axis = ring.userData.rotationAxis;
            const speed = ring.userData.rotationSpeed;
            
            ring.rotateOnAxis(axis, speed);
            
            // Pulse opacity
            ring.material.opacity = 0.3 + 0.2 * Math.sin(time * 2);
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
} 