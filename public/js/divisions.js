document.addEventListener('DOMContentLoaded', function() {
    const toggles = document.querySelectorAll('.division-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById(this.dataset.target);
            if (target) {
                target.classList.toggle('hidden');
            }
        });
    });
});
