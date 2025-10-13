// Video cycling between tactile-fabric and scissors
let currentVideoIndex = 0;
const videos = [
    'images/tactile-fabric.mp4',
    'images/walking.mov',
    'images/wine.mov',
    'images/scissors-preview.mov',
    'images/tux.mov'
];

function cycleVideos() {
    const video = document.getElementById('hero-video');
    if (video) {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        video.src = videos[currentVideoIndex];
        video.load();
        video.play();
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Set up video cycling
    const video = document.getElementById('hero-video');
    if (video) {
        video.addEventListener('ended', cycleVideos);
    }
    
    // Handle form submission
    const inviteForm = document.querySelector('.invite-form');
    if (inviteForm) {
        inviteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(inviteForm);
            const firstName = inviteForm.querySelector('input[placeholder="First Name"]').value;
            const lastName = inviteForm.querySelector('input[placeholder="Last Name"]').value;
            const email = inviteForm.querySelector('input[type="email"]').value;
            const location = inviteForm.querySelector('select').value;
            
            // Simple validation
            if (!firstName || !lastName || !email || !location) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            const submitButton = inviteForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you! We\'ll be in touch soon with your invite details.');
                inviteForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // Handle CTA button clicks
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to form
            const formSection = document.querySelector('.cta-section');
            if (formSection) {
                formSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.amenity-item, .brand-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effects to brand items
    const brandItems = document.querySelectorAll('.brand-item');
    brandItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
});
