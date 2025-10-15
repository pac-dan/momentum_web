// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
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

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.service) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Submit form
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert('Thank you for your message! We\'ll get back to you within 24 hours.');
                this.reset();
            } else {
                alert(result.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Failed to send message. Please try emailing us directly at kevin@webmomentumdigital.com');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .problem-item, .step');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter Animation for Stats - preserves HTML entities and special characters
function animateCounter(element, target, duration = 2000, template = null) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        const currentValue = Math.floor(start);
        
        // If we have a template, use it to preserve formatting
        if (template) {
            element.innerHTML = template.replace('NUMBER', currentValue);
        } else {
            element.textContent = currentValue;
        }
        
        if (start >= target) {
            if (template) {
                element.innerHTML = template.replace('NUMBER', target);
            } else {
                element.textContent = target;
            }
            clearInterval(timer);
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const originalHTML = stat.innerHTML;
                const text = stat.textContent;
                
                // Extract all numbers from the text
                const numbers = text.match(/\d+/g);
                
                if (numbers && numbers.length > 0) {
                    // If it's a pure number with no special chars
                    if (text.match(/^\d+$/)) {
                        const target = parseInt(numbers[0]);
                        stat.textContent = '0';
                        animateCounter(stat, target);
                    } 
                    // If it has special characters, animate first number and preserve format
                    else if (numbers.length === 1) {
                        const target = parseInt(numbers[0]);
                        // Create a template by replacing the number with a placeholder
                        const template = originalHTML.replace(numbers[0], 'NUMBER');
                        stat.innerHTML = template.replace('NUMBER', '0');
                        animateCounter(stat, target, 2000, template);
                    }
                    // For multiple numbers (like "1-2"), don't animate to keep it simple
                    // Or you could add more complex logic here if needed
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Stats observer removed - hero section now uses integration proof instead of animated stats
// const heroStats = document.querySelector('.hero-stats');
// if (heroStats) {
//     statsObserver.observe(heroStats);
// }

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
