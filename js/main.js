document.addEventListener('DOMContentLoaded', () => {
    // Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Hamburger menu
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    toggle?.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click
    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', false);
        });
    });

    // Intersection observer for section reveals
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
    });

    document.querySelectorAll('.section').forEach(s => observer.observe(s));

    // Stagger section children on reveal
    document.querySelectorAll('.section').forEach(section => {
        const children = section.querySelectorAll('.exp-item, .edu-item, .pub-item, .skill-group');
        children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 60}ms`;
            child.style.opacity = '0';
            child.style.transform = 'translateY(16px)';
            child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        const childObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                children.forEach(child => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                });
                childObserver.unobserve(section);
            }
        }, { threshold: 0.05 });

        childObserver.observe(section);
    });
});