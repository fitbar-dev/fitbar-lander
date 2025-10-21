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

// Smooth brand logo scrolling
class BrandScroller {
    constructor(container, speed = 1) {
        this.container = container;
        this.speed = speed;
        this.position = 0;
        this.isRunning = false;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        // Get the total width of the content
        this.contentWidth = this.container.scrollWidth / 2; // Divide by 2 because we have duplicated content
        
        this.start();
    }
    
    start() {
        this.isRunning = true;
        this.animate();
    }
    
    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.position -= this.speed;
        
        // Reset position when we've scrolled exactly one content width
        if (Math.abs(this.position) >= this.contentWidth) {
            this.position = 0;
        }
        
        this.container.style.transform = `translateX(${this.position}px)`;
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Set up video cycling
    const video = document.getElementById('hero-video');
    if (video) {
        video.addEventListener('ended', cycleVideos);
    }
    
    // Set up brand logo scrolling
    const brandRows = document.querySelectorAll('.brands-row');
    const scrollers = [];
    
    // Different speeds for each row
    const speeds = [0.5, 0.3, 0.2, 0.4];
    
    brandRows.forEach((row, index) => {
        const scroller = new BrandScroller(row, speeds[index]);
        scrollers.push(scroller);
    });
    
    // Store scrollers globally so they can be controlled if needed
    window.brandScrollers = scrollers;
    
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

    // Carousel setup for seamless scrolling
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        // Duplicate the carousel items for seamless loop
        const originalItems = carouselTrack.innerHTML;
        carouselTrack.innerHTML = originalItems + originalItems;
        
        // JavaScript-based carousel animation
        class CarouselScroller {
            constructor(track) {
                this.track = track;
                this.position = 0;
                this.speed = 0.5; // pixels per frame
                this.isRunning = false;
                this.animationId = null;
                this.contentWidth = 0;
                this.init();
            }
            
            init() {
                if (!this.track) return;
                
                // Calculate the width of one set of items (half the total width)
                this.contentWidth = this.track.scrollWidth / 2;
                this.start();
            }
            
            start() {
                this.isRunning = true;
                this.animate();
            }
            
            stop() {
                this.isRunning = false;
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                }
            }
            
            animate() {
                if (!this.isRunning) return;
                
                this.position -= this.speed;
                
                // Reset position when we've scrolled exactly one content width
                if (Math.abs(this.position) >= this.contentWidth) {
                    this.position = 0;
                }
                
                this.track.style.transform = `translateX(${this.position}px)`;
                
                this.animationId = requestAnimationFrame(() => this.animate());
            }
        }
        
        // Initialize the carousel scroller
        const carouselScroller = new CarouselScroller(carouselTrack);
        
        // Pause on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                carouselScroller.stop();
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                carouselScroller.start();
            });
        }
    }

    // Brands hero video cycling setup
    const brandsHeroVideo = document.getElementById('brands-hero-video');
    const brandsVideos = [
        'images/brands-hero/falling-fabric.mov',
        'images/brands-hero/girl-in-fabric.mov',
        'images/brands-hero/which-size.mov',
        'images/brands-hero/woman-trying-on-blouse.mov',
        'images/brands-hero/zoom.mov'
    ];
    let currentBrandsVideoIndex = 1; // Start at 1 since first video is already set in HTML

    function cycleBrandsVideos() {
        if (brandsHeroVideo) {
            brandsHeroVideo.src = brandsVideos[currentBrandsVideoIndex];
            brandsHeroVideo.load();
            currentBrandsVideoIndex = (currentBrandsVideoIndex + 1) % brandsVideos.length;
        }
    }

    if (brandsHeroVideo) {
        brandsHeroVideo.addEventListener('ended', cycleBrandsVideos);
    }
});
