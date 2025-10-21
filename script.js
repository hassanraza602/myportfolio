// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
    
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
    
    // Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animate Skill Bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
    
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero Section Animation
    gsap.from('.hero-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-buttons', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-stats', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.9,
        ease: 'power3.out'
    });
    
    gsap.from('.shape', {
        duration: 1.5,
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        delay: 0.5,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('.profile-image', {
        duration: 1.5,
        scale: 0,
        opacity: 0,
        delay: 1,
        ease: 'back.out(1.7)'
    });
    
    // Navbar Scroll Effect
    gsap.to('.navbar', {
        backgroundColor: 'var(--bg-color)',
        padding: '15px 0',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        scrollTrigger: {
            trigger: '.hero',
            start: 'bottom top',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse'
        }
    });
    
    // Testimonial Carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    
    function showSlide(n) {
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
        
        testimonialSlides[currentSlide].classList.add('active');
        testimonialDots[currentSlide].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        showSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        showSlide(currentSlide + 1);
    });
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto rotate testimonials
    setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (name && email && message) {
            // In a real application, you would send this data to a server
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
    
    // Animate skill bars when they come into view
    const aboutSection = document.querySelector('.about');
    
    ScrollTrigger.create({
        trigger: aboutSection,
        start: 'top 70%',
        onEnter: animateSkillBars,
        once: true
    });
    
    // Custom cursor (optional enhancement)
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            gsap.to(cursor, {
                scale: 1.5,
                duration: 0.3
            });
        });
        
        element.addEventListener('mouseleave', function() {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3
            });
        });
    });
    
    // Add custom cursor styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s;
            mix-blend-mode: difference;
        }
        
        @media (max-width: 768px) {
            .custom-cursor {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
});
