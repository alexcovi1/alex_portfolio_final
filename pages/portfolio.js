document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Form submitted successfully!');
    });

    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });

    // Three.js setup
    const container = document.getElementById('threejs-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    const loader = new THREE.GLTFLoader();
    loader.load('path/to/your/animal-model.gltf', function(gltf) {
        const model = gltf.scene;
        scene.add(model);

        function animate() {
            requestAnimationFrame(animate);
            model.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        animate();
    });

    camera.position.z = 5;

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    gsap.registerPlugin(ScrollTrigger);

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

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