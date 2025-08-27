

// --- 1. Hamburger Menu Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// --- 2. Sliding Image Gallery (Corrected) ---
const track = document.querySelector('.gallery-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

let currentIndex = 0;

// Function to update slide positions and move the track
const updateSlidePosition = (targetIndex) => {
    // Get the current width of a slide (recalculates on each call)
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    // Move the track to the target slide
    track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
    currentIndex = targetIndex;
}

// Event Listeners for Buttons
nextButton.addEventListener('click', () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= slides.length) {
        nextIndex = 0; // Loop to the start
    }
    updateSlidePosition(nextIndex);
});

prevButton.addEventListener('click', () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
        prevIndex = slides.length - 1; // Loop to the end
    }
    updateSlidePosition(prevIndex);
});

// Auto-slide functionality
const autoSlide = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }
    updateSlidePosition(nextIndex);
};

// Start auto-sliding every 5 seconds
setInterval(autoSlide, 5000);

// Adjust slider on window resize to prevent misalignment
window.addEventListener('resize', () => {
    // Instantly move to the current slide to correct its position
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transition = 'none'; // Disable transition for instant adjustment
    track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
    
    // Re-enable the transition after a tiny delay
    setTimeout(() => {
        track.style.transition = 'transform 0.5s ease-in-out';
    }, 10);
});

// Initial positioning on page load
window.addEventListener('load', () => {
    updateSlidePosition(0);
});