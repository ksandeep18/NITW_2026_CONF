document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.sponsors-track');
    const slides = document.querySelectorAll('.sponsor-slide');
    
    // Clone first set of slides for infinite scroll
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });

    // Pause animation on hover
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });

    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        track.style.animationPlayState = 'paused';
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left
                track.style.animationPlayState = 'running';
            } else {
                // Swipe right
                track.style.animationPlayState = 'running';
            }
        } else {
            track.style.animationPlayState = 'running';
        }
    }
}); 