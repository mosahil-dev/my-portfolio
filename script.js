document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. SMOOTH SCROLL
    ========================================= */

    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =========================================
       2. SCROLL REVEAL ANIMATION
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".about-heading, .about-text, .about-card, " +
        ".skills-heading, .skill-card, " +
        ".section-heading, .project-card, " +
        ".contact-heading, .contact-card, .contact-message"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =========================================
       3. STAGGER ANIMATION
    ========================================= */

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const skillCards = document.querySelectorAll(".skill-card");

    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.08}s`;
    });


    /* =========================================
       4. SKILL PROGRESS BAR ANIMATION
    ========================================= */

    const skillSection = document.querySelector("#skills");
    const skillBars = document.querySelectorAll(".skill-bar span");

    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {

                    skillBars.forEach((bar) => {
                        const finalWidth = bar.style.width;

                        bar.style.width = "0%";

                        setTimeout(() => {
                            bar.style.width = finalWidth;
                        }, 250);
                    });

                    skillObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    if (skillSection) {
        skillObserver.observe(skillSection);
    }


    /* =========================================
       5. ACTIVE NAVIGATION LINK
    ========================================= */

    const sections = document.querySelectorAll(
        "#home, #about, #skills, #projects, #contact"
    );

    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 160;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }
        });

    });


    /* =========================================
       6. NAVBAR SCROLL EFFECT
    ========================================= */

    const navbar =
        document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            navbar.classList.add("navbar-scrolled");

        } else {

            navbar.classList.remove(
                "navbar-scrolled"
            );

        }

    });


    /* =========================================
       7. BACK TO TOP BUTTON
    ========================================= */

    const backToTop =
        document.createElement("button");

    backToTop.className =
        "back-to-top";

    backToTop.innerHTML = "↑";

    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(backToTop);


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =========================================
       8. LIVE DATA DOT PULSE
    ========================================= */

    const liveDot =
        document.querySelector(".live-dot");

    if (liveDot) {

        liveDot.animate(
            [
                {
                    transform: "scale(1)",
                    opacity: 1
                },
                {
                    transform: "scale(1.6)",
                    opacity: 0.45
                },
                {
                    transform: "scale(1)",
                    opacity: 1
                }
            ],
            {
                duration: 1600,
                iterations: Infinity
            }
        );

    }


    /* =========================================
       9. DATA CARD FLOAT EFFECT
    ========================================= */

    const dataCard =
        document.querySelector(".data-card");

    if (dataCard) {

        dataCard.animate(
            [
                {
                    transform:
                        "translateY(0px)"
                },
                {
                    transform:
                        "translateY(-10px)"
                },
                {
                    transform:
                        "translateY(0px)"
                }
            ],
            {
                duration: 4000,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );

    }


    /* =========================================
       10. CARD HOVER TILT
    ========================================= */

    projectCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) / 25;

                const rotateY =
                    (centerX - x) / 25;

                card.style.transform =
                    `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });

});
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".project-gallery").forEach((gallery) => {

        const mainImage =
            gallery.querySelector(".gallery-main-image");

        const thumbnails =
            gallery.querySelectorAll(".thumbnail");

        if (!mainImage || thumbnails.length === 0) return;

        thumbnails.forEach((thumbnail) => {

            thumbnail.addEventListener("click", () => {

                const thumbnailImage =
                    thumbnail.querySelector("img");

                if (!thumbnailImage) return;

                mainImage.src = thumbnailImage.src;
                mainImage.alt = thumbnailImage.alt;

                thumbnails.forEach((item) => {
                    item.classList.remove("active");
                });

                thumbnail.classList.add("active");

            });

        });

    });

});