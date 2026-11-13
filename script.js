// ======================================
// ELEMENTS
// ======================================

const navbar =
    document.querySelector("#navbar");

const menuToggle =
    document.querySelector("#menuToggle");

const navLinks =
    document.querySelector("#navLinks");

const navItems =
    document.querySelectorAll(".nav-links a");

const sections =
    document.querySelectorAll("section[id]");

const revealSections =
    document.querySelectorAll(".reveal-section");

const backToTop =
    document.querySelector("#backToTop");

const scrollProgress =
    document.querySelector("#scrollProgress");


// ======================================
// NAVBAR SHADOW
// ======================================

function updateNavbar() {

    if (window.scrollY > 20) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}



// ======================================
// MOBILE MENU
// ======================================

menuToggle.addEventListener(
    "click",
    () => {

        const isOpen =
            navLinks.classList.toggle("open");

        menuToggle.classList.toggle(
            "open",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    }
);



// Close menu after clicking link

navItems.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navLinks.classList.remove("open");

            menuToggle.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );

});



// Close menu when clicking elsewhere

document.addEventListener(
    "click",
    event => {

        const clickedInsideNavbar =
            navbar.contains(event.target);

        if (
            !clickedInsideNavbar &&
            navLinks.classList.contains("open")
        ) {

            navLinks.classList.remove("open");

            menuToggle.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);



// ======================================
// ACTIVE NAVIGATION
// ======================================

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        if (
            window.scrollY >= sectionTop
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (
            target ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}



// ======================================
// SCROLL PROGRESS
// ======================================

function updateScrollProgress() {

    const scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

    scrollProgress.style.width =
        `${progress}%`;

}



// ======================================
// BACK TO TOP
// ======================================

function updateBackToTop() {

    if (window.scrollY > 600) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);



// ======================================
// SECTION REVEAL
// ======================================

const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target
                        .classList
                        .add("visible");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealSections.forEach(section => {

    observer.observe(section);

});



// ======================================
// PROJECT ARROW MICRO-INTERACTION
// ======================================

const projectLinks =
    document.querySelectorAll(
        ".text-link"
    );


projectLinks.forEach(link => {

    link.addEventListener(
        "mouseenter",
        () => {

            link.classList.add("hovered");

        }
    );


    link.addEventListener(
        "mouseleave",
        () => {

            link.classList.remove("hovered");

        }
    );

});



// ======================================
// MASTER SCROLL EVENT
// ======================================

window.addEventListener(
    "scroll",
    () => {

        updateNavbar();

        updateActiveNavigation();

        updateScrollProgress();

        updateBackToTop();

    },
    {
        passive: true
    }
);



// ======================================
// INITIAL LOAD
// ======================================

updateNavbar();

updateActiveNavigation();

updateScrollProgress();

updateBackToTop();