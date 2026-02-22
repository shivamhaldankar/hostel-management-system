/* ===========================
   MAIN JAVASCRIPT - COMMON FUNCTIONS
   =========================== */

const API_URL = 'php/';

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadUserInfo();
    setupMenuToggle();
});

// Check authentication status
function checkAuth() {
    fetch(API_URL + 'auth.php?action=get_user')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'error' && !isLoginPage()) {
                window.location.href = 'index.html';
            }
        })
        .catch(error => console.error('Auth check failed:', error));
}

// Check if current page is login page
function isLoginPage() {
    return window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');
}

// Load user information and display it
function loadUserInfo() {
    fetch(API_URL + 'auth.php?action=get_user')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const userName = data.user.name.split(' ')[0]; // Get first name
                document.querySelectorAll('#userName').forEach(el => {
                    el.textContent = userName;
                });
                
                if (document.getElementById('userGreeting')) {
                    document.getElementById('userGreeting').textContent = 
                        `Welcome back, ${data.user.name}!`;
                }
            }
        })
        .catch(error => console.error('Error loading user info:', error));
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        fetch(API_URL + 'auth.php?action=logout', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    window.location.href = 'index.html';
                }
            })
            .catch(error => console.error('Logout failed:', error));
    }
}

// Setup mobile menu toggle
function setupMenuToggle() {
    const menuToggle = document.querySelector('.btn-menu-toggle');
    const navMenu = document.querySelector('.navbar-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
}

// Show error message
function showError(message, elementId) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
        setTimeout(() => {
            errorEl.classList.remove('show');
        }, 5000);
    }
}

// Show success message
function showSuccess(message, elementId) {
    const successEl = document.getElementById(elementId);
    if (successEl) {
        successEl.textContent = message;
        successEl.classList.add('show');
        setTimeout(() => {
            successEl.classList.remove('show');
        }, 5000);
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Get status badge HTML
function getStatusBadge(status) {
    let badgeClass = 'badge-info';
    let displayText = status;
    
    if (status === 'confirmed') {
        badgeClass = 'badge-success';
        displayText = 'Confirmed';
    } else if (status === 'pending') {
        badgeClass = 'badge-pending';
        displayText = 'Pending';
    } else if (status === 'cancelled' || status === 'failed') {
        badgeClass = 'badge-danger';
        displayText = status.charAt(0).toUpperCase() + status.slice(1);
    }
    
    return `<span class="badge ${badgeClass}">${displayText}</span>`;
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
});
