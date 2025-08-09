// Highlight active TOC item on scroll
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            if (entry.isIntersecting) {
                document.querySelectorAll('.toc-item').forEach(item => {
                    item.classList.remove('active');
                });
                const activeTocItem = document.querySelector(`.toc-item a[href="#${id}"]`);
                if (activeTocItem) {
                    activeTocItem.parentElement.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all headings that have an ID
    document.querySelectorAll('h2[id], h3[id]').forEach((section) => {
        observer.observe(section);
    });
    
    // Animation for scroll reveal
    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
        contentObserver.observe(section);
    });
});