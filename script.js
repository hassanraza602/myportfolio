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
    
    // Theme Toggle with Local Storage
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
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
            // Reset width first for animation
            bar.style.width = '0%';
            // Animate to target width
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        });
    }
    
    // Initialize GSAP
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
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
        
        // Animate skill bars when they come into view
        const aboutSection = document.querySelector('.about');
        
        ScrollTrigger.create({
            trigger: aboutSection,
            start: 'top 70%',
            onEnter: animateSkillBars,
            once: true
        });
    }
    
    // Testimonial Carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    let autoSlideInterval;
    
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
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(function() {
            showSlide(currentSlide + 1);
        }, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Initialize carousel
    if (testimonialSlides.length > 0) {
        prevBtn.addEventListener('click', function() {
            stopAutoSlide();
            showSlide(currentSlide - 1);
            startAutoSlide();
        });
        
        nextBtn.addEventListener('click', function() {
            stopAutoSlide();
            showSlide(currentSlide + 1);
            startAutoSlide();
        });
        
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });
        
        // Start auto rotation
        startAutoSlide();
        
        // Pause on hover
        const carousel = document.querySelector('.testimonial-carousel');
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Contact Form Submission with Formspree
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(this);
                
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success message
                    showAlert('✅ Message sent successfully! I will get back to you soon.', 'success');
                    contactForm.reset();
                    resetFormLabels();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error message
                showAlert('❌ Failed to send message. Please try again or email me directly at hussanraza602@gmail.com', 'error');
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Show alert function
    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create new alert
        const alert = document.createElement('div');
        alert.className = `form-alert alert-${type}`;
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#alert-styles')) {
            const styles = document.createElement('style');
            styles.id = 'alert-styles';
            styles.textContent = `
                .form-alert {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    z-index: 10000;
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    animation: slideInRight 0.3s ease;
                    max-width: 400px;
                }
                .alert-success {
                    background: #D1FAE5;
                    color: #065F46;
                    border: 1px solid #A7F3D0;
                }
                .alert-error {
                    background: #FEE2E2;
                    color: #991B1B;
                    border: 1px solid #FECACA;
                }
                .alert-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @media (max-width: 768px) {
                    .form-alert {
                        top: 80px;
                        right: 10px;
                        left: 10px;
                        max-width: none;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(alert);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.remove();
                    }
                }, 300);
            }
        }, 5000);
        
        // Add slideOut animation
        if (!document.querySelector('#alert-out-styles')) {
            const outStyles = document.createElement('style');
            outStyles.id = 'alert-out-styles';
            outStyles.textContent = `
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(outStyles);
        }
    }
    
    // Reset form labels after form reset
    function resetFormLabels() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            const label = group.querySelector('label');
            
            if (input && label) {
                label.style.top = '15px';
                label.style.fontSize = '1rem';
                label.style.color = 'var(--text-light)';
            }
        });
    }
    
    // Custom cursor (optional enhancement)
    if (window.innerWidth > 768) {
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
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active class to navigation links based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
});