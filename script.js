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
    
    // Add interactive particle background
    initParticleBackground();
    
    // Initialize cursor effects
    initCursorEffects();
    
    // Set up smooth scrolling
    setupSmoothScrolling();
    
    // Set up contact form
    if (contactForm) {
        setupContactForm();
    }
    
    // Initialize parallax effects
    initParallaxEffects();
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

// Add an interactive particle background that responds to mouse movement
function initParticleBackground() {
    const body = document.querySelector('body');
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.classList.add('particle-background');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Resize canvas when window size changes
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Particle array
    const particles = [];
    const particleCount = 80;
    
    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    // Track mouse position
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = getRandomColor();
        }
        
        update() {
            // Move particles
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Mouse interaction - particles are gently attracted to mouse position
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (200 - distance) / 500;
                
                this.speedX += forceDirectionX * force;
                this.speedY += forceDirectionY * force;
            }
            
            // Limit speed
            this.speedX = Math.min(Math.max(this.speedX, -1), 1);
            this.speedY = Math.min(Math.max(this.speedY, -1), 1);
            
            // Boundary detection
            if (this.x < 0 || this.x > canvas.width) {
                this.speedX *= -1;
            }
            
            if (this.y < 0 || this.y > canvas.height) {
                this.speedY *= -1;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    function getRandomColor() {
        // Generate colors in blue/purple theme with transparency
        const r = Math.floor(Math.random() * 50 + 50);  
        const g = Math.floor(Math.random() * 100 + 50);
        const b = Math.floor(Math.random() * 155 + 100);
        const a = Math.random() * 0.5 + 0.1;
        
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    
    // Initialize particles
    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Connect particles with lines
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(58, 134, 255, ${0.15 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        connectParticles();
    }
    
    init();
    animate();
}

// Custom cursor effects
function initCursorEffects() {
    const body = document.querySelector('body');
    
    // Create cursor elements
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    cursorDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
    `;
    
    const cursorRing = document.createElement('div');
    cursorRing.classList.add('cursor-ring');
    cursorRing.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid rgba(58, 134, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: all 0.2s ease;
    `;
    
    body.appendChild(cursorDot);
    body.appendChild(cursorRing);
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        
        // The ring follows with a slight delay for a more dynamic effect
        cursorRing.style.left = `${e.clientX}px`;
        cursorRing.style.top = `${e.clientY}px`;
    });
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .service-card, .tech-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorRing.style.width = '60px';
            cursorRing.style.height = '60px';
            cursorRing.style.borderColor = 'rgba(58, 134, 255, 0.8)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorRing.style.width = '40px';
            cursorRing.style.height = '40px';
            cursorRing.style.borderColor = 'rgba(58, 134, 255, 0.5)';
        });
    });
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
    });
}

// Add parallax effects to various sections
function initParallaxEffects() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            // Get section position relative to viewport
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if section is visible
            if (scrollY > sectionTop - window.innerHeight && scrollY < sectionTop + sectionHeight) {
                const elements = section.querySelectorAll('.section-header, .service-card, .tech-item, .about-text, .about-stats');
                
                elements.forEach(element => {
                    // Calculate parallax effect
                    const speed = 0.1;
                    const yPos = (scrollY - sectionTop) * speed;
                    
                    // Apply transform
                    element.style.transform = `translateY(${yPos}px)`;
                });
            }
        });
    });
}

// Greatly enhanced Hero 3D animation with Three.js
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
    
    // Add point lights for dynamic lighting effects
    const pointLightColors = [0x3a86ff, 0x8338ec, 0xff006e];
    const pointLights = [];
    
    pointLightColors.forEach((color, index) => {
        const light = new THREE.PointLight(color, 1, 10);
        light.position.set(
            Math.sin(Math.PI * 2 / 3 * index) * 5,
            Math.cos(Math.PI * 2 / 3 * index) * 5,
            2
        );
        scene.add(light);
        pointLights.push(light);
    });
    
    // Create a more complex neural network structure
    // Main brain structure
    const brainGroup = new THREE.Group();
    scene.add(brainGroup);
    
    // Create base sphere
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x1a1a2e,
        transparent: true,
        opacity: 0.1,
        wireframe: true
    });
    
    const baseSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    brainGroup.add(baseSphere);
    
    // Add inner sphere with glow effect
    const innerSphereGeometry = new THREE.SphereGeometry(1.7, 32, 32);
    const innerSphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x3a86ff,
        emissive: 0x3a86ff,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.2
    });
    
    const innerSphere = new THREE.Mesh(innerSphereGeometry, innerSphereMaterial);
    brainGroup.add(innerSphere);
    
    // Neural nodes
    const nodesCount = 200;
    const nodes = [];
    const nodePositions = [];
    
    for (let i = 0; i < nodesCount; i++) {
        // Create nodes at random positions on a sphere
        const radius = 1.8 + Math.random() * 0.3;
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        const nodeGeometry = new THREE.SphereGeometry(0.02 + Math.random() * 0.03, 8, 8);
        
        // Use different colors for visual interest
        const hue = 0.6 + Math.random() * 0.2; // Blue to purple in HSL
        const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
        
        const nodeMaterial = new THREE.MeshPhongMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.5
        });
        
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.set(x, y, z);
        
        // Store original position and random animation parameters
        node.userData = {
            originalPos: new THREE.Vector3(x, y, z),
            pulseSpeed: Math.random() * 2 + 1,
            orbitSpeed: Math.random() * 0.01 + 0.005,
            orbitRadius: Math.random() * 0.1 + 0.05
        };
        
        brainGroup.add(node);
        nodes.push(node);
        nodePositions.push(new THREE.Vector3(x, y, z));
    }
    
    // Create neural connections
    const connectionsGroup = new THREE.Group();
    brainGroup.add(connectionsGroup);
    
    // Find connections between nearby nodes
    const connections = [];
    const connectionsMaterial = new THREE.LineBasicMaterial({
        color: 0x3a86ff,
        transparent: true,
        opacity: 0.2
    });
    
    for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        const posA = nodePositions[i];
        
        // Connect to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
            const posB = nodePositions[j];
            const distance = posA.distanceTo(posB);
            
            if (distance < 0.8) {
                const geometry = new THREE.BufferGeometry().setFromPoints([posA, posB]);
                const line = new THREE.Line(geometry, connectionsMaterial);
                
                // Add pulse animation data
                line.userData = {
                    startNode: i,
                    endNode: j,
                    pulsePosition: 0,
                    pulseSpeed: Math.random() * 0.04 + 0.01,
                    active: Math.random() > 0.7 // Only some connections active at start
                };
                
                connectionsGroup.add(line);
                connections.push(line);
            }
        }
    }
    
    // Add data packets that travel along connections
    const dataPackets = [];
    const packetGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const packetMaterial = new THREE.MeshPhongMaterial({
        color: 0xff006e,
        emissive: 0xff006e,
        emissiveIntensity: 0.8
    });
    
    // Create initial data packets
    for (let i = 0; i < 20; i++) {
        if (connections.length === 0) break;
        
        const packet = new THREE.Mesh(packetGeometry, packetMaterial);
        
        // Assign to a random connection
        const connectionIndex = Math.floor(Math.random() * connections.length);
        const connection = connections[connectionIndex];
        
        packet.userData = {
            connection: connection,
            progress: Math.random(), // Start at random position
            speed: Math.random() * 0.01 + 0.005
        };
        
        packet.visible = connection.userData.active;
        brainGroup.add(packet);
        dataPackets.push(packet);
    }
    
    // Add orbiting outer elements
    const orbitingElementsCount = 5;
    const orbitingElements = [];
    
    for (let i = 0; i < orbitingElementsCount; i++) {
        const geometry = new THREE.IcosahedronGeometry(0.2, 0);
        const material = new THREE.MeshPhongMaterial({
            color: 0x8338ec,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        
        const element = new THREE.Mesh(geometry, material);
        
        // Position in orbit
        const orbitRadius = 3;
        const angle = (i / orbitingElementsCount) * Math.PI * 2;
        
        element.position.x = Math.cos(angle) * orbitRadius;
        element.position.y = Math.sin(angle) * orbitRadius;
        element.position.z = (Math.random() - 0.5) * 2;
        
        element.userData = {
            orbitSpeed: 0.005 + Math.random() * 0.01,
            orbitRadius: orbitRadius,
            orbitAngle: angle,
            rotationSpeed: {
                x: Math.random() * 0.02,
                y: Math.random() * 0.02,
                z: Math.random() * 0.02
            }
        };
        
        scene.add(element);
        orbitingElements.push(element);
    }
    
    // Add holographic rings
    const ringsCount = 3;
    const rings = [];
    
    for (let i = 0; i < ringsCount; i++) {
        const ringGeometry = new THREE.TorusGeometry(2.2 + i * 0.3, 0.03, 16, 100);
        const ringMaterial = new THREE.MeshPhongMaterial({
            color: 0x3a86ff,
            emissive: 0x3a86ff,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        
        // Create random rotation axis
        ring.userData = {
            rotationAxis: new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).normalize(),
            rotationSpeed: Math.random() * 0.003 + 0.001
        };
        
        brainGroup.add(ring);
        rings.push(ring);
    }
    
    // Interactive elements - respond to mouse movement
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    
    document.addEventListener('mousemove', (event) => {
        // Normalize mouse position to -1 to 1
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Position camera
    camera.position.z = 5;
    
    // Animate the scene
    function animate() {
        requestAnimationFrame(animate);
        
        const time = Date.now() * 0.001;
        
        // Smooth mouse following
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        // Rotate the brain group based on mouse position
        brainGroup.rotation.y = targetX * 0.5;
        brainGroup.rotation.x = targetY * 0.5;
        
        // Animate point lights
        pointLights.forEach((light, index) => {
            const angle = time * 0.5 + (index * Math.PI * 2 / pointLights.length);
            light.position.x = Math.sin(angle) * 5;
            light.position.y = Math.cos(angle) * 5;
            light.intensity = 0.5 + 0.5 * Math.sin(time * 2 + index);
        });
        
        // Animate neural nodes
        nodes.forEach((node, index) => {
            const originalPos = node.userData.originalPos;
            const pulseSpeed = node.userData.pulseSpeed;
            const orbitSpeed = node.userData.orbitSpeed;
            const orbitRadius = node.userData.orbitRadius;
            
            // Orbital movement
            const orbitAngle = time * orbitSpeed;
            
            const x = originalPos.x + Math.sin(orbitAngle) * orbitRadius;
            const y = originalPos.y + Math.cos(orbitAngle) * orbitRadius;
            const z = originalPos.z + Math.sin(orbitAngle + Math.PI/2) * orbitRadius;
            
            node.position.set(x, y, z);
            
            // Pulse size
            const scale = 1 + 0.3 * Math.sin(time * pulseSpeed);
            node.scale.set(scale, scale, scale);
            
            // Randomly activate connections
            if (Math.random() < 0.001) {
                connections.forEach(conn => {
                    if (conn.userData.startNode === index || conn.userData.endNode === index) {
                        conn.userData.active = true;
                        
                        // Make packets on this connection visible
                        dataPackets.forEach(packet => {
                            if (packet.userData.connection === conn) {
                                packet.visible = true;
                            }
                        });
                    }
                });
            }
        });
        
        // Animate connections
        connections.forEach(connection => {
            if (!connection.userData.active) return;
            
            connection.userData.pulsePosition += connection.userData.pulseSpeed;
            
            if (connection.userData.pulsePosition > 1) {
                connection.userData.pulsePosition = 0;
                
                // Randomly deactivate
                if (Math.random() < 0.1) {
                    connection.userData.active = false;
                    
                    // Hide packets on this connection
                    dataPackets.forEach(packet => {
                        if (packet.userData.connection === connection) {
                            packet.visible = false;
                        }
                    });
                }
            }
            
            // Update connection opacity for pulse effect
            const pulse = Math.sin(connection.userData.pulsePosition * Math.PI);
            connection.material.opacity = 0.1 + 0.4 * pulse;
        });
        
        // Animate data packets
        dataPackets.forEach(packet => {
            const connection = packet.userData.connection;
            
            if (!connection.userData.active) {
                packet.visible = false;
                return;
            }
            
            packet.userData.progress += packet.userData.speed;
            
            if (packet.userData.progress > 1) {
                packet.userData.progress = 0;
            }
            
            const startNodeIndex = connection.userData.startNode;
            const endNodeIndex = connection.userData.endNode;
            
            const startPos = nodes[startNodeIndex].position;
            const endPos = nodes[endNodeIndex].position;
            
            // Interpolate position
            packet.position.lerpVectors(startPos, endPos, packet.userData.progress);
            packet.visible = connection.userData.active;
        });
        
        // Animate orbiting elements
        orbitingElements.forEach(element => {
            // Update orbit position
            element.userData.orbitAngle += element.userData.orbitSpeed;
            const radius = element.userData.orbitRadius;
            
            element.position.x = Math.cos(element.userData.orbitAngle) * radius;
            element.position.y = Math.sin(element.userData.orbitAngle) * radius;
            
            // Rotate the element
            element.rotation.x += element.userData.rotationSpeed.x;
            element.rotation.y += element.userData.rotationSpeed.y;
            element.rotation.z += element.userData.rotationSpeed.z;
        });
        
        // Animate holographic rings
        rings.forEach(ring => {
            const axis = ring.userData.rotationAxis;
            const speed = ring.userData.rotationSpeed;
            
            ring.rotateOnAxis(axis, speed);
            
            // Pulse opacity
            ring.material.opacity = 0.1 + 0.2 * Math.sin(time * 2);
        });
        
        // Pulse inner sphere
        innerSphere.scale.x = 1 + 0.1 * Math.sin(time);
        innerSphere.scale.y = 1 + 0.1 * Math.sin(time);
        innerSphere.scale.z = 1 + 0.1 * Math.sin(time);
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Enhanced technologies section visualization
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