// Toggle between subscribe and login tabs
function showAuthTab(tab) {
    const subscribeContent = document.getElementById('subscribe-content');
    const loginContent = document.getElementById('login-content');
    const authTabs = document.querySelectorAll('.auth-tab');

    authTabs.forEach(tabElement => {
        tabElement.classList.remove('active', 'text-revizBlue', 'bg-white');
        tabElement.classList.add('text-gray-500', 'bg-gray-50');
    });

    if (tab === 'subscribe') {
        subscribeContent.classList.remove('hidden');
        loginContent.classList.add('hidden');
        document.querySelector('.auth-tab:first-child').classList.add('active', 'text-revizBlue', 'bg-white');
        document.querySelector('.auth-tab:first-child').classList.remove('text-gray-500', 'bg-gray-50');
        subscribeContent.classList.add('fade-in');
        loginContent.classList.remove('fade-in'); // Ensure other tab animation is reset
    } else {
        loginContent.classList.remove('hidden');
        subscribeContent.classList.add('hidden');
        document.querySelector('.auth-tab:last-child').classList.add('active', 'text-revizBlue', 'bg-white');
        document.querySelector('.auth-tab:last-child').classList.remove('text-gray-500', 'bg-gray-50');
        loginContent.classList.add('fade-in');
        subscribeContent.classList.remove('fade-in'); // Ensure other tab animation is reset
    }
}

// Check URL hash on page load
window.addEventListener('load', function() {
    if (window.location.hash === '#login') {
        showAuthTab('login');
    } else {
        showAuthTab('subscribe');
    }
});

// FAQ toggle functionality
document.querySelectorAll('.faq-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');

        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            content.classList.add('hidden');
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });
});

// Form submission
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // You'll likely want to replace these alerts with actual form submission logic
        // (e.g., fetch API calls to a backend).
        if (this.id === 'login-form') { // Add id="login-form" to your login form in HTML
            alert('Login successful! Redirecting to your dashboard...');
        } else {
            alert('Thank you for subscribing! Your account has been created.');
        }

        // Reset form
        this.reset();
    });
});