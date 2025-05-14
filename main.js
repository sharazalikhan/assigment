// DOM Elements
const header = document.querySelector('.main-header');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const searchIcon = document.querySelector('.search-icon');
const searchOverlay = document.querySelector('.search-overlay');
const closeSearch = document.querySelector('.close-search');
const mainImage = document.querySelector('.main-image img');
const thumbnailsContainer = document.querySelector('.thumbnails');
const prevButton = document.querySelector('.gallery-controls .prev');
const nextButton = document.querySelector('.gallery-controls .next');
const dotsContainer = document.querySelector('.dots');
const flavorRadios = document.querySelectorAll('input[name="flavor"]');
const purchaseRadios = document.querySelectorAll('input[name="purchase"]');
const addToCartLink = document.querySelector('.add-to-cart');
const statNumbers = document.querySelectorAll('.stat-number');
const accordionHeaders = document.querySelectorAll('.accordion-header');

// Product Gallery Images
const galleryImages = [
    'assets/product-1.jpg',
    'assets/product-2.jpg',
    'assets/product-3.jpg',
    // Add more images as needed
];

let currentImageIndex = 0;

// Mobile Menu Toggle
hamburgerMenu.addEventListener('click', () => {
    header.classList.toggle('menu-open');
});

// Search Overlay
searchIcon.addEventListener('click', () => {
    searchOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeSearch.addEventListener('click', () => {
    searchOverlay.style.display = 'none';
    document.body.style.overflow = '';
});

// Initialize Product Gallery
function initGallery() {
    // Create thumbnails
    galleryImages.forEach((src, index) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.alt = `Product thumbnail ${index + 1}`;
        thumb.addEventListener('click', () => updateGallery(index));
        thumbnailsContainer.appendChild(thumb);

        // Create dots
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => updateGallery(index));
        dotsContainer.appendChild(dot);
    });

    // Gallery controls
    prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateGallery(currentImageIndex);
    });

    nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateGallery(currentImageIndex);
    });
}

function updateGallery(index) {
    mainImage.src = galleryImages[index];
    currentImageIndex = index;

    // Update dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    // Update thumbnails
    thumbnailsContainer.querySelectorAll('img').forEach((thumb, i) => {
        thumb.style.opacity = i === index ? '0.6' : '1';
    });
}

// Product Options and Add to Cart
const cartLinks = {
    vanilla: {
        'one-time': '#cart-vanilla-onetime',
        'subscription': '#cart-vanilla-subscription',
        'bundle': '#cart-vanilla-bundle'
    },
    chocolate: {
        'one-time': '#cart-chocolate-onetime',
        'subscription': '#cart-chocolate-subscription',
        'bundle': '#cart-chocolate-bundle'
    },
    strawberry: {
        'one-time': '#cart-strawberry-onetime',
        'subscription': '#cart-strawberry-subscription',
        'bundle': '#cart-strawberry-bundle'
    }
};

function updateAddToCartLink() {
    const selectedFlavor = document.querySelector('input[name="flavor"]:checked').value;
    const selectedPurchase = document.querySelector('input[name="purchase"]:checked').value;
    addToCartLink.href = cartLinks[selectedFlavor][selectedPurchase];
}

flavorRadios.forEach(radio => {
    radio.addEventListener('change', updateAddToCartLink);
});

purchaseRadios.forEach(radio => {
    radio.addEventListener('change', updateAddToCartLink);
});

// Statistics counter animation
const stats = document.querySelectorAll('.stat-number');
const options = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    entry.target.textContent = Math.round(count);
                    requestAnimationFrame(updateCount);
                } else {
                    entry.target.textContent = target;
                }
            };

            updateCount();
            observer.unobserve(entry.target);
        }
    });
}, options);

stats.forEach(stat => observer.observe(stat));

// Testimonials slider
const slider = document.querySelector('.testimonials-slider');
const prevBtn = document.querySelector('.slider-controls .prev');
const nextBtn = document.querySelector('.slider-controls .next');
let slideIndex = 0;

function updateSlider() {
    const slides = slider.querySelectorAll('.testimonial');
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
    });
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        const slides = slider.querySelectorAll('.testimonial');
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        const slides = slider.querySelectorAll('.testimonial');
        slideIndex = (slideIndex + 1) % slides.length;
        updateSlider();
    });
}

// FAQ Accordion
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        accordionItems.forEach(accItem => {
            accItem.classList.remove('active');
            const content = accItem.querySelector('.accordion-content');
            content.style.maxHeight = null;
        });

        // Open clicked item
        if (!isActive) {
            item.classList.add('active');
            const content = item.querySelector('.accordion-content');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});

// Smooth scroll for navigation links
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

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');
const fadeOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, fadeOptions);

fadeElements.forEach(element => fadeObserver.observe(element));

// Initialize Gallery on Load
window.addEventListener('load', () => {
    initGallery();
    updateAddToCartLink(); // Set initial cart link
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}); 