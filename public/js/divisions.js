document.addEventListener('DOMContentLoaded', () => {
    const divisionCards = document.querySelectorAll('.division-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.5
    });

    divisionCards.forEach((card, index) => {
        if (index % 2 === 0) {
            card.classList.add('left');
        } else {
            card.classList.add('right');
        }
        observer.observe(card);
    });
});
