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
    
    // Add floating 3D service icons
    init3DServiceIcons();
    
    // Add 3D stat visualizations
    init3DStats();
    
    // Add interactive contact form elements
    enhanceContactSection();
    
    // Add footer 3D effects
    addFooterEffects();

    initDynamicBackground();
    
    // Add holographic UI elements
    addHolographicElements();
    
    // Add section transition effects
    initSectionTransitions();
    
    // Add AI data stream visualization
    initAIDataVisualization();
    
    // Add neural network background to About section
    initAboutSectionEffects();
    
    // Add floating 3D logo
    create3DLogo();
    
    // Create neural environment background
    createNeuralEnvironment();
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

// Add floating 3D service icons that replace the current flat icons
function init3DServiceIcons() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (!serviceCards.length) return;
    
    // For each service card, create a mini 3D icon
    serviceCards.forEach((card, index) => {
        // Get the icon container
        const iconContainer = card.querySelector('.service-icon');
        if (!iconContainer) return;
        
        // Remove existing icon
        iconContainer.innerHTML = '';
        
        // Create canvas for 3D icon
        const canvas = document.createElement('canvas');
        canvas.classList.add('service-3d-icon');
        canvas.width = 100;
        canvas.height = 100;
        iconContainer.appendChild(canvas);
        
        // Initialize Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        
        renderer.setSize(canvas.width, canvas.height);
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0x3a86ff, 1, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);
        
        // Create different 3D models based on service type
        let geometry, material, mesh;
        
        switch(index) {
            // AI Development - Brain shape
            case 0:
                geometry = new THREE.IcosahedronGeometry(1, 1);
                material = new THREE.MeshPhongMaterial({
                    color: 0x3a86ff,
                    emissive: 0x3a86ff,
                    emissiveIntensity: 0.3,
                    wireframe: true
                });
                mesh = new THREE.Mesh(geometry, material);
                
                // Add inner glow
                const innerGeometry = new THREE.IcosahedronGeometry(0.8, 1);
                const innerMaterial = new THREE.MeshPhongMaterial({
                    color: 0x3a86ff,
                    emissive: 0x3a86ff,
                    emissiveIntensity: 0.7,
                    transparent: true,
                    opacity: 0.6
                });
                const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
                mesh.add(innerMesh);
                break;
                
            // Machine Learning - Cube with data points
            case 1:
                // Create base cube
                geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
                material = new THREE.MeshPhongMaterial({
                    color: 0x8338ec,
                    transparent: true,
                    opacity: 0.7,
                    wireframe: true
                });
                mesh = new THREE.Mesh(geometry, material);
                
                // Add random data points inside the cube
                const pointsGroup = new THREE.Group();
                for (let i = 0; i < 20; i++) {
                    const pointGeometry = new THREE.SphereGeometry(0.05, 8, 8);
                    const pointMaterial = new THREE.MeshPhongMaterial({
                        color: 0xffffff,
                        emissive: 0xffffff,
                        emissiveIntensity: 0.5
                    });
                    const point = new THREE.Mesh(pointGeometry, pointMaterial);
                    
                    // Position within cube bounds
                    point.position.set(
                        (Math.random() - 0.5) * 1.2, 
                        (Math.random() - 0.5) * 1.2, 
                        (Math.random() - 0.5) * 1.2
                    );
                    pointsGroup.add(point);
                }
                mesh.add(pointsGroup);
                break;
                
            // NLP Solutions - Text bubble with particles
            case 2:
                // Create speech bubble shape
                geometry = new THREE.SphereGeometry(1, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.8);
                material = new THREE.MeshPhongMaterial({
                    color: 0xff006e,
                    transparent: true,
                    opacity: 0.7,
                    side: THREE.DoubleSide
                });
                mesh = new THREE.Mesh(geometry, material);
                
                // Add floating text particles
                const textParticles = new THREE.Group();
                for (let i = 0; i < 15; i++) {
                    // Small text-like bars
                    const textGeometry = new THREE.BoxGeometry(
                        (Math.random() * 0.3) + 0.1, 
                        0.05, 
                        0.05
                    );
                    const textMaterial = new THREE.MeshPhongMaterial({
                        color: 0xffffff,
                        transparent: true,
                        opacity: 0.8
                    });
                    const text = new THREE.Mesh(textGeometry, textMaterial);
                    
                    // Position them within the speech bubble
                    const angle = Math.random() * Math.PI * 2;
                    const radius = Math.random() * 0.6;
                    text.position.set(
                        Math.cos(angle) * radius,
                        Math.sin(angle) * radius - 0.1,
                        0.5
                    );
                    
                    text.userData = {
                        floatSpeed: Math.random() * 0.01 + 0.005,
                        originalY: text.position.y
                    };
                    
                    textParticles.add(text);
                }
                mesh.add(textParticles);
                mesh.rotation.x = -0.3;
                break;
                
            // Computer Vision - Eye with scanning lines
            case 3:
                // Create eye shape
                geometry = new THREE.SphereGeometry(1, 32, 32);
                material = new THREE.MeshPhongMaterial({
                    color: 0x1a1a2e,
                    transparent: true,
                    opacity: 0.8
                });
                mesh = new THREE.Mesh(geometry, material);
                
                // Add iris
                const irisGeometry = new THREE.CircleGeometry(0.5, 32);
                const irisMaterial = new THREE.MeshPhongMaterial({
                    color: 0x3a86ff,
                    emissive: 0x3a86ff,
                    emissiveIntensity: 0.5,
                    side: THREE.DoubleSide
                });
                const iris = new THREE.Mesh(irisGeometry, irisMaterial);
                iris.position.z = 0.9;
                
                // Add pupil
                const pupilGeometry = new THREE.CircleGeometry(0.2, 32);
                const pupilMaterial = new THREE.MeshPhongMaterial({
                    color: 0x000000,
                    side: THREE.DoubleSide
                });
                const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
                pupil.position.z = 0.91;
                
                // Add scanning lines
                const scanGroup = new THREE.Group();
                for (let i = 0; i < 5; i++) {
                    const scanGeometry = new THREE.PlaneGeometry(2, 0.05);
                    const scanMaterial = new THREE.MeshPhongMaterial({
                        color: 0xff006e,
                        transparent: true,
                        opacity: 0.5,
                        side: THREE.DoubleSide
                    });
                    const scan = new THREE.Mesh(scanGeometry, scanMaterial);
                    scan.position.y = -1 + (i * 0.5);
                    scan.position.z = 1.1;
                    scan.userData = {
                        speed: 0.01 + (Math.random() * 0.01),
                        direction: 1
                    };
                    scanGroup.add(scan);
                }
                
                mesh.add(iris);
                mesh.add(pupil);
                mesh.add(scanGroup);
                break;
        }
        
        scene.add(mesh);
        camera.position.z = 4;
        
        // Animation function
        function animate() {
            requestAnimationFrame(animate);
            
            const time = Date.now() * 0.001;
            
            // Rotate the mesh
            if (mesh) {
                mesh.rotation.y += 0.01;
                
                // Different animations for different service icons
                switch(index) {
                    case 0: // AI Development
                        mesh.rotation.x = Math.sin(time * 0.5) * 0.2;
                        if (mesh.children[0]) {
                            mesh.children[0].scale.set(
                                1 + 0.1 * Math.sin(time * 2),
                                1 + 0.1 * Math.sin(time * 2),
                                1 + 0.1 * Math.sin(time * 2)
                            );
                        }
                        break;
                    
                    case 1: // Machine Learning
                        mesh.rotation.z += 0.005;
                        if (mesh.children[0]) {
                            const points = mesh.children[0].children;
                            points.forEach((point, i) => {
                                point.position.y += Math.sin(time + i) * 0.001;
                                point.material.emissiveIntensity = 0.3 + 0.3 * Math.sin(time * 2 + i);
                            });
                        }
                        break;
                    
                    case 2: // NLP Solutions
                        if (mesh.children[0]) {
                            const textParticles = mesh.children[0].children;
                            textParticles.forEach((text, i) => {
                                text.position.y = text.userData.originalY + Math.sin(time * 2 + i) * 0.1;
                                text.rotation.z = Math.sin(time + i * 0.5) * 0.2;
                            });
                        }
                        break;
                    
                    case 3: // Computer Vision
                        if (mesh.children[2]) { // Scan lines
                            const scanLines = mesh.children[2].children;
                            scanLines.forEach(line => {
                                line.position.y += line.userData.speed * line.userData.direction;
                                
                                // Reverse direction at boundaries
                                if (line.position.y > 1 || line.position.y < -1) {
                                    line.userData.direction *= -1;
                                }
                                
                                line.material.opacity = 0.3 + 0.3 * Math.sin(time * 3);
                            });
                        }
                        
                        // Make pupil and iris pulse
                        if (mesh.children[0] && mesh.children[1]) {
                            const iris = mesh.children[0];
                            const pupil = mesh.children[1];
                            
                            const pulseFactor = 1 + 0.1 * Math.sin(time * 2);
                            iris.scale.set(pulseFactor, pulseFactor, 1);
                            pupil.scale.set(pulseFactor * 0.9, pulseFactor * 0.9, 1);
                        }
                        break;
                }
            }
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            if (mesh) {
                // Speed up rotation on hover
                mesh.userData = mesh.userData || {};
                mesh.userData.originalRotationSpeed = 0.01;
                mesh.userData.hoverRotationSpeed = 0.05;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (mesh) {
                // Restore original rotation speed
                mesh.userData = mesh.userData || {};
                mesh.userData.hoverRotationSpeed = 0.01;
            }
        });
    });
}

// Add 3D visualizations to the stats in About section
function init3DStats() {
    const statItems = document.querySelectorAll('.stat-item');
    
    if (!statItems.length) return;
    
    statItems.forEach((statItem, index) => {
        // Create a canvas for the 3D visualization
        const canvas = document.createElement('canvas');
        canvas.classList.add('stat-3d-visual');
        canvas.width = 80;
        canvas.height = 80;
        canvas.style.position = 'absolute';
        canvas.style.top = '10px';
        canvas.style.right = '10px';
        canvas.style.pointerEvents = 'none';
        
        // Add it to the stat item
        statItem.style.position = 'relative';
        statItem.appendChild(canvas);
        
        // Set up Three.js
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        
        renderer.setSize(canvas.width, canvas.height);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0x3a86ff, 1, 100);
        pointLight.position.set(3, 3, 3);
        scene.add(pointLight);
        
        // Create different visualizations for each stat
        let mesh;
        
        switch(index) {
            // Years of Innovation
            case 0:
                // Create a growing tree-like structure
                const treeGeometry = new THREE.CylinderGeometry(0.1, 0.2, 2, 8);
                const treeMaterial = new THREE.MeshPhongMaterial({
                    color: 0x3a86ff,
                    emissive: 0x3a86ff,
                    emissiveIntensity: 0.2
                });
                mesh = new THREE.Mesh(treeGeometry, treeMaterial);
                
                // Add branches
                for (let i = 0; i < 3; i++) {
                    const branchGeometry = new THREE.CylinderGeometry(0.05, 0.08, 1, 8);
                    const branchMaterial = new THREE.MeshPhongMaterial({
                        color: 0x3a86ff,
                        emissive: 0x3a86ff,
                        emissiveIntensity: 0.2
                    });
                    const branch = new THREE.Mesh(branchGeometry, branchMaterial);
                    
                    branch.rotation.z = Math.PI / 4 + (i * Math.PI / 2);
                    branch.position.y = 0.3 + (i * 0.4);
                    
                    mesh.add(branch);
                }
                
                mesh.rotation.x = Math.PI / 2;
                mesh.position.y = -0.5;
                break;
                
            // AI Models Developed
            case 1:
                // Create a cluster of nodes representing models
                mesh = new THREE.Group();
                
                for (let i = 0; i < 30; i++) {
                    const modelGeometry = new THREE.SphereGeometry(0.1, 8, 8);
                    const modelMaterial = new THREE.MeshPhongMaterial({
                        color: 0x8338ec,
                        emissive: 0x8338ec,
                        emissiveIntensity: 0.3
                    });
                    const model = new THREE.Mesh(modelGeometry, modelMaterial);
                    
                    // Position in a 3D grid
                    model.position.set(
                        (Math.random() - 0.5) * 2,
                        (Math.random() - 0.5) * 2,
                        (Math.random() - 0.5) * 2
                    );
                    
                    // Store original position
                    model.userData = {
                        originalPos: model.position.clone(),
                        pulseSpeed: Math.random() * 2 + 1
                    };
                    
                    mesh.add(model);
                }
                break;
                
            // Client Satisfaction
            case 2:
                // Create a percentage chart
                mesh = new THREE.Group();
                
                // Background circle
                const bgGeometry = new THREE.RingGeometry(0.8, 1, 32);
                const bgMaterial = new THREE.MeshBasicMaterial({
                    color: 0x1a1a2e,
                    side: THREE.DoubleSide
                });
                const bgRing = new THREE.Mesh(bgGeometry, bgMaterial);
                mesh.add(bgRing);
                
                // Progress circle (99%)
                const progressGeometry = new THREE.RingGeometry(0.8, 1, 32, 1, 0, Math.PI * 2 * 0.99);
                const progressMaterial = new THREE.MeshPhongMaterial({
                    color: 0xff006e,
                    emissive: 0xff006e,
                    emissiveIntensity: 0.3,
                    side: THREE.DoubleSide
                });
                const progressRing = new THREE.Mesh(progressGeometry, progressMaterial);
                mesh.add(progressRing);
                break;
                
            // 24/7 Technical Support
            case 3:
                // Create a spinning clock
                mesh = new THREE.Group();
                
                // Clock face
                const clockGeometry = new THREE.CircleGeometry(1, 32);
                const clockMaterial = new THREE.MeshPhongMaterial({
                    color: 0x1a1a2e,
                    side: THREE.DoubleSide
                });
                const clockFace = new THREE.Mesh(clockGeometry, clockMaterial);
                mesh.add(clockFace);
                
                // Clock hands
                const hourHandGeometry = new THREE.PlaneGeometry(0.1, 0.5);
                const hourHandMaterial = new THREE.MeshPhongMaterial({
                    color: 0x3a86ff,
                    emissive: 0x3a86ff,
                    emissiveIntensity: 0.5,
                    side: THREE.DoubleSide
                });
                const hourHand = new THREE.Mesh(hourHandGeometry, hourHandMaterial);
                hourHand.position.y = 0.25;
                mesh.add(hourHand);
                
                const minuteHandGeometry = new THREE.PlaneGeometry(0.05, 0.7);
                const minuteHandMaterial = new THREE.MeshPhongMaterial({
                    color: 0xff006e,
                    emissive: 0xff006e,
                    emissiveIntensity: 0.5,
                    side: THREE.DoubleSide
                });
                const minuteHand = new THREE.Mesh(minuteHandGeometry, minuteHandMaterial);
                minuteHand.position.y = 0.35;
                mesh.add(minuteHand);
                break;
        }
        
        scene.add(mesh);
        camera.position.z = 4;
        
        // Animation function
        function animate() {
            requestAnimationFrame(animate);
            
            const time = Date.now() * 0.001;
            
            // Different animations for different stats
            switch(index) {
                case 0: // Years of Innovation
                    mesh.rotation.y += 0.01;
                    // Grow and shrink the tree
                    mesh.scale.y = 1 + 0.1 * Math.sin(time);
                    // Animate branches
                    mesh.children.forEach((branch, i) => {
                        branch.rotation.x = Math.sin(time + i) * 0.1;
                    });
                    break;
                
                case 1: // AI Models Developed
                    mesh.rotation.y += 0.01;
                    mesh.rotation.x += 0.005;
                    // Pulse the models
                    mesh.children.forEach((model, i) => {
                        const pulseSpeed = model.userData.pulseSpeed;
                        const scale = 1 + 0.5 * Math.sin(time * pulseSpeed);
                        model.scale.set(scale, scale, scale);
                    });
                    break;
                
                case 2: // Client Satisfaction
                    mesh.rotation.z += 0.01;
                    // Pulse the progress ring
                    if (mesh.children[1]) {
                        mesh.children[1].material.emissiveIntensity = 0.3 + 0.3 * Math.sin(time * 2);
                    }
                    break;
                
                case 3: // 24/7 Technical Support
                    // Rotate clock hands
                    if (mesh.children[1]) { // Hour hand
                        mesh.children[1].rotation.z = time * 0.1;
                    }
                    if (mesh.children[2]) { // Minute hand
                        mesh.children[2].rotation.z = time * 0.5;
                    }
                    break;
            }
            
            renderer.render(scene, camera);
        }
        
        animate();
    });
}

// Enhance the contact section with interactive elements
function enhanceContactSection() {
    const contactSection = document.querySelector('#contact');
    if (!contactSection) return;
    
    // Add floating particles behind the contact form
    const contactForm = contactSection.querySelector('.contact-form');
    if (!contactForm) return;
    
    // Create a background canvas
    const formBgCanvas = document.createElement('canvas');
    formBgCanvas.classList.add('form-bg-canvas');
    formBgCanvas.style.position = 'absolute';
    formBgCanvas.style.top = '0';
    formBgCanvas.style.left = '0';
    formBgCanvas.style.width = '100%';
    formBgCanvas.style.height = '100%';
    formBgCanvas.style.pointerEvents = 'none';
    formBgCanvas.style.borderRadius = 'var(--border-radius)';
    formBgCanvas.style.zIndex = '-1';
    
    // Add canvas just behind the form content
    contactForm.style.position = 'relative';
    contactForm.style.overflow = 'hidden';
    contactForm.appendChild(formBgCanvas);
    
    // Initialize the canvas
    const ctx = formBgCanvas.getContext('2d');
    formBgCanvas.width = contactForm.offsetWidth;
    formBgCanvas.height = contactForm.offsetHeight;
    
    // Resize handler
    window.addEventListener('resize', () => {
        formBgCanvas.width = contactForm.offsetWidth;
        formBgCanvas.height = contactForm.offsetHeight;
    });
    
    // Create particles
    const particles = [];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * formBgCanvas.width,
            y: Math.random() * formBgCanvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            color: getFormParticleColor()
        });
    }
    
    function getFormParticleColor() {
        // Colors matching the site theme
        const colors = [
            'rgba(58, 134, 255, 0.2)',
            'rgba(131, 56, 236, 0.2)',
            'rgba(255, 0, 110, 0.2)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Animation loop
    function animateFormBg() {
        requestAnimationFrame(animateFormBg);
        ctx.clearRect(0, 0, formBgCanvas.width, formBgCanvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Boundary checking
            if (p.x < 0 || p.x > formBgCanvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > formBgCanvas.height) p.speedY *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
        
        // Connect particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(58, 134, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }
    
    animateFormBg();
    
    // Add input field effects
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Create a ripple effect on focus
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 3px rgba(58, 134, 255, 0.2), 0 0 20px rgba(58, 134, 255, 0.3)';
            this.style.transition = 'all 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.style.boxShadow = '';
        });
        
        // Add typing effect for text inputs
        if (input.tagName.toLowerCase() !== 'select') {
            input.addEventListener('input', function() {
                // Create a ripple particle at cursor position
                const rect = this.getBoundingClientRect();
                const formRect = contactForm.getBoundingClientRect();
                
                const x = this.selectionStart * 10 % formBgCanvas.width;
                const y = rect.top - formRect.top + rect.height / 2;
                
                // Add a temporary particle
                particles.push({
                    x: x,
                    y: y,
                    size: Math.random() * 5 + 3,
                    speedX: (Math.random() - 0.5) * 2,
                    speedY: (Math.random() - 0.5) * 2,
                    color: 'rgba(58, 134, 255, 0.5)',
                    life: 20
                });
            });
        }
    });
    
    // Add submit button effect
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.addEventListener('mouseenter', () => {
            // Add particles around the button
            const rect = submitButton.getBoundingClientRect();
            const formRect = contactForm.getBoundingClientRect();
            
            for (let i = 0; i < 10; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 20 + 30;
                
                particles.push({
                    x: rect.left - formRect.left + rect.width / 2 + Math.cos(angle) * distance,
                    y: rect.top - formRect.top + rect.height / 2 + Math.sin(angle) * distance,
                    size: Math.random() * 4 + 2,
                    speedX: Math.cos(angle) * (Math.random() + 0.5) * 0.5,
                    speedY: Math.sin(angle) * (Math.random() + 0.5) * 0.5,
                    color: 'rgba(58, 134, 255, 0.5)',
                    life: 30
                });
            }
        });
    }
}

// Add subtle 3D effects to footer
function addFooterEffects() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    // Create a canvas for 3D wave effect
    const canvas = document.createElement('canvas');
    canvas.classList.add('footer-wave-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    
    footer.style.position = 'relative';
    footer.prepend(canvas);
    
    // Set up Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / footer.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, footer.offsetHeight);
    
    // Handle resizing
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / footer.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, footer.offsetHeight);
    });
    
    // Create a wave mesh
    const waveGeometry = new THREE.PlaneGeometry(30, 10, 100, 20);
    const waveMaterial = new THREE.MeshBasicMaterial({
        color: 0x3a86ff,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    
    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    wave.rotation.x = -Math.PI / 2;
    wave.position.y = -2;
    wave.position.z = -5;
    scene.add(wave);
    
    // Add a subtle glow
    const glowGeometry = new THREE.PlaneGeometry(30, 10);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x3a86ff,
        transparent: true,
        opacity: 0.05
    });
    
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = -2.1;
    glow.position.z = -5;
    scene.add(glow);
    
    // Position camera
    camera.position.y = 5;
    camera.position.z = 5;
    camera.lookAt(0, 0, 0);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        const time = Date.now() * 0.001;
        
        // Animate wave vertices
        const position = waveGeometry.attributes.position;
        
        for (let i = 0; i < position.count; i++) {
            const y = 0.5 * Math.sin(i / 5 + time);
            position.setY(i, position.getY(i) + (y - position.getY(i)) * 0.05);
        }
        
        position.needsUpdate = true;
        
        // Pulse glow
        glow.material.opacity = 0.05 + 0.03 * Math.sin(time);
        
        renderer.render(scene, camera);
    }
    
    animate();
} 

function initDynamicBackground() {
    const body = document.querySelector('body');
    
    // Create a WebGL canvas for the background
    const canvas = document.createElement('canvas');
    canvas.classList.add('dynamic-background');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-2'; // Place behind particle background
    
    body.prepend(canvas);
    
    // Setup Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Create a grid of neural activity
    const gridGroup = new THREE.Group();
    scene.add(gridGroup);
    
    // Neural layers
    const layersCount = 5;
    const nodesPerLayer = 10;
    const layerDistance = 8;
    const layers = [];
    
    // Create neural layers with nodes
    for (let l = 0; l < layersCount; l++) {
        const layer = new THREE.Group();
        layer.position.z = -l * layerDistance - 15; // Position layers in distance
        gridGroup.add(layer);
        layers.push(layer);
        
        // Add nodes to layer
        for (let i = 0; i < nodesPerLayer; i++) {
            for (let j = 0; j < nodesPerLayer; j++) {
                const nodeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
                const nodeMaterial = new THREE.MeshBasicMaterial({
                    color: 0x3a86ff,
                    transparent: true,
                    opacity: 0.3
                });
                
                const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
                
                // Position in grid
                node.position.x = (i - nodesPerLayer / 2) * 2;
                node.position.y = (j - nodesPerLayer / 2) * 2;
                
                // Store data for animation
                node.userData = {
                    baseOpacity: 0.3,
                    pulseSpeed: Math.random() * 2 + 1,
                    active: false,
                    activationDelay: Math.random() * 5,
                    layer: l
                };
                
                layer.add(node);
            }
        }
    }
    
    // Create neural connections between layers
    const connectionsMaterial = new THREE.LineBasicMaterial({
        color: 0x3a86ff,
        transparent: true,
        opacity: 0.05
    });
    
    const connections = [];
    
    // Connect each layer to the next
    for (let l = 0; l < layersCount - 1; l++) {
        const currentLayer = layers[l];
        const nextLayer = layers[l + 1];
        
        // Connect a percentage of nodes between layers
        for (let i = 0; i < currentLayer.children.length; i++) {
            // Only connect some nodes for performance
            if (Math.random() > 0.7) continue;
            
            const sourceNode = currentLayer.children[i];
            
            // Connect to random nodes in next layer
            for (let j = 0; j < 2; j++) {
                const targetIndex = Math.floor(Math.random() * nextLayer.children.length);
                const targetNode = nextLayer.children[targetIndex];
                
                const points = [
                    sourceNode.position.clone().add(sourceNode.parent.position),
                    targetNode.position.clone().add(targetNode.parent.position)
                ];
                
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(geometry, connectionsMaterial);
                
                line.userData = {
                    sourceNode: sourceNode,
                    targetNode: targetNode,
                    active: false,
                    baseOpacity: 0.05
                };
                
                gridGroup.add(line);
                connections.push(line);
            }
        }
    }
    
    // Add data pulses that travel along connections
    const pulses = [];
    const pulseCount = 30;
    const pulseGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const pulseMaterial = new THREE.MeshBasicMaterial({
        color: 0xff006e,
        transparent: true,
        opacity: 0.7
    });
    
    for (let i = 0; i < pulseCount; i++) {
        const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
        pulse.visible = false;
        
        pulse.userData = {
            connection: null,
            progress: 0,
            speed: Math.random() * 0.02 + 0.01,
            active: false
        };
        
        gridGroup.add(pulse);
        pulses.push(pulse);
    }
    
    // Position camera
    camera.position.z = 5;
    
    // Track mouse for interactive effects
    const mouse = new THREE.Vector2();
    let mouseInDocument = false;
    
    document.addEventListener('mousemove', (event) => {
        // Convert mouse position to normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        mouseInDocument = true;
        
        // Activate nodes closest to mouse
        activateNodesNearMouse();
    });
    
    document.addEventListener('mouseout', () => {
        mouseInDocument = false;
    });
    
    // Function to activate nodes near the mouse cursor
    function activateNodesNearMouse() {
        // Convert mouse position to world coordinates
        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vector.unproject(camera);
        
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        
        // Find closest nodes to activate
        layers.forEach(layer => {
            layer.children.forEach(node => {
                const nodeWorldPos = new THREE.Vector3();
                node.getWorldPosition(nodeWorldPos);
                
                // Calculate distance in the XY plane
                const dist = Math.sqrt(
                    Math.pow(nodeWorldPos.x - pos.x, 2) + 
                    Math.pow(nodeWorldPos.y - pos.y, 2)
                );
                
                // Activate nodes near mouse
                if (dist < 3) {
                    node.userData.active = true;
                    node.material.opacity = 0.8;
                    node.scale.set(2, 2, 2);
                    
                    // Activate connections from this node
                    connections.forEach(conn => {
                        if (conn.userData.sourceNode === node || conn.userData.targetNode === node) {
                            conn.userData.active = true;
                            conn.material.opacity = 0.3;
                            
                            // Fire a pulse on this connection
                            if (Math.random() > 0.7) {
                                const availablePulse = pulses.find(p => !p.userData.active);
                                if (availablePulse) {
                                    availablePulse.userData.active = true;
                                    availablePulse.userData.connection = conn;
                                    availablePulse.userData.progress = 0;
                                    availablePulse.visible = true;
                                }
                            }
                        }
                    });
                }
            });
        });
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        const time = Date.now() * 0.001;
        
        // Slowly rotate the entire grid
        gridGroup.rotation.y = Math.sin(time * 0.1) * 0.2;
        
        // Animate neural nodes
        layers.forEach(layer => {
            layer.children.forEach(node => {
                if (node.userData.active) {
                    // Fade back to normal over time
                    node.material.opacity *= 0.95;
                    node.scale.x = Math.max(node.scale.x * 0.95, 1);
                    node.scale.y = Math.max(node.scale.y * 0.95, 1);
                    node.scale.z = Math.max(node.scale.z * 0.95, 1);
                    
                    if (node.material.opacity <= node.userData.baseOpacity + 0.05) {
                        node.userData.active = false;
                        node.material.opacity = node.userData.baseOpacity;
                        node.scale.set(1, 1, 1);
                    }
                } else {
                    // Random activation of nodes
                    if (Math.random() < 0.001) {
                        node.userData.active = true;
                        node.material.opacity = 0.8;
                        node.scale.set(1.5, 1.5, 1.5);
                    }
                    
                    // Subtle pulse effect when inactive
                    const pulse = 0.1 * Math.sin(time * node.userData.pulseSpeed + node.userData.layer * 10);
                    node.material.opacity = node.userData.baseOpacity + pulse;
                }
            });
        });
        
        // Animate connections
        connections.forEach(connection => {
            if (connection.userData.active) {
                // Fade back to normal over time
                connection.material.opacity *= 0.95;
                
                if (connection.material.opacity <= connection.userData.baseOpacity + 0.05) {
                    connection.userData.active = false;
                    connection.material.opacity = connection.userData.baseOpacity;
                }
            }
        });
        
        // Animate pulses along connections
        pulses.forEach(pulse => {
            if (pulse.userData.active) {
                const connection = pulse.userData.connection;
                
                pulse.userData.progress += pulse.userData.speed;
                
                if (pulse.userData.progress > 1) {
                    pulse.userData.active = false;
                    pulse.visible = false;
                } else {
                    // Get start and end positions from connection
                    const sourcePos = connection.userData.sourceNode.position.clone()
                        .add(connection.userData.sourceNode.parent.position);
                    const targetPos = connection.userData.targetNode.position.clone()
                        .add(connection.userData.targetNode.parent.position);
                    
                    // Interpolate position
                    pulse.position.lerpVectors(sourcePos, targetPos, pulse.userData.progress);
                }
            }
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Add holographic UI elements that appear to float above the page
function addHolographicElements() {
    // Add holographic scanner line that moves down the page
    const scannerLine = document.createElement('div');
    scannerLine.classList.add('holographic-scanner');
    scannerLine.style.cssText = `
        position: fixed;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, 
            rgba(58, 134, 255, 0), 
            rgba(58, 134, 255, 0.8), 
            rgba(58, 134, 255, 0));
        z-index: 9997;
        pointer-events: none;
        box-shadow: 0 0 10px rgba(58, 134, 255, 0.8);
    `;
    document.body.appendChild(scannerLine);
    
    // Animate the scanner line
    let scanDirection = 1;
    let scannerPosition = 0;
    
    function animateScannerLine() {
        scannerPosition += scanDirection * 1.5;
        
        // Reverse direction at top and bottom
        if (scannerPosition > window.innerHeight || scannerPosition < 0) {
            scanDirection *= -1;
        }
        
        scannerLine.style.top = `${scannerPosition}px`;
        requestAnimationFrame(animateScannerLine);
    }
    
    animateScannerLine();
    
    // Add holographic corner elements to create a futuristic frame
    const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    
    corners.forEach(position => {
        const corner = document.createElement('div');
        corner.classList.add(`holographic-corner-${position}`);
        
        // Determine position
        const isTop = position.includes('top');
        const isLeft = position.includes('left');
        
        corner.style.cssText = `
            position: fixed;
            ${isTop ? 'top' : 'bottom'}: 20px;
            ${isLeft ? 'left' : 'right'}: 20px;
            width: 50px;
            height: 50px;
            border-${isTop ? 'top' : 'bottom'}: 2px solid rgba(58, 134, 255, 0.8);
            border-${isLeft ? 'left' : 'right'}: 2px solid rgba(58, 134, 255, 0.8);
            border-${isTop ? 'bottom' : 'top'}-${isLeft ? 'right' : 'left'}-radius: 0;
            z-index: 9997;
            pointer-events: none;
            opacity: 0.7;
            box-shadow: 0 0 10px rgba(58, 134, 255, 0.5);
        `;
        
        document.body.appendChild(corner);
        
        // Animate the corners with pulsing effect
        setInterval(() => {
            corner.style.boxShadow = `0 0 ${10 + Math.random() * 10}px rgba(58, 134, 255, ${0.3 + Math.random() * 0.5})`;
        }, 1000 + Math.random() * 1000);
    });
    
    // Add floating data points that appear randomly across the screen
    setInterval(() => {
        if (Math.random() > 0.7) {
            createFloatingDataPoint();
        }
    }, 2000);
    
    function createFloatingDataPoint() {
        const dataPoint = document.createElement('div');
        const size = Math.random() * 40 + 20;
        
        // Random position on screen
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        // Random data visualization style
        const visualTypes = [
            createBinaryText,
            createCircleGraph,
            createBarGraph,
            createMatrixDisplay
        ];
        
        const createVisual = visualTypes[Math.floor(Math.random() * visualTypes.length)];
        createVisual(dataPoint, size);
        
        dataPoint.style.cssText = `
            position: fixed;
            top: ${y}px;
            left: ${x}px;
            z-index: 9996;
            pointer-events: none;
            transform: scale(0);
            opacity: 0;
            transition: transform 0.5s ease-out, opacity 0.5s ease-out;
        `;
        
        document.body.appendChild(dataPoint);
        
        // Animate in
        setTimeout(() => {
            dataPoint.style.transform = 'scale(1)';
            dataPoint.style.opacity = '0.8';
        }, 10);
        
        // Remove after a few seconds
        setTimeout(() => {
            dataPoint.style.transform = 'scale(1.5)';
            dataPoint.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(dataPoint);
            }, 500);
        }, 2000 + Math.random() * 3000);
    }
    
    function createBinaryText(element, size) {
        element.style.width = `${size * 4}px`;
        element.style.height = `${size}px`;
        element.style.color = 'rgba(58, 134, 255, 0.8)';
        element.style.fontSize = '10px';
        element.style.fontFamily = 'monospace';
        element.style.textAlign = 'center';
        
        let binaryText = '';
        for (let i = 0; i < size * 2; i++) {
            binaryText += Math.round(Math.random());
        }
        
        element.textContent = binaryText;
    }
    
    function createCircleGraph(element, size) {
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.border = '1px solid rgba(58, 134, 255, 0.8)';
        element.style.borderRadius = '50%';
        element.style.boxShadow = '0 0 10px rgba(58, 134, 255, 0.5)';
        
        // Add an inner circle with percentage
        const percent = Math.floor(Math.random() * 100);
        const innerCircle = document.createElement('div');
        innerCircle.style.cssText = `
            width: 70%;
            height: 70%;
            border-radius: 50%;
            background-color: rgba(58, 134, 255, 0.2);
            position: absolute;
            top: 15%;
            left: 15%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(58, 134, 255, 0.8);
            font-family: monospace;
            font-size: ${size / 4}px;
        `;
        innerCircle.textContent = `${percent}%`;
        element.appendChild(innerCircle);
    }
    
    function createBarGraph(element, size) {
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.display = 'flex';
        element.style.alignItems = 'flex-end';
        element.style.justifyContent = 'space-around';
        element.style.border = '1px solid rgba(58, 134, 255, 0.5)';
        
        // Create bars
        const barCount = 5;
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            const height = Math.random() * 90 + 10;
            bar.style.cssText = `
                width: ${size / barCount / 2}px;
                height: ${height}%;
                background-color: rgba(58, 134, 255, ${0.3 + Math.random() * 0.5});
                box-shadow: 0 0 5px rgba(58, 134, 255, 0.5);
            `;
            element.appendChild(bar);
        }
    }
    
    function createMatrixDisplay(element, size) {
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.display = 'grid';
        element.style.gridTemplateColumns = 'repeat(3, 1fr)';
        element.style.gridTemplateRows = 'repeat(3, 1fr)';
        element.style.gap = '2px';
        element.style.padding = '2px';
        element.style.border = '1px solid rgba(58, 134, 255, 0.5)';
        
        // Create grid cells
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            const value = (Math.random() * 9.99).toFixed(1);
            cell.style.cssText = `
                background-color: rgba(58, 134, 255, ${0.1 + Math.random() * 0.3});
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgba(58, 134, 255, 0.8);
                font-family: monospace;
                font-size: ${size / 10}px;
            `;
            cell.textContent = value;
            element.appendChild(cell);
        }
    }
}

// Create smooth transitions between sections with AI-themed effects
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    // Create overlay for transitions
    const transitionOverlay = document.createElement('div');
    transitionOverlay.classList.add('transition-overlay');
    transitionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, rgba(58, 134, 255, 0.2), transparent 70%);
        pointer-events: none;
        opacity: 0;
        z-index: 9996;
        transition: opacity 0.5s ease;
    `;
    document.body.appendChild(transitionOverlay);
    
    // Add a scanning line element for transitions
    const scanLine = document.createElement('div');
    scanLine.classList.add('scan-line');
    scanLine.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 10px;
        background: linear-gradient(to bottom, rgba(58, 134, 255, 0), rgba(58, 134, 255, 0.8), rgba(58, 134, 255, 0));
        pointer-events: none;
        opacity: 0;
        z-index: 9997;
        transform: translateY(-100%);
        box-shadow: 0 0 20px rgba(58, 134, 255, 0.5);
    `;
    document.body.appendChild(scanLine);
    
    // Track scroll position for transitions
    let currentSectionIndex = 0;
    let isTransitioning = false;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + (window.innerHeight / 2);
        
        // Find current section
        let newSectionIndex = 0;
        sections.forEach((section, index) => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                newSectionIndex = index;
            }
        });
        
        // If we've moved to a new section, trigger transition
        if (newSectionIndex !== currentSectionIndex && !isTransitioning) {
            triggerSectionTransition(newSectionIndex);
            currentSectionIndex = newSectionIndex;
        }
    });
    
    function triggerSectionTransition(newIndex) {
        isTransitioning = true;
        
        // Show overlay
        transitionOverlay.style.opacity = '1';
        
        // Animate scan line
        scanLine.style.opacity = '1';
        scanLine.style.transform = 'translateY(0)';
        
        // Animate scan line down the page
        let scanProgress = 0;
        const scanInterval = setInterval(() => {
            scanProgress += 2;
            scanLine.style.top = `${scanProgress}vh`;
            
            if (scanProgress >= 100) {
                clearInterval(scanInterval);
                
                // Hide elements after scan completes
                scanLine.style.opacity = '0';
                scanLine.style.transform = 'translateY(-100%)';
                transitionOverlay.style.opacity = '0';
                
                // Reset for next transition
                setTimeout(() => {
                    scanLine.style.top = '0';
                    isTransitioning = false;
                }, 500);
            }
        }, 10);
    }
}

// Create a visualization of AI processing data streams across the page
function initAIDataVisualization() {
    // Create a canvas for data streams
    const canvas = document.createElement('canvas');
    canvas.classList.add('ai-data-streams');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9995;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Data streams
    class DataStream {
        constructor() {
            this.reset();
        }
        
        reset() {
            // Start from random edge of screen
            const edge = Math.floor(Math.random() * 4);
            
            switch(edge) {
                case 0: // Top
                    this.x = Math.random() * canvas.width;
                    this.y = 0;
                    this.vx = (Math.random() - 0.5) * 2;
                    this.vy = Math.random() * 1 + 0.5;
                    break;
                case 1: // Right
                    this.x = canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.vx = -(Math.random() * 1 + 0.5);
                    this.vy = (Math.random() - 0.5) * 2;
                    break;
                case 2: // Bottom
                    this.x = Math.random() * canvas.width;
                    this.y = canvas.height;
                    this.vx = (Math.random() - 0.5) * 2;
                    this.vy = -(Math.random() * 1 + 0.5);
                    break;
                case 3: // Left
                    this.x = 0;
                    this.y = Math.random() * canvas.height;
                    this.vx = Math.random() * 1 + 0.5;
                    this.vy = (Math.random() - 0.5) * 2;
                    break;
            }
            
            // Random properties
            this.length = Math.random() * 100 + 50;
            this.width = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.segments = [];
            this.color = this.getRandomColor();
            this.pulseSpeed = Math.random() * 2 + 1;
        }
        
        getRandomColor() {
            const colors = [
                [58, 134, 255],   // Blue
                [131, 56, 236],   // Purple
                [255, 0, 110]     // Pink
            ];
            
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            // Update position
            this.x += this.vx;
            this.y += this.vy;
            
            // Add current position to segments
            this.segments.unshift({ x: this.x, y: this.y });
            
            // Remove old segments to maintain length
            if (this.segments.length > this.length) {
                this.segments.pop();
            }
            
            // Reset if out of bounds
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                if (this.segments.length < 5) {
                    this.reset();
                }
            }
        }
        
        draw(time) {
            if (this.segments.length < 2) return;
            
            // Pulse opacity based on time
            const pulseOpacity = this.opacity * (0.7 + 0.3 * Math.sin(time * this.pulseSpeed));
            
            // Draw the stream
            ctx.beginPath();
            ctx.moveTo(this.segments[0].x, this.segments[0].y);
            
            for (let i = 1; i < this.segments.length; i++) {
                ctx.lineTo(this.segments[i].x, this.segments[i].y);
            }
            
            // Create gradient for fade-out effect
            const gradient = ctx.createLinearGradient(
                this.segments[0].x, this.segments[0].y,
                this.segments[this.segments.length - 1].x, this.segments[this.segments.length - 1].y
            );
            
            gradient.addColorStop(0, `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${pulseOpacity})`);
            gradient.addColorStop(1, `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0)`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = this.width;
            ctx.stroke();
            
            // Draw data packets at random positions along the stream
            if (Math.random() > 0.95) {
                const packetIndex = Math.floor(Math.random() * (this.segments.length - 1));
                if (packetIndex >= 0 && packetIndex < this.segments.length) {
                    const packetPos = this.segments[packetIndex];
                    
                    ctx.beginPath();
                    ctx.arc(packetPos.x, packetPos.y, this.width * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${pulseOpacity * 2})`;
                    ctx.fill();
                }
            }
        }
    }
    
    // Create streams
    const streams = [];
    const streamCount = 15;
    
    for (let i = 0; i < streamCount; i++) {
        streams.push(new DataStream());
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const time = Date.now() * 0.001;
        
        // Update and draw streams
        streams.forEach(stream => {
            stream.update();
            stream.draw(time);
        });
        
        // Occasionally add new streams
        if (Math.random() > 0.99) {
            streams.push(new DataStream());
            
            // Remove old streams to prevent too many
            if (streams.length > streamCount + 5) {
                streams.shift();
            }
        }
    }
    
    animate();
}

// Add neural network background to About section
function initAboutSectionEffects() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    // Create canvas for neural network
    const canvas = document.createElement('canvas');
    canvas.classList.add('about-bg-canvas');
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    
    // Insert canvas at the beginning of the section
    aboutSection.style.position = 'relative';
    aboutSection.prepend(canvas);
    
    // Get section content and ensure it's above the canvas
    const aboutContainer = aboutSection.querySelector('.container');
    if (aboutContainer) {
        aboutContainer.style.position = 'relative';
        aboutContainer.style.zIndex = '1';
    }
    
    // Setup canvas
    const ctx = canvas.getContext('2d');
    canvas.width = aboutSection.offsetWidth;
    canvas.height = aboutSection.offsetHeight;
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = aboutSection.offsetWidth;
        canvas.height = aboutSection.offsetHeight;
    });
    
    // Neural network nodes
    const nodes = [];
    const nodeCount = 50;
    
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 2,
            color: getNodeColor(),
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            connections: []
        });
    }
    
    function getNodeColor() {
        const colors = [
            'rgba(58, 134, 255, 0.7)',
            'rgba(131, 56, 236, 0.7)',
            'rgba(255, 0, 110, 0.7)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Create connections between nodes
    nodes.forEach((node, i) => {
        for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < canvas.width / 5) {
                node.connections.push(j);
            }
        }
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update node positions
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Boundary checks
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        });
        
        // Draw connections
        ctx.lineWidth = 0.5;
        nodes.forEach((node, i) => {
            node.connections.forEach(j => {
                const other = nodes[j];
                const dx = node.x - other.x;
                const dy = node.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < canvas.width / 5) {
                    const opacity = 1 - distance / (canvas.width / 5);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(58, 134, 255, ${opacity * 0.2})`;
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            });
        });
        
        // Draw nodes
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.fillStyle = node.color;
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    animate();
}
// Create 3D floating logo in the navbar
function create3DLogo() {
    const logoContainer = document.querySelector('.logo');
    if (!logoContainer) return;
    
    // Clear existing content
    const logoText = logoContainer.textContent;
    logoContainer.innerHTML = '';
    
    // Create canvas for 3D logo
    const canvas = document.createElement('canvas');
    canvas.width = 150;
    canvas.height = 60;
    logoContainer.appendChild(canvas);
    
    // Setup Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(canvas.width, canvas.height);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x3a86ff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Create 3D text for "Sponsium"
    const fontLoader = new THREE.FontLoader();
    
    // Create a temporary text element while 3D loads
    const tempLogo = document.createElement('div');
    tempLogo.style.cssText = `
        font-family: 'Poppins', sans-serif;
        font-size: 1.8rem;
        font-weight: 700;
        color: var(--dark-color);
        display: flex;
    `;
    tempLogo.innerHTML = `<span>Sponsium</span><span style="color: #3a86ff;">.</span>`;
    logoContainer.appendChild(tempLogo);
    
    // Create a group for all logo elements
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);
    
    // Create a glowing sphere for the dot
    const dotGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const dotMaterial = new THREE.MeshPhongMaterial({
        color: 0x3a86ff,
        emissive: 0x3a86ff,
        emissiveIntensity: 0.7,
        shininess: 100
    });
    
    const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    dot.position.set(4.5, -0.5, 0);
    logoGroup.add(dot);
    
    // Add orbital particles around the dot
    const particlesCount = 20;
    const particles = [];
    
    for (let i = 0; i < particlesCount; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const particleMaterial = new THREE.MeshPhongMaterial({
            color: 0x3a86ff,
            emissive: 0x3a86ff,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.7
        });
        
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Set initial position in orbit around dot
        const angle = (i / particlesCount) * Math.PI * 2;
        const radius = 0.7;
        
        particle.position.x = dot.position.x + Math.cos(angle) * radius;
        particle.position.y = dot.position.y + Math.sin(angle) * radius;
        particle.position.z = dot.position.z;
        
        // Store orbit data
        particle.userData = {
            orbitRadius: radius,
            orbitSpeed: 0.01 + Math.random() * 0.02,
            orbitAngle: angle,
            pulseSpeed: Math.random() * 2 + 1
        };
        
        logoGroup.add(particle);
        particles.push(particle);
    }
    
    // Create extruded 3D text for "Sponsium"
    const createLogoText = () => {
        // Use a fallback approach with individual letters for better compatibility
        const letters = "Sponsium";
        const letterMeshes = [];
        const letterSpacing = 0.8;
        
        for (let i = 0; i < letters.length; i++) {
            // Create geometry for each letter
            let geometry;
            
            // Use different geometries based on letter shape
            switch(letters[i].toLowerCase()) {
                case 's':
                    geometry = new THREE.TorusGeometry(0.3, 0.1, 8, 12, Math.PI);
                    break;
                case 'o':
                    geometry = new THREE.TorusGeometry(0.3, 0.1, 8, 16);
                    break;
                case 'p':
                    // Combine a box and a torus for 'p'
                    geometry = new THREE.BoxGeometry(0.1, 0.6, 0.1);
                    const pMesh = new THREE.Mesh(
                        geometry,
                        new THREE.MeshPhongMaterial({
                            color: 0x1a1a2e,
                            shininess: 80
                        })
                    );
                    pMesh.position.y = -0.15;
                    
                    const pCircle = new THREE.Mesh(
                        new THREE.TorusGeometry(0.25, 0.1, 8, 12, Math.PI),
                        new THREE.MeshPhongMaterial({
                            color: 0x1a1a2e,
                            shininess: 80
                        })
                    );
                    pCircle.rotation.z = Math.PI / 2;
                    pCircle.position.x = 0.25;
                    
                    const pGroup = new THREE.Group();
                    pGroup.add(pMesh);
                    pGroup.add(pCircle);
                    
                    letterMeshes.push(pGroup);
                    continue;
                case 'n':
                    // Create a custom 'n' shape
                    const nGroup = new THREE.Group();
                    
                    const nLeft = new THREE.Mesh(
                        new THREE.BoxGeometry(0.1, 0.6, 0.1),
                        new THREE.MeshPhongMaterial({
                            color: 0x1a1a2e,
                            shininess: 80
                        })
                    );
                    
                    const nRight = new THREE.Mesh(
                        new THREE.BoxGeometry(0.1, 0.6, 0.1),
                        new THREE.MeshPhongMaterial({
                            color: 0x1a1a2e,
                            shininess: 80
                        })
                    );
                    nRight.position.x = 0.4;
                    
                    const nMiddle = new THREE.Mesh(
                        new THREE.BoxGeometry(0.5, 0.1, 0.1),
                        new THREE.MeshPhongMaterial({
                            color: 0x1a1a2e,
                            shininess: 80
                        })
                    );
                    nMiddle.position.x = 0.2;
                    nMiddle.position.y = 0.2;
                    
                    nGroup.add(nLeft);
                    nGroup.add(nRight);
                    nGroup.add(nMiddle);
                    
                    letterMeshes.push(nGroup);
                    continue;
                default:
                    // Default to a box for other letters
                    geometry = new THREE.BoxGeometry(0.2, 0.6, 0.1);
            }
            
            const material = new THREE.MeshPhongMaterial({
                color: 0x1a1a2e,
                shininess: 80
            });
            
            const letterMesh = new THREE.Mesh(geometry, material);
            letterMeshes.push(letterMesh);
        }
        
        // Position letters horizontally
        let xOffset = -3.5;
        letterMeshes.forEach(letterMesh => {
            letterMesh.position.x = xOffset;
            xOffset += letterSpacing;
            logoGroup.add(letterMesh);
        });
    };
    
    createLogoText();
    
    // Add a glowing underline
    const underlineGeometry = new THREE.BoxGeometry(8, 0.1, 0.1);
    const underlineMaterial = new THREE.MeshPhongMaterial({
        color: 0x3a86ff,
        emissive: 0x3a86ff,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.7
    });
    
    const underline = new THREE.Mesh(underlineGeometry, underlineMaterial);
    underline.position.y = -0.8;
    logoGroup.add(underline);
    
    // Position camera
    camera.position.z = 10;
    
    // Make logo interactive with mouse hover
    let isHovered = false;
    
    logoContainer.addEventListener('mouseenter', () => {
        isHovered = true;
        tempLogo.style.opacity = '0';
    });
    
    logoContainer.addEventListener('mouseleave', () => {
        isHovered = false;
        tempLogo.style.opacity = '1';
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        const time = Date.now() * 0.001;
        
        // Rotate logo slightly based on mouse position
        if (isHovered) {
            logoGroup.rotation.y = Math.sin(time * 0.5) * 0.2;
            logoGroup.rotation.x = Math.cos(time * 0.5) * 0.1;
            
            // Scale up slightly when hovered
            logoGroup.scale.set(1.05, 1.05, 1.05);
        } else {
            // Return to original position when not hovered
            logoGroup.rotation.y *= 0.95;
            logoGroup.rotation.x *= 0.95;
            logoGroup.scale.x = Math.max(logoGroup.scale.x * 0.95, 1);
            logoGroup.scale.y = Math.max(logoGroup.scale.y * 0.95, 1);
            logoGroup.scale.z = Math.max(logoGroup.scale.z * 0.95, 1);
        }
        
        // Animate dot
        dot.scale.x = 1 + 0.1 * Math.sin(time * 2);
        dot.scale.y = 1 + 0.1 * Math.sin(time * 2);
        dot.scale.z = 1 + 0.1 * Math.sin(time * 2);
        
        // Animate particles orbiting the dot
        particles.forEach(particle => {
            // Update orbit position
            particle.userData.orbitAngle += particle.userData.orbitSpeed;
            const radius = particle.userData.orbitRadius;
            
            particle.position.x = dot.position.x + Math.cos(particle.userData.orbitAngle) * radius;
            particle.position.y = dot.position.y + Math.sin(particle.userData.orbitAngle) * radius;
            
            // Pulse opacity
            particle.material.opacity = 0.5 + 0.3 * Math.sin(time * particle.userData.pulseSpeed);
        });
        
        // Animate underline
        underline.material.opacity = 0.5 + 0.3 * Math.sin(time * 1.5);
        underline.position.y = -0.8 + 0.05 * Math.sin(time * 2);
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Add a futuristic scanning effect
    const scanEffect = document.createElement('div');
    scanEffect.classList.add('logo-scan-effect');
    scanEffect.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 5px;
        height: 100%;
        background: linear-gradient(to right, 
            rgba(58, 134, 255, 0), 
            rgba(58, 134, 255, 0.8), 
            rgba(58, 134, 255, 0));
        pointer-events: none;
        opacity: 0.7;
        z-index: 1;
    `;
    logoContainer.appendChild(scanEffect);
    
    // Animate the scan effect
    let scanPosition = 0;
    const scanSpeed = 1;
    
    function animateScanEffect() {
        scanPosition += scanSpeed;
        
        if (scanPosition > canvas.width) {
            scanPosition = -5;
        }
        
        scanEffect.style.left = `${scanPosition}px`;
        requestAnimationFrame(animateScanEffect);
    }
    
    animateScanEffect();
    
    // Add holographic glitch effect occasionally
    setInterval(() => {
        if (Math.random() > 0.7) {
            // Create glitch effect
            const glitchEffect = document.createElement('div');
            glitchEffect.classList.add('logo-glitch-effect');
            
            const glitchHeight = 2 + Math.random() * 5;
            const glitchTop = Math.random() * canvas.height;
            
            glitchEffect.style.cssText = `
                position: absolute;
                top: ${glitchTop}px;
                left: 0;
                width: 100%;
                height: ${glitchHeight}px;
                background-color: rgba(58, 134, 255, 0.8);
                pointer-events: none;
                z-index: 2;
                transform: translateX(${Math.random() * 10 - 5}px);
            `;
            
            logoContainer.appendChild(glitchEffect);
            
            // Remove after short duration
            setTimeout(() => {
                logoContainer.removeChild(glitchEffect);
            }, 50 + Math.random() * 150);
        }
    }, 2000);
    
    // Add data stream particles occasionally
    setInterval(() => {
        if (Math.random() > 0.8) {
            const dataParticle = document.createElement('div');
            dataParticle.classList.add('logo-data-particle');
            
            const size = 1 + Math.random() * 2;
            const startX = Math.random() * canvas.width;
            const startY = Math.random() * canvas.height;
            const duration = 500 + Math.random() * 1000;
            
            dataParticle.style.cssText = `
                position: absolute;
                top: ${startY}px;
                left: ${startX}px;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(58, 134, 255, 0.8);
                border-radius: 50%;
                pointer-events: none;
                z-index: 2;
                opacity: 0;
                transform: translateY(0);
                animation: dataParticleAnim ${duration}ms ease-out forwards;
            `;
            
            // Add keyframe animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes dataParticleAnim {
                    0% { opacity: 0; transform: translateY(0); }
                    10% { opacity: 1; }
                    100% { opacity: 0; transform: translateY(${Math.random() > 0.5 ? '-' : ''}${20 + Math.random() * 30}px); }
                }
            `;
            
            document.head.appendChild(style);
            logoContainer.appendChild(dataParticle);
            
            // Remove after animation completes
            setTimeout(() => {
                if (logoContainer.contains(dataParticle)) {
                    logoContainer.removeChild(dataParticle);
                }
                document.head.removeChild(style);
            }, duration + 100);
        }
    }, 300);
}

// Add this function to create an immersive 3D neural environment background
function createNeuralEnvironment() {
    // Create a canvas that spans the entire viewport
    const canvas = document.createElement('canvas');
    canvas.id = 'neural-environment';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -10;
        pointer-events: none;
    `;
    document.body.prepend(canvas);
    
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Create neural network objects
    const nodesCount = 200;
    const nodes = [];
    const nodeGroups = [];
    const connectionLines = [];
    
    // Create three distinct node groups representing different neural layers
    for (let g = 0; g < 3; g++) {
        const group = new THREE.Group();
        group.position.z = -25 - (g * 15);
        scene.add(group);
        nodeGroups.push(group);
        
        // Add nodes to each group
        const layerNodes = [];
        const count = nodesCount - (g * 30); // Fewer nodes in deeper layers
        
        for (let i = 0; i < count; i++) {
            // Create spherical node
            const geometry = new THREE.SphereGeometry(0.15, 8, 8);
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.6, 0.8, 0.5),
                transparent: true,
                opacity: 0.5
            });
            
            const node = new THREE.Mesh(geometry, material);
            
            // Position in a bounded volume
            node.position.x = (Math.random() - 0.5) * 40;
            node.position.y = (Math.random() - 0.5) * 40;
            node.position.z = (Math.random() - 0.5) * 10;
            
            // Store animation properties
            node.userData = {
                originalPosition: node.position.clone(),
                pulseSpeed: Math.random() * 2 + 1,
                moveSpeed: Math.random() * 0.01 + 0.005,
                connections: []
            };
            
            group.add(node);
            layerNodes.push(node);
        }
        
        nodes.push(layerNodes);
    }
    
    // Create connections between nodes in adjacent layers
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x3a86ff,
        transparent: true,
        opacity: 0.2
    });
    
    // Connect nodes between layers
    for (let l = 0; l < nodes.length - 1; l++) {
        const currentLayer = nodes[l];
        const nextLayer = nodes[l + 1];
        
        // Each node connects to several nodes in the next layer
        currentLayer.forEach(sourceNode => {
            // Connect to a random subset of nodes in the next layer
            const connectionCount = Math.floor(Math.random() * 3) + 1;
            
            for (let c = 0; c < connectionCount; c++) {
                const targetIndex = Math.floor(Math.random() * nextLayer.length);
                const targetNode = nextLayer[targetIndex];
                
                // Create connection geometry
                const points = [
                    sourceNode.position.clone(),
                    targetNode.position.clone()
                ];
                
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(geometry, lineMaterial);
                
                // Store reference to connected nodes
                line.userData = {
                    source: sourceNode,
                    target: targetNode,
                    originalOpacity: 0.1 + Math.random() * 0.1,
                    pulseSpeed: Math.random() * 2 + 1
                };
                
                // Add connection to the source node's layer group
                nodeGroups[l].add(line);
                connectionLines.push(line);
                
                // Store connection in node data
                sourceNode.userData.connections.push({
                    line: line,
                    target: targetNode
                });
            }
        });
    }
    
    // Create data pulse particles that travel along connections
    const pulses = [];
    const pulseCount = 30;
    const pulseGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const pulseMaterial = new THREE.MeshBasicMaterial({
        color: 0xff006e,
        transparent: true,
        opacity: 0.8
    });
    
    for (let i = 0; i < pulseCount; i++) {
        const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
        pulse.visible = false;
        
        pulse.userData = {
            isActive: false,
            progress: 0,
            speed: Math.random() * 0.02 + 0.01,
            connection: null
        };
        
        scene.add(pulse);
        pulses.push(pulse);
    }
    
    // Mouse movement tracking for interactivity
    const mouse = new THREE.Vector2();
    let mouseInScene = false;
    
    document.addEventListener('mousemove', (event) => {
        // Convert mouse position to normalized device coordinates (-1 to +1)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        mouseInScene = true;
        
        // Activate nodes near mouse position
        activateNodesNearMouse();
    });
    
    document.addEventListener('mouseout', () => {
        mouseInScene = false;
    });
    
    // Function to activate nodes near the mouse cursor
    function activateNodesNearMouse() {
        if (!mouseInScene) return;
        
        // Project mouse position into scene
        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vector.unproject(camera);
        
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        
        // Check all nodes for activation
        nodeGroups.forEach((group, layerIndex) => {
            // Transform mouse world position to account for group position
            const localMousePos = pos.clone();
            localMousePos.z += group.position.z;
            
            nodes[layerIndex].forEach(node => {
                const nodeWorldPos = node.position.clone();
                
                // Calculate distance to mouse in XY plane (ignore Z)
                const dist = Math.sqrt(
                    Math.pow(nodeWorldPos.x - localMousePos.x, 2) + 
                    Math.pow(nodeWorldPos.y - localMousePos.y, 2)
                );
                
                // Activate nodes within distance threshold
                if (dist < 10) {
                    // Scale inverse with distance (closer = stronger effect)
                    const intensity = 1 - (dist / 10);
                    
                    // Increase size and glow
                    node.scale.set(1 + intensity, 1 + intensity, 1 + intensity);
                    node.material.opacity = Math.min(0.9, 0.5 + intensity * 0.5);
                    node.material.color.setHSL(0.6, 0.8, 0.5 + intensity * 0.5);
                    
                    // Activate connections from this node
                    node.userData.connections.forEach(conn => {
                        const line = conn.line;
                        
                        // Brighten line
                        line.material.opacity = Math.min(0.8, line.userData.originalOpacity + intensity * 0.7);
                        
                        // Trigger a data pulse with some probability
                        if (Math.random() < 0.1) {
                            // Find an available pulse
                            const availablePulse = pulses.find(p => !p.userData.isActive);
                            if (availablePulse) {
                                initiatePulse(availablePulse, line);
                            }
                        }
                    });
                } else {
                    // Return to normal state gradually
                    node.scale.x = Math.max(1, node.scale.x * 0.95);
                    node.scale.y = Math.max(1, node.scale.y * 0.95);
                    node.scale.z = Math.max(1, node.scale.z * 0.95);
                    node.material.opacity = Math.max(0.5, node.material.opacity * 0.98);
                    
                    // Reset color gradually
                    const currentL = node.material.color.getHSL({}).l;
                    if (currentL > 0.5) {
                        node.material.color.setHSL(0.6, 0.8, Math.max(0.5, currentL * 0.98));
                    }
                }
            });
        });
    }
    
    // Function to initiate a data pulse on a connection
    function initiatePulse(pulse, connection) {
        pulse.userData.isActive = true;
        pulse.userData.connection = connection;
        pulse.userData.progress = 0;
        pulse.visible = true;
    }
    
    // Position camera
    camera.position.z = 30;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        const time = Date.now() * 0.001;
        
        // Subtle movement of the entire neural network
        nodeGroups.forEach((group, index) => {
            group.rotation.y = Math.sin(time * 0.1) * 0.05;
            group.rotation.x = Math.cos(time * 0.1) * 0.03;
        });
        
        // Animate nodes
        nodeGroups.forEach((group, layerIndex) => {
            nodes[layerIndex].forEach(node => {
                // Subtle floating motion
                const originalPos = node.userData.originalPosition;
                node.position.y = originalPos.y + Math.sin(time * node.userData.pulseSpeed) * 0.2;
                
                // Subtle pulsing opacity for background animation
                if (node.scale.x <= 1.05) {  // Only apply to nodes not activated by mouse
                    node.material.opacity = 0.3 + 0.2 * Math.sin(time * node.userData.pulseSpeed);
                }
            });
        });
        
        // Animate connection lines
        connectionLines.forEach(line => {
            // Update line vertices to match connected nodes
            const positions = line.geometry.attributes.position.array;
            
            const sourcePos = line.userData.source.position;
            positions[0] = sourcePos.x;
            positions[1] = sourcePos.y;
            positions[2] = sourcePos.z;
            
            const targetPos = line.userData.target.position;
            positions[3] = targetPos.x;
            positions[4] = targetPos.y;
            positions[5] = targetPos.z;
            
            line.geometry.attributes.position.needsUpdate = true;
            
            // Subtle pulsing for non-activated lines
            if (line.material.opacity <= line.userData.originalOpacity + 0.05) {
                line.material.opacity = line.userData.originalOpacity + 0.05 * Math.sin(time * line.userData.pulseSpeed);
            } else {
                // Fade back to normal after activation
                line.material.opacity = Math.max(
                    line.userData.originalOpacity,
                    line.material.opacity * 0.98
                );
            }
        });
        
        // Animate data pulses
        pulses.forEach(pulse => {
            if (!pulse.userData.isActive) return;
            
            const connection = pulse.userData.connection;
            pulse.userData.progress += pulse.userData.speed;
            
            if (pulse.userData.progress >= 1) {
                // Deactivate pulse when it reaches the end
                pulse.userData.isActive = false;
                pulse.visible = false;
            } else {
                // Update position along the connection line
                const sourcePos = connection.userData.source.position.clone();
                sourcePos.add(connection.userData.source.parent.position);
                
                const targetPos = connection.userData.target.position.clone();
                targetPos.add(connection.userData.target.parent.position);
                
                // Interpolate position
                pulse.position.lerpVectors(sourcePos, targetPos, pulse.userData.progress);
            }
        });
        
        // Random activation of nodes and connections for background activity
        if (Math.random() < 0.05) {
            // Select a random layer and node
            const layerIndex = Math.floor(Math.random() * nodes.length);
            const nodeIndex = Math.floor(Math.random() * nodes[layerIndex].length);
            const node = nodes[layerIndex][nodeIndex];
            
            // Activate node
            node.scale.set(1.5, 1.5, 1.5);
            node.material.opacity = 0.9;
            node.material.color.setHSL(0.6, 0.8, 0.8);
            
            // Activate connections
            node.userData.connections.forEach(conn => {
                conn.line.material.opacity = 0.8;
                
                // Trigger data pulse
                if (Math.random() < 0.5) {
                    const availablePulse = pulses.find(p => !p.userData.isActive);
                    if (availablePulse) {
                        initiatePulse(availablePulse, conn.line);
                    }
                }
            });
        }
        
        renderer.render(scene, camera);
    }
    
    animate();
}