console.log('Portfolio website loaded');

// System Loader Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('system-loader');
    const loaderText = document.getElementById('loader-text');
    const texts = ['INITIALIZING SYSTEM...', 'LOADING DATA MODULES...', 'BACKEND ONLINE'];
    let step = 0;

    // Check if elements exist to avoid errors
    if (loader && loaderText) {
        const interval = setInterval(() => {
            if (step < texts.length) {
                loaderText.innerText = texts[step];
                step++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    loader.classList.add('loaded');
                    // Optional: remove from DOM after transition
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                }, 200);
            }
        }, 250); // Fast sequence
    }
});

// Navigation Logic & Smart Scroll
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    let lastScrollTop = 0;


    // Profile Image Center-Color Logic (All Screens)
    const profileImg = document.querySelector('.profile-frame img');
    if (profileImg) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Trigger when element is roughly in center (~50% visibility)
                if (entry.isIntersecting) {
                    entry.target.classList.add('active-color');
                } else {
                    entry.target.classList.remove('active-color');
                }
            });
        }, {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // Active only in the middle 20% of screen
            threshold: 0
        });
        observer.observe(profileImg);
    }


    if (hamburger && navLinks) {
        // Move elements to body to fix stacking context issues
        if (hamburger.parentNode !== document.body) {
            document.body.appendChild(hamburger);
        }
        if (navLinks.parentNode !== document.body) {
            document.body.appendChild(navLinks);
        }

        // --- NEW: Inject Internal Close Button for Mobile ---
        let closeBtn = document.querySelector('.menu-close-btn');
        if (!closeBtn) {
            closeBtn = document.createElement('div');
            closeBtn.classList.add('menu-close-btn');
            navLinks.appendChild(closeBtn);
        }

        // Toggle Menu Function
        const toggleMenu = (isOpen) => {
            if (isOpen) {
                hamburger.classList.add("active");
                navLinks.classList.add("active");
                document.body.classList.add("menu-open"); // Hides hamburger via CSS
            } else {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
                document.body.classList.remove("menu-open");
            }
        };

        // Open via Hamburger
        hamburger.addEventListener("click", () => {
            const isActive = navLinks.classList.contains("active");
            toggleMenu(!isActive);
        });

        // Close via Internal Button
        closeBtn.addEventListener("click", () => {
            toggleMenu(false);
        });

        // Close when clicking a link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                toggleMenu(false);
            });
        });

        // Close when clicking outside (optional but good UX)
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !hamburger.contains(e.target)) {
                toggleMenu(false);
            }
        });



        // Scroll listener handles logic below


        // --- Smart Responsive Menu Handling ---
        const heroNav = document.querySelector('.hero-nav');

        let desktopStickyHeader = null;
        let stickyObserver = null;

        // Target the NAV itself (or header) to sync perfectly
        const heroNavElement = document.querySelector('.hero-nav');

        function handleResponsiveNav() {
            if (window.innerWidth <= 767) {
                // Mobile state logic...
                if (hamburger && hamburger.parentNode !== document.body) document.body.appendChild(hamburger);
                if (navLinks && navLinks.parentNode !== document.body) document.body.appendChild(navLinks);
                if (desktopStickyHeader) desktopStickyHeader.style.display = 'none';
                if (stickyObserver) { stickyObserver.disconnect(); stickyObserver = null; }
            } else {
                // Desktop state logic...
                if (heroNav) {
                    if (navLinks && navLinks.parentNode !== heroNav) heroNav.insertBefore(navLinks, heroNav.firstChild);
                    if (hamburger && hamburger.parentNode !== heroNav) heroNav.appendChild(hamburger);
                }

                if (!desktopStickyHeader) {
                    desktopStickyHeader = document.querySelector('.desktop-sticky-header');
                    if (!desktopStickyHeader) {
                        desktopStickyHeader = document.createElement('div');
                        desktopStickyHeader.className = 'desktop-sticky-header';

                        // Add Brand (Left Side)
                        const desktopBrand = document.createElement('div');
                        desktopBrand.className = 'desktop-brand';
                        desktopBrand.innerText = 'SD.';
                        desktopStickyHeader.appendChild(desktopBrand);

                        // Clone nav
                        const clonedLinks = navLinks.cloneNode(true);
                        clonedLinks.classList.add('sticky-cloned-nav');
                        desktopStickyHeader.appendChild(clonedLinks);
                        document.body.insertBefore(desktopStickyHeader, document.body.firstChild);
                    }
                }
                desktopStickyHeader.style.display = 'flex';

                // Initialize Observer on HERO NAV
                if (!stickyObserver && heroNavElement) {
                    stickyObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            // When hero nav hits top or goes above (boundingClientRect.top <= 0)
                            // We use a small threshold or margin to catch it exactly at the top edge
                            if (entry.boundingClientRect.top <= 0) {
                                desktopStickyHeader.classList.add('visible');
                            } else {
                                desktopStickyHeader.classList.remove('visible');
                            }
                        });
                    }, { threshold: [0, 1], rootMargin: "-1px 0px 0px 0px" });
                    stickyObserver.observe(heroNavElement);
                }
            }
        }

        handleResponsiveNav();
        window.addEventListener('resize', handleResponsiveNav);

        // --- Standard Scroll Logic (Mobile UI & Sticky Header) ---
        let mobileStickyBar = null;

        window.addEventListener("scroll", () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Auto-close hamburger if open
            if (hamburger.classList.contains("active")) toggleMenu(false);

            // Mobile Hamburger & Sticky Header Logic
            if (window.innerWidth <= 767) {
                // Ensure Bar Exists
                if (!mobileStickyBar) {
                    mobileStickyBar = document.querySelector('.mobile-sticky-bar');
                    if (!mobileStickyBar) {
                        mobileStickyBar = document.createElement('div');
                        mobileStickyBar.className = 'mobile-sticky-bar';

                        // Add Brand
                        const brand = document.createElement('div');
                        brand.className = 'mobile-brand';
                        brand.innerText = 'SD.';
                        mobileStickyBar.appendChild(brand);

                        document.body.appendChild(mobileStickyBar);

                        // CLONE NAV LINKS (Horizontal Scroll)
                        if (navLinks) {
                            const mobileLinks = navLinks.cloneNode(true);
                            mobileLinks.className = 'mobile-scroll-nav'; // Class for horizontal styling
                            mobileStickyBar.appendChild(mobileLinks);

                            // Add active tracking for these new links too
                            mobileLinks.querySelectorAll('a').forEach(a => {
                                a.addEventListener('click', () => {
                                    // optional: smooth scroll handled by CSS/native
                                });
                            });
                        }
                    }
                }

                // Show/Hide Bar based on scroll
                if (scrollTop > 50) {
                    mobileStickyBar.classList.add("visible");
                } else {
                    mobileStickyBar.classList.remove("visible");
                }
            } else {
                // Desktop: ensure bar is hidden
                if (mobileStickyBar) {
                    mobileStickyBar.style.display = 'none';
                }
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }


});

// Contact Form Logic - Cyber Terminal Style
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // --- CONFIGURATION ---
        const SERVICE_ID = "service_zuaawg9";
        const TEMPLATE_ID = "template_g7by78i"; // User needs to provide this
        const PUBLIC_KEY = "dbwsQ1Mf5fk2LD5kp";   // User needs to provide this
        // ---------------------

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        const submitBtn = contactForm.querySelector(".submit-btn");

        // Reset previous validation alerts
        clearValidationAlerts();

        let isValid = true;

        // --- VALIDATION LOGIC ---

        // 1. Codename (Name) > 1 char
        if (nameInput.value.trim().length < 2) {
            showValidationAlert(nameInput, "⚠ INVALID CODENAME: MINIMUM 2 CHARS REQUIRED");
            isValid = false;
        }

        // 2. Frequency (Email) regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            showValidationAlert(emailInput, "⚠ INVALID FREQUENCY: SIGNAL FORMAT UNRECOGNIZED");
            isValid = false;
        }

        // 3. Transmission Data (Message) > 9 chars
        if (messageInput.value.trim().length < 10) {
            showValidationAlert(messageInput, "⚠ DATA CORRUPTED: PACKET SIZE TOO SAMLL (MIN 10 CHARS)");
            isValid = false;
        }

        if (!isValid) return;

        // --- SUBMISSION ---

        // Set Loading State
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = "⏳ TRANSMITTING SIGNAL...";

        // Prepare parameters for EmailJS
        const templateParams = {
            from_name: nameInput.value,
            from_email: emailInput.value,
            message: messageInput.value
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(() => {
                // Success State
                submitBtn.innerText = "✅ TRANSMISSION SUCCESSFUL";
                submitBtn.style.borderColor = "var(--accent-secondary)";
                contactForm.reset();

                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.borderColor = "#000";
                }, 5000);
            }, (error) => {
                // Error State
                console.error("FAILED...", error);
                submitBtn.innerText = "❌ TRANSMISSION FAILED";

                // Show terminal error below button
                const errorDiv = document.createElement("div");
                errorDiv.className = "terminal-alert error";
                errorDiv.innerText = `⚠ ERR_CONNECTION_REFUSED: CHECK CREDENTIALS / NETWORK`;
                errorDiv.style.marginTop = "10px";
                contactForm.appendChild(errorDiv);

                setTimeout(() => {
                    submitBtn.innerText = "RETRY TRANSMISSION";
                    submitBtn.disabled = false;
                    errorDiv.remove();
                }, 4000);
            });
    });
}

// Helper: Show Terminal Alert
function showValidationAlert(inputElement, message) {
    const alertDiv = document.createElement("div");
    alertDiv.className = "terminal-alert error";
    alertDiv.innerText = message;

    // Insert after the form-group (parent of input)
    inputElement.parentElement.appendChild(alertDiv);

    // Add shake effect to input
    inputElement.style.borderColor = "red";
    setTimeout(() => {
        inputElement.style.borderColor = "";
    }, 2000);
}

// Helper: Clear Alerts
function clearValidationAlerts() {
    const alerts = document.querySelectorAll(".terminal-alert");
    alerts.forEach(alert => alert.remove());

    const inputs = document.querySelectorAll("#contact-form input, #contact-form textarea");
    inputs.forEach(input => input.style.borderColor = "");
}


/* --- Active Section Highlight Logic --- */
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinksDesktop = document.querySelectorAll('.nav-links a, .sticky-cloned-nav a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get ID of section
                const id = entry.target.getAttribute('id');

                // Highlight corresponding nav links (INCLUDING HERO/HOME)
                document.querySelectorAll('.nav-links a, .sticky-cloned-nav a, .mobile-scroll-nav a').forEach(link => {
                    link.classList.remove('active-section');
                    // Add active class to matching link
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active-section');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

