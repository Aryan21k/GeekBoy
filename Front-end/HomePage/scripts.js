// Function to handle smooth scrolling
function smoothScroll(targetElement, duration) {
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const ease = easeInOutQuad(timeElapsed, startPosition, distance, duration); // Using easeInOutQuad directly
        window.scrollTo(0, ease);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Define easeInOutQuad function separately
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Smooth scroll for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            smoothScroll(targetElement, 1500); // Adjust duration (in milliseconds) as needed
        }
    });
});
