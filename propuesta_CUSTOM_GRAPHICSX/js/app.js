document.addEventListener('DOMContentLoaded', function() {

    /*=============== ELEMENT SELECTORS ===============*/
    const navMenu = document.getElementById('nav-menu'),
          navToggle = document.getElementById('nav-toggle'),
          navClose = document.getElementById('nav-close'),
          navLinks = document.querySelectorAll('.nav__link'),
          header = document.querySelector('.header'),
          mainContent = document.querySelector('main'),
          footerContent = document.querySelector('footer'),
          body = document.body;

    /*=============== MENU & BLUR/SCROLL LOCK LOGIC ===============*/
    const openMenu = () => {
        navMenu.classList.add('show-menu');
        body.classList.add('body--menu-open');
        mainContent.classList.add('content--blurred');
        footerContent.classList.add('content--blurred');
    };

    const closeMenu = () => {
        navMenu.classList.remove('show-menu');
        body.classList.remove('body--menu-open');
        mainContent.classList.remove('content--blurred');
        footerContent.classList.remove('content--blurred');
    };

    if (navToggle) {
        navToggle.addEventListener('click', openMenu);
    }

    if (navClose) {
        navClose.addEventListener('click', closeMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /*=============== CHANGE HEADER BACKGROUND ON SCROLL ===============*/
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /*=============== GALLERY FILTER ===============*/
    const filterButtons = document.querySelectorAll('.gallery__filter-btn');
    const galleryItems = document.querySelectorAll('.gallery__item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /*=============== FOOTER YEAR ===============*/
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    /*=============== SERVICES CAROUSEL ON HOVER ===============*/
    const carouselWrapper = document.querySelector('.services__carousel-wrapper');
    const carousel = document.querySelector('.services__grid');
    let scrollInterval = null;

    const startScrolling = (direction) => {
        if (scrollInterval) clearInterval(scrollInterval);
        scrollInterval = setInterval(() => {
            carousel.scrollLeft += (direction === 'right' ? 3 : -3);
        }, 15);
    };

    const stopScrolling = () => {
        clearInterval(scrollInterval);
        scrollInterval = null;
    };
    
    const handleMouseMove = (e) => {
        if (window.innerWidth > 992) {
            stopScrolling();
            return;
        }
        const rect = carouselWrapper.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const wrapperWidth = carouselWrapper.offsetWidth;
        const hotZoneWidth = wrapperWidth * 0.20;

        if (mouseX < hotZoneWidth) {
            if (!scrollInterval) startScrolling('left');
        } else if (mouseX > wrapperWidth - hotZoneWidth) {
            if (!scrollInterval) startScrolling('right');
        } else {
            stopScrolling();
        }
    };

    if (carouselWrapper && carousel) {
        carouselWrapper.addEventListener('mousemove', handleMouseMove);
        carouselWrapper.addEventListener('mouseleave', stopScrolling);
    }
});