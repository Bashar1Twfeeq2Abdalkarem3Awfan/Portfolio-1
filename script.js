// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// ===================================
// Mobile Navigation Toggle
// ===================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('.section, .hero-section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// Navbar Background on Scroll
// ===================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// Fade-in Animation on Scroll
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in-up class
document.querySelectorAll('.fade-in-up').forEach(element => {
    observer.observe(element);
});

// ===================================
// Animated Counter for Statistics
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('ar-EG');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('ar-EG');
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// ===================================
// Scroll to Top Button
// ===================================
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('شكراً لتواصلك! سأرد عليك في أقرب وقت ممكن.');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would integrate with a service like:
        // - FormSpree: https://formspree.io/
        // - EmailJS: https://www.emailjs.com/
        // - Your own backend API
    });
}

// ===================================
// Typing Effect for Hero Title (Optional Enhancement)
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const nameElement = document.querySelector('.name');
// if (nameElement) {
//     const originalText = nameElement.textContent;
//     typeWriter(nameElement, originalText, 100);
// }

// ===================================
// Parallax Effect for Hero Background (Optional)
// ===================================
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const scrolled = window.scrollY;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Dynamic Year in Footer
// ===================================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-text p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2026', currentYear);
}

// ===================================
// Preloader (Optional - uncomment to use)
// ===================================
/*
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
*/

// ===================================
// Cursor Trail Effect (Optional Enhancement)
// ===================================
/*
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.cursor-circle');

circles.forEach((circle) => {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    
    circles.forEach((circle, index) => {
        circle.style.left = x - 12 + 'px';
        circle.style.top = y - 12 + 'px';
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
        
        circle.x = x;
        circle.y = y;
        
        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });
    
    requestAnimationFrame(animateCircles);
}

animateCircles();
*/

// ===================================
// Console Message (Easter Egg)
// ===================================
console.log('%c👋 مرحباً بك في Portfolio!', 'color: #4A90E2; font-size: 20px; font-weight: bold;');
console.log('%cهل تبحث عن مطور محترف؟ لنتحدث!', 'color: #5FC3E4; font-size: 14px;');
console.log('%c📧 your.email@example.com', 'color: #00d4ff; font-size: 12px;');

// ===================================
// Performance Monitoring (Development Only)
// ===================================
if (window.performance) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}

// ===================================
// Accessibility: Skip to Content
// ===================================
document.addEventListener('keydown', (e) => {
    // Press 'S' to skip to main content
    if (e.key === 's' || e.key === 'S') {
        const mainContent = document.querySelector('#about');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ===================================
// Project Filter (Optional - for future enhancement)
// ===================================
/*
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 10);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}
*/

// ===================================
// Initialize Everything on DOM Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Portfolio initialized successfully!');
    
    // Add any initialization code here
    updateActiveNavLink();
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(element => {
            element.style.opacity = '1';
        });
    }, 100);
});
