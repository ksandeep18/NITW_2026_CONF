document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dots = document.querySelectorAll('.carousel-dot');
    
    let currentSlide = 0;
    const slideCount = slides.length;

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.zIndex = '1';
        });

        // Show the current slide
        slides[index].style.opacity = '1';
        slides[index].style.zIndex = '2';
    }

    // Function to show next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }

    // Initialize the carousel
    showSlide(0);

    // Start automatic slideshow
    setInterval(nextSlide, 3000);

    // Function to update carousel position
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateCarousel();
    }

    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance when hovering over carousel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // Resume auto-advance when mouse leaves carousel
    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
        }
    }
}); 