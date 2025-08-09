document.addEventListener('DOMContentLoaded', function() {
    // Scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Division cards interactivity
    const divisionToggles = document.querySelectorAll('.division-toggle');
    
    divisionToggles.forEach((toggle, index) => {
        const card = toggle.closest('.division-card');

        // Add hover effect
        if (card) {
            // Set initial transition properties
            card.style.transition = 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease';
            card.style.willChange = 'transform, border-color, box-shadow';
            
            // Initial styles to prevent frame flicker
            card.style.border = '1px solid transparent';
            card.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.05)';
            
            card.addEventListener('mouseenter', function() {
                requestAnimationFrame(() => {
                    this.style.transform = 'translateY(-2px)';
                    if (index === 0) {
                        this.style.borderColor = 'var(--reviz-green)';
                        this.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
                    } else {
                        this.style.borderColor = 'var(--reviz-blue)';
                        this.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                    }
                });
            });

            card.addEventListener('mouseleave', function() {
                requestAnimationFrame(() => {
                    this.style.transform = 'translateY(0)';
                    this.style.borderColor = 'transparent';
                    this.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.05)';
                });
            });
        }

        // Click interaction for expanding/collapsing
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const subdivisions = document.getElementById(targetId);
            const icon = this.querySelector('.fa-chevron-down');
            
            icon.classList.toggle('rotate-180');
            subdivisions.classList.toggle('active');
            
            if (subdivisions.classList.contains('active')) {
                subdivisions.style.display = 'grid';
                setTimeout(() => {
                    subdivisions.style.opacity = '1';
                    subdivisions.style.transform = 'translateY(0)';
                }, 0);
            } else {
                subdivisions.style.opacity = '0';
                subdivisions.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    subdivisions.style.display = 'none';
                }, 300);
            }
        });
    });
});
                subdivisions.style.opacity = '0';
                subdivisions.style.transform = 'translateY(-10px)';
                subdivisions.style.display = 'grid';
                
                // Trigger animation
                setTimeout(() => {
                    subdivisions.style.opacity = '1';
                    subdivisions.style.transform = 'translateY(0)';
                }, 10);
            } else {
                subdivisions.style.opacity = '0';
                subdivisions.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    subdivisions.style.display = 'none';
                }, 300);
            }
        });
    });
});