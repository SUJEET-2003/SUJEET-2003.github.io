# Personal Portfolio Website

A high-performance, responsive portfolio designed to showcase Backend Engineering projects and Data Science skills. Built with a focus on clean architecture, system design, and interactive user experience.

[View Live Site](https://sujeet-2003.github.io/)

## Key Features
* **Responsive Architecture:** Fluid layout that adapts seamlessly across mobile, tablet, and desktop devices.
* **Smart Navigation:** Features a sticky header on desktop and a touch-optimized drawer menu for mobile users.
* **Interactive UI:** Includes custom cursor tracking, scroll-triggered reveal animations, and dynamic loaders.
* **Live Contact Module:** Fully functional contact form integrated with EmailJS, featuring regex validation and real-time transmission feedback.

## Tech Stack
* **Core:** HTML5, CSS3 (Custom Variables, Flexbox, Grid), Vanilla JavaScript (ES6+).
* **Integrations:** EmailJS API (Serverless form handling).
* **Design Assets:** Google Fonts ('Outfit' & 'Inter'), DevIcons, SVG Optimization.

## Development Challenges & Solutions
1. Responsive Navigation Logic:
Developing a unified navigation system that switches behavior based on device width.
* Solution: Implemented a JavaScript observer to dynamically toggle between the sticky command bar (Desktop) and modal drawer (Mobile) without layout shifts.

2. Asynchronous Form Handling:
Providing immediate user feedback during data transmission without page reloads.
* Solution: Engineered a custom validation script that injects DOM alerts for success/error states, maintaining a seamless user experience.

3. Cross-Device Compatibility:
Ensuring consistent typography and spacing across different viewports.
* Solution: Utilized clamp() functions for typography and fluid CSS Grid layouts to ensure stability on all screen sizes.

## Local Setup
This project uses zero heavy dependencies for easy deployment.

1. Clone the repository:
   git clone https://github.com/SUJEET-2003/SUJEET-2003.github.io.git

2. Run Locally:
   Open index.html in any modern browser or use the VS Code Live Server extension.

---
Engineered by Sujeet Das | 2026