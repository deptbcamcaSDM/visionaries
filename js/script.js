document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const ribbonContainer = document.querySelector('.ribbon-container');
    const scissors = document.querySelector('.scissors');
    const typingText = document.querySelector('.typing-text');
    const heroText = document.querySelector('.hero-text');
    const subtitle = document.querySelector('.subtitle');
    const navButtons = document.querySelector('.nav-buttons');
    const pages = document.querySelectorAll('.page');
    const ribbonSound = document.getElementById('ribbon-sound');
    const clickSound = document.getElementById('click-sound');

    // Initial state
    let currentPage = 'opening-page';

    // Hide elements initially (until ribbon is manually cut)
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateY(20px)';
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translateY(20px)';
    navButtons.style.opacity = '0';
    navButtons.style.transform = 'translateY(20px)';

    // Start intro animations (typing + show hero/subtitle/nav)
    function startIntro() {
        typeText(typingText, 'THE CLASS OF BCA 2025-26 PRESENTS');

        // Show hero text and subtitle with delay
        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';

            setTimeout(() => {
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';

                setTimeout(() => {
                    navButtons.style.opacity = '1';
                    navButtons.style.transform = 'translateY(0)';
                }, 500);
            }, 1000);
        }, 2000);
    }

    // Manual ribbon cut on scissors click
    if (scissors) {
        scissors.style.cursor = 'pointer';
        scissors.addEventListener('click', () => {
            // Play ribbon cut sound (user interaction allows audio)
            try {
                ribbonSound && ribbonSound.play().catch(() => {});
            } catch (error) {}

            // Trigger scissors animation
            scissors.classList.add('animate');

            // After animation finishes, fade out ribbon overlay and start intro
            setTimeout(() => {
                ribbonContainer.classList.add('cut');
                setTimeout(() => {
                    startIntro();
                }, 500);
            }, 3000);
        });
    }

    // Typing animation
    function typeText(element, text) {
        element.textContent = '';
        let index = 0;

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50);
            }
        }

        type();
    }

    // Navigation
    function navigateTo(pageId) {
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }

        // Hide current page
        document.getElementById(currentPage).classList.remove('active');

        // Show new page
        document.getElementById(pageId).classList.add('active');
        currentPage = pageId;

        // Add glitch effect
        document.getElementById(pageId).classList.add('glitch');
        setTimeout(() => {
            document.getElementById(pageId).classList.remove('glitch');
        }, 300);

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Add click event listeners to all navigation buttons
    document.querySelectorAll('[data-navigate]').forEach(button => {
        button.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-navigate');
            navigateTo(targetPage);
        });

        // Hover effect for buttons
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
});