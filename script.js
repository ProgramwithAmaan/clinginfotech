// /**
//  * CLING INFO TECH WORKS — JAVASCRIPT CONTROLLER
//  * Features:
//  * 1. Thin Scroll Progress Indicator
//  * 2. Floating Navbar Scroll Transition & Section Spy
//  * 3. Mobile Navigation Drawer with Staggered Links
//  * 4. Desktop Custom Follower Cursor with Hover Expansion
//  * 5. Magnetic CTA Button Physics
//  * 6. Subtle Hero Mouse Parallax Effect (rAF-optimized)
//  * 7. Viewport Reveal Animations (IntersectionObserver)
//  * 8. Animated Numerical Counter Trigger
//  * 9. Testimonial Slider with Auto-play, Touch Swipe & Dots
//  * 10. Interactive Contact Form with Validation & Feedback
//  * 11. Dynamic Year & Reduced Motion Support
//  */

// document.addEventListener("DOMContentLoaded", () => {
//   "use strict";

//   // Check user preference for reduced motion
//   const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//   /* ==========================================================================
//      1. Scroll Progress Bar
//      ========================================================================== */
//   const scrollProgressBar = document.getElementById("scrollProgress");

//   function updateScrollProgress() {
//     if (!scrollProgressBar) return;
//     const scrollTop = window.scrollY || document.documentElement.scrollTop;
//     const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//     const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
//     scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
//   }

//   /* ==========================================================================
//      2. Floating Navbar Scroll Transition & Section Spy
//      ========================================================================== */
//   const headerWrapper = document.getElementById("headerWrapper");
//   const navLinks = document.querySelectorAll(".nav-links .nav-link");
//   const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
//   const trackedSections = document.querySelectorAll("section[id]");
//   const navIndicator = document.getElementById("navIndicator");
//   const mainNav = document.getElementById("mainNav");

//   function moveNavIndicator(targetLink) {
//     if (!navIndicator || !targetLink || !mainNav) return;
//     const parentRect = mainNav.getBoundingClientRect();
//     const linkRect = targetLink.getBoundingClientRect();
//     const leftOffset = linkRect.left - parentRect.left;
//     const width = linkRect.width;

//     navIndicator.style.left = `${leftOffset}px`;
//     navIndicator.style.width = `${width}px`;
//     navIndicator.style.opacity = "1";
//   }

//   function getActiveNavLink() {
//     return document.querySelector(".nav-links .nav-link.active") || navLinks[0];
//   }

//   // Set initial indicator position
//   window.addEventListener("load", () => {
//     setTimeout(() => {
//       moveNavIndicator(getActiveNavLink());
//     }, 150);
//   });
//   setTimeout(() => {
//     moveNavIndicator(getActiveNavLink());
//   }, 100);

//   // Hover effect on desktop nav links
//   navLinks.forEach(link => {
//     link.addEventListener("mouseenter", () => moveNavIndicator(link));
//   });

//   if (mainNav) {
//     mainNav.addEventListener("mouseleave", () => {
//       moveNavIndicator(getActiveNavLink());
//     });
//   }

//   window.addEventListener("resize", () => {
//     moveNavIndicator(getActiveNavLink());
//   }, { passive: true });

//   function handleNavbarScroll() {
//     if (!headerWrapper) return;
//     if (window.scrollY > 40) {
//       headerWrapper.classList.add("scrolled");
//     } else {
//       headerWrapper.classList.remove("scrolled");
//     }
//   }

//   // Active section spy with IntersectionObserver
//   const sectionObserverOptions = {
//     root: null,
//     rootMargin: "-25% 0px -65% 0px",
//     threshold: 0
//   };

//   const sectionObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         const sectionId = entry.target.getAttribute("id");
        
//         // Update desktop links
//         navLinks.forEach(link => {
//           const href = link.getAttribute("href");
//           if (href === `#${sectionId}`) {
//             link.classList.add("active");
//             moveNavIndicator(link);
//           } else {
//             link.classList.remove("active");
//           }
//         });

//         // Update mobile links
//         mobileNavLinks.forEach(link => {
//           const href = link.getAttribute("href");
//           if (href === `#${sectionId}`) {
//             link.classList.add("active");
//           } else {
//             link.classList.remove("active");
//           }
//         });
//       }
//     });
//   }, sectionObserverOptions);

//   trackedSections.forEach(section => sectionObserver.observe(section));

//   // Combined scroll listener with requestAnimationFrame throttling
//   let isTicking = false;
//   window.addEventListener("scroll", () => {
//     if (!isTicking) {
//       window.requestAnimationFrame(() => {
//         updateScrollProgress();
//         handleNavbarScroll();
//         isTicking = false;
//       });
//       isTicking = true;
//     }
//   }, { passive: true });

//   /* ==========================================================================
//      3. Mobile Navigation Drawer
//      ========================================================================== */
//   const menuToggle = document.getElementById("menuToggle");
//   const mobileDrawer = document.getElementById("mobileDrawer");
//   const drawerBackdrop = document.getElementById("drawerBackdrop");
//   const drawerClose = document.getElementById("drawerClose");

//   function openMobileMenu() {
//     if (!mobileDrawer || !menuToggle) return;
//     mobileDrawer.classList.add("open");
//     menuToggle.classList.add("is-active");
//     menuToggle.setAttribute("aria-expanded", "true");
//     mobileDrawer.setAttribute("aria-hidden", "false");
//     document.body.style.overflow = "hidden";
//   }

//   function closeMobileMenu() {
//     if (!mobileDrawer || !menuToggle) return;
//     mobileDrawer.classList.remove("open");
//     menuToggle.classList.remove("is-active");
//     menuToggle.setAttribute("aria-expanded", "false");
//     mobileDrawer.setAttribute("aria-hidden", "true");
//     document.body.style.overflow = "";
//   }

//   if (menuToggle) {
//     menuToggle.addEventListener("click", () => {
//       if (mobileDrawer.classList.contains("open")) {
//         closeMobileMenu();
//       } else {
//         openMobileMenu();
//       }
//     });
//   }

//   if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeMobileMenu);
//   if (drawerClose) drawerClose.addEventListener("click", closeMobileMenu);

//   document.querySelectorAll(".mobile-nav-link, .btn-mobile-cta").forEach(link => {
//     link.addEventListener("click", closeMobileMenu);
//   });

//   window.addEventListener("keydown", (e) => {
//     if (e.key === "Escape" && mobileDrawer && mobileDrawer.classList.contains("open")) {
//       closeMobileMenu();
//     }
//   });

//   /* ==========================================================================
//      4. Desktop Custom Cursor Effect
//      ========================================================================== */
//   const cursorDot = document.getElementById("cursorDot");
//   const cursorRing = document.getElementById("cursorRing");
//   const isFinePointer = window.matchMedia("(pointer: fine)").matches;

//   if (isFinePointer && cursorDot && cursorRing && !prefersReducedMotion) {
//     let mouseX = -100, mouseY = -100;
//     let ringX = -100, ringY = -100;

//     window.addEventListener("mousemove", (e) => {
//       mouseX = e.clientX;
//       mouseY = e.clientY;
//       cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
//     }, { passive: true });

//     function renderCursor() {
//       // Lerp for outer ring lag
//       ringX += (mouseX - ringX) * 0.18;
//       ringY += (mouseY - ringY) * 0.18;
//       cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
//       requestAnimationFrame(renderCursor);
//     }
//     renderCursor();

//     // Hover effect on interactive elements
//     const interactiveSelectors = "a, button, input, select, textarea, .service-card, .bento-card, .country-card, .tech-badge, .client-logo-card";
//     document.querySelectorAll(interactiveSelectors).forEach(el => {
//       el.addEventListener("mouseenter", () => cursorRing.classList.add("cursor-hover"));
//       el.addEventListener("mouseleave", () => cursorRing.classList.remove("cursor-hover"));
//     });

//     document.addEventListener("mouseleave", () => {
//       cursorDot.style.opacity = "0";
//       cursorRing.style.opacity = "0";
//     });

//     document.addEventListener("mouseenter", () => {
//       cursorDot.style.opacity = "1";
//       cursorRing.style.opacity = "1";
//     });
//   }

//   /* ==========================================================================
//      5. Magnetic Buttons
//      ========================================================================== */
//   const magneticButtons = document.querySelectorAll(".magnetic-btn");
//   if (isFinePointer && !prefersReducedMotion) {
//     magneticButtons.forEach(btn => {
//       btn.addEventListener("mousemove", (e) => {
//         const rect = btn.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//         const deltaX = (e.clientX - centerX) * 0.24;
//         const deltaY = (e.clientY - centerY) * 0.24;
//         btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
//       });

//       btn.addEventListener("mouseleave", () => {
//         btn.style.transform = "translate(0px, 0px)";
//       });
//     });
//   }

//   /* ==========================================================================
//      6. Subtle Hero Mouse Parallax
//      ========================================================================== */
//   const heroVisual = document.getElementById("heroVisual");
//   const parallaxItems = heroVisual ? heroVisual.querySelectorAll("[data-parallax]") : [];

//   if (heroVisual && isFinePointer && !prefersReducedMotion && parallaxItems.length > 0) {
//     let heroTargetX = 0, heroTargetY = 0;
//     let heroCurrentX = 0, heroCurrentY = 0;

//     heroVisual.addEventListener("mousemove", (e) => {
//       const rect = heroVisual.getBoundingClientRect();
//       const x = (e.clientX - rect.left) - rect.width / 2;
//       const y = (e.clientY - rect.top) - rect.height / 2;
//       heroTargetX = x;
//       heroTargetY = y;
//     });

//     heroVisual.addEventListener("mouseleave", () => {
//       heroTargetX = 0;
//       heroTargetY = 0;
//     });

//     function updateHeroParallax() {
//       heroCurrentX += (heroTargetX - heroCurrentX) * 0.1;
//       heroCurrentY += (heroTargetY - heroCurrentY) * 0.1;

//       parallaxItems.forEach(item => {
//         const factor = parseFloat(item.getAttribute("data-parallax")) || 0.03;
//         const moveX = heroCurrentX * factor;
//         const moveY = heroCurrentY * factor;
        
//         // Preserve original float animation by combining with CSS vars
//         if (item.classList.contains("floating-glass-card")) {
//           item.style.setProperty("--px", `${moveX}px`);
//           item.style.setProperty("--py", `${moveY}px`);
//         } else {
//           item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
//         }
//       });

//       requestAnimationFrame(updateHeroParallax);
//     }
//     updateHeroParallax();
//   }

//   /* ==========================================================================
//      7. Scroll Reveal Animations (IntersectionObserver)
//      ========================================================================== */
//   const revealElements = document.querySelectorAll(".fade-up, .reveal-up, .reveal-left, .reveal-right");

//   if (!prefersReducedMotion && "IntersectionObserver" in window) {
//     const revealObserver = new IntersectionObserver((entries, observer) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("is-visible");
//           observer.unobserve(entry.target);
//         }
//       });
//     }, {
//       rootMargin: "0px 0px -60px 0px",
//       threshold: 0.12
//     });

//     revealElements.forEach(el => revealObserver.observe(el));
//   } else {
//     // Immediate display if reduced motion requested or observer not supported
//     revealElements.forEach(el => el.classList.add("is-visible"));
//   }

//   /* ==========================================================================
//      8. Animated Numerical Stats Counters
//      ========================================================================== */
//   const counterElements = document.querySelectorAll(".counter");
//   let countersAnimated = false;

//   function runCounters() {
//     if (countersAnimated) return;
//     countersAnimated = true;

//     counterElements.forEach(counter => {
//       const target = parseInt(counter.getAttribute("data-target"), 10);
//       const suffix = counter.getAttribute("data-suffix") || "";
//       const isLocale = counter.getAttribute("data-format") === "locale";
//       const duration = 2200; // ms
//       const startTime = performance.now();

//       function animateCount(currentTime) {
//         const elapsed = currentTime - startTime;
//         const progress = Math.min(elapsed / duration, 1);
        
//         // Ease-out cubic calculation
//         const easeOut = 1 - Math.pow(1 - progress, 3);
//         const currentVal = Math.floor(easeOut * target);

//         if (isLocale) {
//           counter.textContent = currentVal.toLocaleString() + suffix;
//         } else {
//           counter.textContent = currentVal + suffix;
//         }

//         if (progress < 1) {
//           requestAnimationFrame(animateCount);
//         } else {
//           counter.textContent = (isLocale ? target.toLocaleString() : target) + suffix;
//           const statCard = counter.closest(".stat-card");
//           if (statCard) statCard.classList.add("counted");
//         }
//       }

//       requestAnimationFrame(animateCount);
//     });
//   }

//   const statsGrid = document.getElementById("statsGrid");
//   if (statsGrid && "IntersectionObserver" in window) {
//     const statsObserver = new IntersectionObserver((entries, observer) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           runCounters();
//           observer.unobserve(entry.target);
//         }
//       });
//     }, { threshold: 0.25 });

//     statsObserver.observe(statsGrid);
//   } else {
//     runCounters();
//   }

//   /* ==========================================================================
//      9. Testimonial Carousel
//      ========================================================================== */
//   const testimonialTrack = document.getElementById("testimonialTrack");
//   const prevTestimonialBtn = document.getElementById("prevTestimonial");
//   const nextTestimonialBtn = document.getElementById("nextTestimonial");
//   const dotButtons = document.querySelectorAll(".testimonial-dots .dot-btn");
//   const totalSlides = dotButtons.length;
//   let currentSlide = 0;
//   let carouselInterval = null;

//   function goToSlide(index) {
//     if (!testimonialTrack) return;
//     currentSlide = (index + totalSlides) % totalSlides;
//     testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

//     dotButtons.forEach((dot, idx) => {
//       dot.classList.toggle("active", idx === currentSlide);
//     });
//   }

//   function startAutoplay() {
//     stopAutoplay();
//     carouselInterval = setInterval(() => {
//       goToSlide(currentSlide + 1);
//     }, 5500);
//   }

//   function stopAutoplay() {
//     if (carouselInterval) clearInterval(carouselInterval);
//   }

//   if (prevTestimonialBtn) {
//     prevTestimonialBtn.addEventListener("click", () => {
//       goToSlide(currentSlide - 1);
//       startAutoplay();
//     });
//   }

//   if (nextTestimonialBtn) {
//     nextTestimonialBtn.addEventListener("click", () => {
//       goToSlide(currentSlide + 1);
//       startAutoplay();
//     });
//   }

//   dotButtons.forEach((dot, idx) => {
//     dot.addEventListener("click", () => {
//       goToSlide(idx);
//       startAutoplay();
//     });
//   });

//   const testimonialViewport = document.getElementById("testimonialViewport");
//   if (testimonialViewport) {
//     testimonialViewport.addEventListener("mouseenter", stopAutoplay);
//     testimonialViewport.addEventListener("mouseleave", startAutoplay);

//     // Touch swipe handling for mobile
//     let touchStartX = 0;
//     let touchEndX = 0;

//     testimonialViewport.addEventListener("touchstart", (e) => {
//       touchStartX = e.changedTouches[0].screenX;
//       stopAutoplay();
//     }, { passive: true });

//     testimonialViewport.addEventListener("touchend", (e) => {
//       touchEndX = e.changedTouches[0].screenX;
//       if (touchStartX - touchEndX > 50) {
//         goToSlide(currentSlide + 1);
//       } else if (touchEndX - touchStartX > 50) {
//         goToSlide(currentSlide - 1);
//       }
//       startAutoplay();
//     }, { passive: true });
//   }

//   startAutoplay();

//   /* ==========================================================================
//      10. Contact Form Validation, Loading State & Feedback
//      ========================================================================== */
//   const contactForm = document.getElementById("contactForm");
//   const formMessage = document.getElementById("formMessage");
//   const submitBtn = document.getElementById("submitBtn");

//   if (contactForm) {
//     const nameInput = document.getElementById("contactName");
//     const emailInput = document.getElementById("contactEmail");
//     const messageInput = document.getElementById("contactMessage");
//     const serviceInput = document.getElementById("contactService");

//     const nameError = document.getElementById("nameError");
//     const emailError = document.getElementById("emailError");
//     const messageError = document.getElementById("messageError");

//     function validateEmail(email) {
//       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     }

//     function clearErrors() {
//       document.querySelectorAll(".floating-field").forEach(f => f.classList.remove("has-error"));
//       if (nameError) nameError.textContent = "";
//       if (emailError) emailError.textContent = "";
//       if (messageError) messageError.textContent = "";
//     }

//     contactForm.addEventListener("submit", (e) => {
//       e.preventDefault();
//       clearErrors();
//       let hasError = false;

//       // Validate name
//       if (!nameInput.value.trim()) {
//         nameInput.closest(".floating-field").classList.add("has-error");
//         if (nameError) nameError.textContent = "Please enter your name.";
//         hasError = true;
//       }

//       // Validate email
//       if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
//         emailInput.closest(".floating-field").classList.add("has-error");
//         if (emailError) emailError.textContent = "Please enter a valid email address.";
//         hasError = true;
//       }

//       // Validate message
//       if (!messageInput.value.trim()) {
//         messageInput.closest(".floating-field").classList.add("has-error");
//         if (messageError) messageError.textContent = "Please enter project details.";
//         hasError = true;
//       }

//       if (hasError) return;

//       // Enter loading state
//       submitBtn.classList.add("loading");
//       submitBtn.disabled = true;

//       // Simulate asynchronous server transmission
//       setTimeout(() => {
//         submitBtn.classList.remove("loading");
//         submitBtn.disabled = false;

//         formMessage.className = "form-feedback-banner success";
//         formMessage.textContent = "✓ Thank you! Your request has been transmitted. An engineering specialist will contact you within 24 hours.";
        
//         contactForm.reset();

//         // Clear feedback banner after 6 seconds
//         setTimeout(() => {
//           formMessage.style.display = "none";
//           formMessage.className = "form-feedback-banner";
//         }, 6000);
//       }, 850);
//     });
//   }

//   /* ==========================================================================
//      11. Dynamic Footer Year & Smooth Anchors
//      ========================================================================== */
//   const yearSpan = document.getElementById("year");
//   if (yearSpan) {
//     yearSpan.textContent = new Date().getFullYear();
//   }

//   // Smooth scroll for all hash links with offset
//   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener("click", function(e) {
//       const targetId = this.getAttribute("href");
//       if (targetId === "#") return;
//       const targetElement = document.querySelector(targetId);
//       if (targetElement) {
//         e.preventDefault();
//         const headerOffset = 80;
//         const elementPosition = targetElement.getBoundingClientRect().top;
//         const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//         window.scrollTo({
//           top: offsetPosition,
//           behavior: prefersReducedMotion ? "auto" : "smooth"
//         });
//       }
//     });
//   });

//   /* ==========================================================================
//      12. Hero Interactive Particle Canvas
//      ========================================================================== */
//   function initHeroCanvas() {
//     const canvas = document.getElementById("heroCanvas");
//     if (!canvas || prefersReducedMotion) return;
//     const ctx = canvas.getContext("2d");
//     let width, height;
//     let particles = [];
//     let animationFrameId;
//     let isHeroVisible = true;
//     let mouse = { x: -1000, y: -1000 };

//     function resize() {
//       const heroSec = canvas.closest(".hero-section") || canvas.parentElement;
//       const rect = heroSec.getBoundingClientRect();
//       width = canvas.width = rect.width;
//       height = canvas.height = rect.height;
//     }
//     resize();
//     window.addEventListener("resize", resize, { passive: true });

//     window.addEventListener("mousemove", (e) => {
//       const rect = canvas.getBoundingClientRect();
//       mouse.x = e.clientX - rect.left;
//       mouse.y = e.clientY - rect.top;
//     }, { passive: true });

//     const colors = [
//       "rgba(255, 59, 53, 0.40)",
//       "rgba(36, 119, 255, 0.40)",
//       "rgba(139, 92, 246, 0.35)",
//       "rgba(255, 101, 132, 0.35)"
//     ];

//     const particleCount = window.innerWidth < 768 ? 16 : 30;
//     particles = [];
//     for (let i = 0; i < particleCount; i++) {
//       particles.push({
//         x: Math.random() * (width || 800),
//         y: Math.random() * (height || 500),
//         r: Math.random() * 2 + 1.2,
//         vx: (Math.random() - 0.5) * 0.5,
//         vy: (Math.random() - 0.5) * 0.5,
//         color: colors[Math.floor(Math.random() * colors.length)]
//       });
//     }

//     function renderParticles() {
//       if (!isHeroVisible) return;
//       ctx.clearRect(0, 0, width, height);

//       // Connection lines
//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < 80) {
//             ctx.beginPath();
//             ctx.strokeStyle = `rgba(36, 119, 255, ${0.1 * (1 - dist / 80)})`;
//             ctx.lineWidth = 0.9;
//             ctx.moveTo(particles[i].x, particles[i].y);
//             ctx.lineTo(particles[j].x, particles[j].y);
//             ctx.stroke();
//           }
//         }
//       }

//       // Update and draw particles
//       particles.forEach(p => {
//         p.x += p.vx;
//         p.y += p.vy;

//         if (p.x < 0) p.x = width;
//         if (p.x > width) p.x = 0;
//         if (p.y < 0) p.y = height;
//         if (p.y > height) p.y = 0;

//         // Subtle mouse repulsion
//         const mdx = p.x - mouse.x;
//         const mdy = p.y - mouse.y;
//         const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
//         if (mDist < 100 && mDist > 0) {
//           p.x += (mdx / mDist) * 1.2;
//           p.y += (mdy / mDist) * 1.2;
//         }

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//         ctx.fillStyle = p.color;
//         ctx.fill();
//       });

//       animationFrameId = requestAnimationFrame(renderParticles);
//     }

//     // Only animate when hero is visible
//     const heroObserver = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         isHeroVisible = entry.isIntersecting;
//         if (isHeroVisible) {
//           cancelAnimationFrame(animationFrameId);
//           renderParticles();
//         } else {
//           cancelAnimationFrame(animationFrameId);
//         }
//       });
//     }, { threshold: 0.05 });

//     const heroSection = document.getElementById("home");
//     if (heroSection) heroObserver.observe(heroSection);
//   }
//   initHeroCanvas();

//   /* ==========================================================================
//      13. Mouse Spotlight on Glass Cards
//      ========================================================================== */
//   function initSpotlight() {
//     if (!isFinePointer || prefersReducedMotion) return;
//     const spotlightCards = document.querySelectorAll(".card-spotlight");

//     spotlightCards.forEach(card => {
//       card.addEventListener("mousemove", (e) => {
//         const rect = card.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
//         card.style.setProperty("--mouse-x", `${x}px`);
//         card.style.setProperty("--mouse-y", `${y}px`);
//       }, { passive: true });
//     });
//   }
//   initSpotlight();

//   /* ==========================================================================
//      14. 3D Tilt Cards
//      ========================================================================== */
//   function initTilt() {
//     if (!isFinePointer || prefersReducedMotion) return;
//     const tiltCards = document.querySelectorAll(".tilt-card");

//     tiltCards.forEach(card => {
//       card.addEventListener("mousemove", (e) => {
//         const rect = card.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
//         const centerX = rect.width / 2;
//         const centerY = rect.height / 2;
//         const rotateX = ((y - centerY) / centerY) * -5;
//         const rotateY = ((x - centerX) / centerX) * 5;

//         card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
//       });

//       card.addEventListener("mouseleave", () => {
//         card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
//       });
//     });
//   }
//   initTilt();

//   /* ==========================================================================
//      15. Button Click Ripples
//      ========================================================================== */
//   function initButtonRipples() {
//     document.querySelectorAll(".btn").forEach(btn => {
//       btn.addEventListener("click", function(e) {
//         const rect = this.getBoundingClientRect();
//         const circle = document.createElement("span");
//         circle.classList.add("ripple-circle");
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
//         circle.style.left = `${x}px`;
//         circle.style.top = `${y}px`;
//         this.appendChild(circle);
//         setTimeout(() => circle.remove(), 700);
//       });
//     });
//   }
//   initButtonRipples();

//   /* ==========================================================================
//      16. World Map Radar Ping & Country Card Interactive Linking
//      ========================================================================== */
//   function initWorldMapLinking() {
//     const countryCards = document.querySelectorAll(".country-card[data-country]");
//     const mapPings = document.querySelectorAll(".map-ping-point[data-country]");

//     countryCards.forEach(card => {
//       const code = card.getAttribute("data-country");
//       const ping = document.querySelector(`.map-ping-point[data-country="${code}"]`);

//       card.addEventListener("mouseenter", () => {
//         if (ping) ping.classList.add("highlight");
//       });
//       card.addEventListener("mouseleave", () => {
//         if (ping) ping.classList.remove("highlight");
//       });
//     });

//     mapPings.forEach(ping => {
//       const code = ping.getAttribute("data-country");
//       const card = document.querySelector(`.country-card[data-country="${code}"]`);

//       ping.addEventListener("mouseenter", () => {
//         ping.classList.add("highlight");
//         if (card) {
//           card.style.borderColor = "var(--red)";
//           card.style.transform = "translateY(-8px) scale(1.04)";
//           card.style.boxShadow = "0 18px 36px rgba(255, 59, 53, 0.20)";
//         }
//       });
//       ping.addEventListener("mouseleave", () => {
//         ping.classList.remove("highlight");
//         if (card) {
//           card.style.borderColor = "";
//           card.style.transform = "";
//           card.style.boxShadow = "";
//         }
//       });
//     });
//   }
//   initWorldMapLinking();

//   /* ==========================================================================
//      17. Dark Mode Controller with Fluid Transition
//      ========================================================================== */
//   function initThemeToggle() {
//     const desktopToggle = document.getElementById("themeToggle");
//     const mobileToggle = document.getElementById("mobileThemeToggle");
//     const toggles = [desktopToggle, mobileToggle].filter(Boolean);
//     const storageKey = "cling-theme";

//     // Determine initial theme: localStorage -> system preference -> default light
//     const savedTheme = localStorage.getItem(storageKey);
//     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//     let currentTheme = savedTheme || (prefersDark ? "dark" : "light");

//     function applyTheme(theme, animate = false) {
//       if (animate && !prefersReducedMotion) {
//         document.documentElement.classList.add("theme-in-transition");
//       }

//       document.documentElement.setAttribute("data-theme", theme);
//       currentTheme = theme;
//       localStorage.setItem(storageKey, theme);

//       // Update button aria attributes
//       const nextThemeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
//       toggles.forEach(btn => {
//         btn.setAttribute("aria-label", nextThemeLabel);
//         btn.setAttribute("title", nextThemeLabel);
//       });

//       if (animate && !prefersReducedMotion) {
//         setTimeout(() => {
//           document.documentElement.classList.remove("theme-in-transition");
//         }, 460);
//       }
//     }

//     // Apply initially
//     applyTheme(currentTheme, false);

//     // Toggle click handler
//     function handleToggleClick(btn) {
//       const targetTheme = currentTheme === "dark" ? "light" : "dark";
//       btn.classList.add("pulse-click");
//       setTimeout(() => btn.classList.remove("pulse-click"), 460);
//       applyTheme(targetTheme, true);
//     }

//     toggles.forEach(btn => {
//       btn.addEventListener("click", () => handleToggleClick(btn));
//     });

//     // Listen to system changes if user hasn't explicitly set a preference
//     window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
//       if (!localStorage.getItem(storageKey)) {
//         applyTheme(e.matches ? "dark" : "light", true);
//       }
//     });
//   }
//   initThemeToggle();

//   // Initial trigger for scroll states
//   updateScrollProgress();
//   handleNavbarScroll();
// });








/**
 * CLING INFO TECH WORKS — JAVASCRIPT CONTROLLER
 * Features:
 * 1. Thin Scroll Progress Indicator
 * 2. Floating Navbar Scroll Transition & Section Spy
 * 3. Mobile Navigation Drawer with Staggered Links
 * 4. Desktop Custom Follower Cursor with Hover Expansion
 * 5. Magnetic CTA Button Physics
 * 6. Subtle Hero Mouse Parallax Effect (rAF-optimized)
 * 7. Viewport Reveal Animations (IntersectionObserver)
 * 8. Animated Numerical Counter Trigger
 * 9. Testimonial Slider with Auto-play, Touch Swipe & Dots
 * 10. Interactive Contact Form with Validation & Feedback
 * 11. Dynamic Year & Reduced Motion Support
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ==========================================================================
     1. Scroll Progress Bar
     ========================================================================== */
  const scrollProgressBar = document.getElementById("scrollProgress");

  function updateScrollProgress() {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
  }

  /* ==========================================================================
     2. Floating Navbar Scroll Transition & Section Spy
     ========================================================================== */
  const headerWrapper = document.getElementById("headerWrapper");
  const navLinks = document.querySelectorAll(".nav-links .nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const trackedSections = document.querySelectorAll("section[id]");
  const navIndicator = document.getElementById("navIndicator");
  const mainNav = document.getElementById("mainNav");

  function moveNavIndicator(targetLink) {
    if (!navIndicator || !targetLink || !mainNav) return;
    const parentRect = mainNav.getBoundingClientRect();
    const linkRect = targetLink.getBoundingClientRect();
    const leftOffset = linkRect.left - parentRect.left;
    const width = linkRect.width;

    navIndicator.style.left = `${leftOffset}px`;
    navIndicator.style.width = `${width}px`;
    navIndicator.style.opacity = "1";
  }

  function getActiveNavLink() {
    return document.querySelector(".nav-links .nav-link.active") || navLinks[0];
  }

  // Set initial indicator position
  window.addEventListener("load", () => {
    setTimeout(() => {
      moveNavIndicator(getActiveNavLink());
    }, 150);
  });
  setTimeout(() => {
    moveNavIndicator(getActiveNavLink());
  }, 100);

  // Hover effect on desktop nav links
  navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => moveNavIndicator(link));
  });

  if (mainNav) {
    mainNav.addEventListener("mouseleave", () => {
      moveNavIndicator(getActiveNavLink());
    });
  }

  window.addEventListener("resize", () => {
    moveNavIndicator(getActiveNavLink());
  }, { passive: true });

  function handleNavbarScroll() {
    if (!headerWrapper) return;
    if (window.scrollY > 40) {
      headerWrapper.classList.add("scrolled");
    } else {
      headerWrapper.classList.remove("scrolled");
    }
  }

  // Active section spy with IntersectionObserver
  const sectionObserverOptions = {
    root: null,
    rootMargin: "-25% 0px -65% 0px",
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute("id");
        
        // Update desktop links
        navLinks.forEach(link => {
          const href = link.getAttribute("href");
          if (href === `#${sectionId}`) {
            link.classList.add("active");
            moveNavIndicator(link);
          } else {
            link.classList.remove("active");
          }
        });

        // Update mobile links
        mobileNavLinks.forEach(link => {
          const href = link.getAttribute("href");
          if (href === `#${sectionId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, sectionObserverOptions);

  trackedSections.forEach(section => sectionObserver.observe(section));

  // Combined scroll listener with requestAnimationFrame throttling
  let isTicking = false;
  window.addEventListener("scroll", () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        updateScrollProgress();
        handleNavbarScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  /* ==========================================================================
     3. Mobile Navigation Drawer
     ========================================================================== */
  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const drawerClose = document.getElementById("drawerClose");

  function openMobileMenu() {
    if (!mobileDrawer || !menuToggle) return;
    mobileDrawer.classList.add("open");
    menuToggle.classList.add("is-active");
    menuToggle.setAttribute("aria-expanded", "true");
    mobileDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    if (!mobileDrawer || !menuToggle) return;
    mobileDrawer.classList.remove("open");
    menuToggle.classList.remove("is-active");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (mobileDrawer.classList.contains("open")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeMobileMenu);
  if (drawerClose) drawerClose.addEventListener("click", closeMobileMenu);

  document.querySelectorAll(".mobile-nav-link, .btn-mobile-cta").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer && mobileDrawer.classList.contains("open")) {
      closeMobileMenu();
    }
  });

  /* ==========================================================================
     4. Desktop Custom Cursor Effect
     ========================================================================== */
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;

  if (isFinePointer && cursorDot && cursorRing && !prefersReducedMotion) {
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }, { passive: true });

    function renderCursor() {
      // Lerp for outer ring lag
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Hover effect on interactive elements
    const interactiveSelectors = "a, button, input, select, textarea, .service-card, .bento-card, .country-card, .tech-badge, .client-logo-card, .team-card";
    document.querySelectorAll(interactiveSelectors).forEach(el => {
      el.addEventListener("mouseenter", () => cursorRing.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => cursorRing.classList.remove("cursor-hover"));
    });

    document.addEventListener("mouseleave", () => {
      cursorDot.style.opacity = "0";
      cursorRing.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
      cursorDot.style.opacity = "1";
      cursorRing.style.opacity = "1";
    });
  }

  /* ==========================================================================
     5. Magnetic Buttons
     ========================================================================== */
  const magneticButtons = document.querySelectorAll(".magnetic-btn");
  if (isFinePointer && !prefersReducedMotion) {
    magneticButtons.forEach(btn => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.24;
        const deltaY = (e.clientY - centerY) * 0.24;
        btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0px, 0px)";
      });
    });
  }

  /* ==========================================================================
     6. Subtle Hero Mouse Parallax
     ========================================================================== */
  const heroVisual = document.getElementById("heroVisual");
  const parallaxItems = heroVisual ? heroVisual.querySelectorAll("[data-parallax]") : [];

  if (heroVisual && isFinePointer && !prefersReducedMotion && parallaxItems.length > 0) {
    let heroTargetX = 0, heroTargetY = 0;
    let heroCurrentX = 0, heroCurrentY = 0;

    heroVisual.addEventListener("mousemove", (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) - rect.width / 2;
      const y = (e.clientY - rect.top) - rect.height / 2;
      heroTargetX = x;
      heroTargetY = y;
    });

    heroVisual.addEventListener("mouseleave", () => {
      heroTargetX = 0;
      heroTargetY = 0;
    });

    function updateHeroParallax() {
      heroCurrentX += (heroTargetX - heroCurrentX) * 0.1;
      heroCurrentY += (heroTargetY - heroCurrentY) * 0.1;

      parallaxItems.forEach(item => {
        const factor = parseFloat(item.getAttribute("data-parallax")) || 0.03;
        const moveX = heroCurrentX * factor;
        const moveY = heroCurrentY * factor;
        
        // Preserve original float animation by combining with CSS vars
        if (item.classList.contains("floating-glass-card")) {
          item.style.setProperty("--px", `${moveX}px`);
          item.style.setProperty("--py", `${moveY}px`);
        } else {
          item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        }
      });

      requestAnimationFrame(updateHeroParallax);
    }
    updateHeroParallax();
  }

  /* ==========================================================================
     7. Scroll Reveal Animations (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll(".fade-up, .reveal-up, .reveal-left, .reveal-right");

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Immediate display if reduced motion requested or observer not supported
    revealElements.forEach(el => el.classList.add("is-visible"));
  }

  /* ==========================================================================
     8. Animated Numerical Stats Counters
     ========================================================================== */
  const counterElements = document.querySelectorAll(".counter");
  let countersAnimated = false;

  function runCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      const suffix = counter.getAttribute("data-suffix") || "";
      const isLocale = counter.getAttribute("data-format") === "locale";
      const duration = 2200; // ms
      const startTime = performance.now();

      function animateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out cubic calculation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);

        if (isLocale) {
          counter.textContent = currentVal.toLocaleString() + suffix;
        } else {
          counter.textContent = currentVal + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          counter.textContent = (isLocale ? target.toLocaleString() : target) + suffix;
          const statCard = counter.closest(".stat-card");
          if (statCard) statCard.classList.add("counted");
        }
      }

      requestAnimationFrame(animateCount);
    });
  }

  const statsGrid = document.getElementById("statsGrid");
  if (statsGrid && "IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsGrid);
  } else {
    runCounters();
  }

  /* ==========================================================================
     9. Testimonial Carousel
     ========================================================================== */
  const testimonialTrack = document.getElementById("testimonialTrack");
  const prevTestimonialBtn = document.getElementById("prevTestimonial");
  const nextTestimonialBtn = document.getElementById("nextTestimonial");
  const dotButtons = document.querySelectorAll(".testimonial-dots .dot-btn");
  const totalSlides = dotButtons.length;
  let currentSlide = 0;
  let carouselInterval = null;

  function goToSlide(index) {
    if (!testimonialTrack) return;
    currentSlide = (index + totalSlides) % totalSlides;
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    dotButtons.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentSlide);
    });
  }

  function startAutoplay() {
    stopAutoplay();
    carouselInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5500);
  }

  function stopAutoplay() {
    if (carouselInterval) clearInterval(carouselInterval);
  }

  if (prevTestimonialBtn) {
    prevTestimonialBtn.addEventListener("click", () => {
      goToSlide(currentSlide - 1);
      startAutoplay();
    });
  }

  if (nextTestimonialBtn) {
    nextTestimonialBtn.addEventListener("click", () => {
      goToSlide(currentSlide + 1);
      startAutoplay();
    });
  }

  dotButtons.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      goToSlide(idx);
      startAutoplay();
    });
  });

  const testimonialViewport = document.getElementById("testimonialViewport");
  if (testimonialViewport) {
    testimonialViewport.addEventListener("mouseenter", stopAutoplay);
    testimonialViewport.addEventListener("mouseleave", startAutoplay);

    // Touch swipe handling for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialViewport.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    testimonialViewport.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        goToSlide(currentSlide + 1);
      } else if (touchEndX - touchStartX > 50) {
        goToSlide(currentSlide - 1);
      }
      startAutoplay();
    }, { passive: true });
  }

  startAutoplay();

  /* ==========================================================================
     10. Contact Form Validation, Loading State & Feedback
     ========================================================================== */
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const submitBtn = document.getElementById("submitBtn");

  if (contactForm) {
    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const messageInput = document.getElementById("contactMessage");
    const serviceInput = document.getElementById("contactService");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function clearErrors() {
      document.querySelectorAll(".floating-field").forEach(f => f.classList.remove("has-error"));
      if (nameError) nameError.textContent = "";
      if (emailError) emailError.textContent = "";
      if (messageError) messageError.textContent = "";
    }

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();
      let hasError = false;

      // Validate name
      if (!nameInput.value.trim()) {
        nameInput.closest(".floating-field").classList.add("has-error");
        if (nameError) nameError.textContent = "Please enter your name.";
        hasError = true;
      }

      // Validate email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailInput.closest(".floating-field").classList.add("has-error");
        if (emailError) emailError.textContent = "Please enter a valid email address.";
        hasError = true;
      }

      // Validate message
      if (!messageInput.value.trim()) {
        messageInput.closest(".floating-field").classList.add("has-error");
        if (messageError) messageError.textContent = "Please enter project details.";
        hasError = true;
      }

      if (hasError) return;

      // Enter loading state
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      // Simulate asynchronous server transmission
      setTimeout(() => {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;

        formMessage.className = "form-feedback-banner success";
        formMessage.textContent = "✓ Thank you! Your request has been transmitted. An engineering specialist will contact you within 24 hours.";
        
        contactForm.reset();

        // Clear feedback banner after 6 seconds
        setTimeout(() => {
          formMessage.style.display = "none";
          formMessage.className = "form-feedback-banner";
        }, 6000);
      }, 850);
    });
  }

  /* ==========================================================================
     11. Dynamic Footer Year & Smooth Anchors
     ========================================================================== */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Smooth scroll for all hash links with offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? "auto" : "smooth"
        });
      }
    });
  });

  /* ==========================================================================
     12. Hero Interactive Particle Canvas
     ========================================================================== */
  function initHeroCanvas() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    let animationFrameId;
    let isHeroVisible = true;
    let mouse = { x: -1000, y: -1000 };

    function resize() {
      const heroSec = canvas.closest(".hero-section") || canvas.parentElement;
      const rect = heroSec.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    window.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });

    const colors = [
      "rgba(255, 59, 53, 0.40)",
      "rgba(36, 119, 255, 0.40)",
      "rgba(139, 92, 246, 0.35)",
      "rgba(255, 101, 132, 0.35)"
    ];

    const particleCount = window.innerWidth < 768 ? 16 : 30;
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width || 800),
        y: Math.random() * (height || 500),
        r: Math.random() * 2 + 1.2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    function renderParticles() {
      if (!isHeroVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(36, 119, 255, ${0.1 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.9;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 100 && mDist > 0) {
          p.x += (mdx / mDist) * 1.2;
          p.y += (mdy / mDist) * 1.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(renderParticles);
    }

    // Only animate when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroVisible = entry.isIntersecting;
        if (isHeroVisible) {
          cancelAnimationFrame(animationFrameId);
          renderParticles();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      });
    }, { threshold: 0.05 });

    const heroSection = document.getElementById("home");
    if (heroSection) heroObserver.observe(heroSection);
  }
  initHeroCanvas();

  /* ==========================================================================
     13. Mouse Spotlight on Glass Cards
     ========================================================================== */
  function initSpotlight() {
    if (!isFinePointer || prefersReducedMotion) return;
    const spotlightCards = document.querySelectorAll(".card-spotlight");

    spotlightCards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }, { passive: true });
    });
  }
  initSpotlight();

  /* ==========================================================================
     14. 3D Tilt Cards
     ========================================================================== */
  function initTilt() {
    if (!isFinePointer || prefersReducedMotion) return;
    const tiltCards = document.querySelectorAll(".tilt-card");

    tiltCards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      });
    });
  }
  initTilt();

  /* ==========================================================================
     15. Button Click Ripples
     ========================================================================== */
  function initButtonRipples() {
    document.querySelectorAll(".btn").forEach(btn => {
      btn.addEventListener("click", function(e) {
        const rect = this.getBoundingClientRect();
        const circle = document.createElement("span");
        circle.classList.add("ripple-circle");
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        this.appendChild(circle);
        setTimeout(() => circle.remove(), 700);
      });
    });
  }
  initButtonRipples();

  /* ==========================================================================
     16. World Map Radar Ping & Country Card Interactive Linking
     ========================================================================== */
  function initWorldMapLinking() {
    const countryCards = document.querySelectorAll(".country-card[data-country]");
    const mapPings = document.querySelectorAll(".map-ping-point[data-country]");

    countryCards.forEach(card => {
      const code = card.getAttribute("data-country");
      const ping = document.querySelector(`.map-ping-point[data-country="${code}"]`);

      card.addEventListener("mouseenter", () => {
        if (ping) ping.classList.add("highlight");
      });
      card.addEventListener("mouseleave", () => {
        if (ping) ping.classList.remove("highlight");
      });
    });

    mapPings.forEach(ping => {
      const code = ping.getAttribute("data-country");
      const card = document.querySelector(`.country-card[data-country="${code}"]`);

      ping.addEventListener("mouseenter", () => {
        ping.classList.add("highlight");
        if (card) {
          card.style.borderColor = "var(--red)";
          card.style.transform = "translateY(-8px) scale(1.04)";
          card.style.boxShadow = "0 18px 36px rgba(255, 59, 53, 0.20)";
        }
      });
      ping.addEventListener("mouseleave", () => {
        ping.classList.remove("highlight");
        if (card) {
          card.style.borderColor = "";
          card.style.transform = "";
          card.style.boxShadow = "";
        }
      });
    });
  }
  initWorldMapLinking();

  /* ==========================================================================
     17. Dark Mode Controller with Fluid Transition
     ========================================================================== */
  function initThemeToggle() {
    const desktopToggle = document.getElementById("themeToggle");
    const mobileToggle = document.getElementById("mobileThemeToggle");
    const toggles = [desktopToggle, mobileToggle].filter(Boolean);
    const storageKey = "cling-theme";

    // Determine initial theme: localStorage -> system preference -> default light
    const savedTheme = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let currentTheme = savedTheme || (prefersDark ? "dark" : "light");

    function applyTheme(theme, animate = false) {
      if (animate && !prefersReducedMotion) {
        document.documentElement.classList.add("theme-in-transition");
      }

      document.documentElement.setAttribute("data-theme", theme);
      currentTheme = theme;
      localStorage.setItem(storageKey, theme);

      // Update button aria attributes
      const nextThemeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
      toggles.forEach(btn => {
        btn.setAttribute("aria-label", nextThemeLabel);
        btn.setAttribute("title", nextThemeLabel);
      });

      if (animate && !prefersReducedMotion) {
        setTimeout(() => {
          document.documentElement.classList.remove("theme-in-transition");
        }, 460);
      }
    }

    // Apply initially
    applyTheme(currentTheme, false);

    // Toggle click handler
    function handleToggleClick(btn) {
      const targetTheme = currentTheme === "dark" ? "light" : "dark";
      btn.classList.add("pulse-click");
      setTimeout(() => btn.classList.remove("pulse-click"), 460);
      applyTheme(targetTheme, true);
    }

    toggles.forEach(btn => {
      btn.addEventListener("click", () => handleToggleClick(btn));
    });

    // Listen to system changes if user hasn't explicitly set a preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem(storageKey)) {
        applyTheme(e.matches ? "dark" : "light", true);
      }
    });
  }
  initThemeToggle();

  // Initial trigger for scroll states
  updateScrollProgress();
  handleNavbarScroll();
});
