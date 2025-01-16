document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // DOM elements
    const preloader = document.getElementById('preloader');
    const dayVideo = document.getElementById('day-video');
    const nightVideo = document.getElementById('night-video');
    const themeToggle = document.getElementById('theme-toggle');
    const contactForm = document.getElementById('contact-form');
    const socialMediaIcons = document.getElementById('social-media-icons');

    // Preloader
    window.addEventListener('load', () => {
        preloader.style.display = 'none';
        playVideos();
    });

    function playVideos() {
        dayVideo.play().catch(error => console.error("Error playing day video:", error));
        nightVideo.play().catch(error => console.error("Error playing night video:", error));
    }

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.dataset.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark') {
            gsap.to(dayVideo, { opacity: 0, duration: 1 });
            gsap.to(nightVideo, { opacity: 1, duration: 1 });
        } else {
            gsap.to(dayVideo, { opacity: 1, duration: 1 });
            gsap.to(nightVideo, { opacity: 0, duration: 1 });
        }
    });

    document.getElementById('theme-toggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        socialMediaIcons.classList.toggle('hidden');
    });

    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.dataset.theme = savedTheme;
        if (savedTheme === 'dark') {
            dayVideo.style.opacity = '0';
            nightVideo.style.opacity = '1';
        }
    }

    // Scroll-trigger animations
    document.querySelectorAll('section').forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            onEnter: () => section.classList.add('visible')
        });
    });

    // Staggered animation for project cards
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-container',
            start: "top 80%"
        },
        y: 50,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out"
    });

    // Three.js 3D model integration
    document.querySelectorAll('.project-card').forEach((card, index) => {
        const modelFile = card.dataset.model;
        const modelContainer = document.getElementById(`model${index + 1}`);
        if (modelContainer) {
            init3DModel(modelFile, modelContainer);
        }
    });

    function init3DModel(modelFile, container) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = false;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        const loader = new THREE.GLTFLoader();
        loader.load(
            modelFile,
            (gltf) => {
                scene.add(gltf.scene);
                
                // Center the model
                const box = new THREE.Box3().setFromObject(gltf.scene);
                const center = box.getCenter(new THREE.Vector3());
                gltf.scene.position.sub(center);

                // Add interactive hotspots
                const hotspot = document.createElement('div');
                hotspot.className = 'hotspot';
                hotspot.style.left = '50%';
                hotspot.style.top = '50%';
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.innerText = 'More Info';
                hotspot.appendChild(tooltip);
                container.appendChild(hotspot);

                // Position camera
                const distance = box.getSize(new THREE.Vector3()).length();
                camera.position.set(0, 0, distance * 1.5);
                camera.lookAt(0, 0, 0);

                // Update controls
                controls.update();
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('An error happened', error);
            }
        );

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted successfully!');
    });

    // GSAP animations
    gsap.from("header h1", {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power1.out"
    });

    gsap.from("header nav a", {
        duration: 1,
        y: -50,
        opacity: 0,
        stagger: 0.2,
        ease: "power1.out"
    });

    gsap.from("#projects .project-card", {
        scrollTrigger: {
            trigger: "#projects",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power1.out"
    });

    gsap.from("#skills .skill", {
        scrollTrigger: {
            trigger: "#skills",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power1.out"
    });

    gsap.from("#education .education-card", {
        scrollTrigger: {
            trigger: "#education",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power1.out"
    });

    gsap.from("#contact-form", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power1.out"
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const socialButton = document.getElementById('socialButton');
    const socialIcons = document.querySelector('.social-icons');
    const icons = document.querySelectorAll('.social-icon');

    function positionIcons() {
        const radius = 100; // Radius of the arc
        const totalIcons = icons.length;
        const angleStep = 30 * Math.PI / 180; // 30 degrees in radians
        const startAngle = -Math.PI / 1.5 - (angleStep * (totalIcons - 1)) / 2; // Center the arc

        icons.forEach((icon, index) => {
            const angle = startAngle + angleStep * index;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            icon.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    function toggleIcons() {
        socialIcons.classList.toggle('show');
        if (socialIcons.classList.contains('show')) {
            icons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.style.opacity = '1';
                    icon.style.visibility = 'visible';
                }, index * 100);
            });
        } else {
            icons.forEach((icon) => {
                icon.style.opacity = '0';
                icon.style.visibility = 'hidden';
            });
        }
    }

    positionIcons();

    socialButton.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleIcons();
    });

    // Close the social icons when clicking outside
    document.addEventListener('click', function(event) {
        if (!socialButton.contains(event.target) && !socialIcons.contains(event.target)) {
            socialIcons.classList.remove('show');
            icons.forEach((icon) => {
                icon.style.opacity = '0';
                icon.style.visibility = 'hidden';
            });
        }
    });

    // Prevent closing when clicking on the icons
    socialIcons.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Optional: Add hover effect
    icons.forEach((icon) => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.1)';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.1)', '');
        });
    });
});