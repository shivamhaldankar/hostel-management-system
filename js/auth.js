/* ===========================
   AUTHENTICATION JAVASCRIPT
   =========================== */

const API_URL = 'php/';

// Toggle between login and register forms
function toggleForms() {
    const loginCard = document.getElementById('loginCard');
    const registerCard = document.getElementById('registerCard');
    
    if (!loginCard.classList.contains('hidden')) {
        loginCard.classList.add('hidden');
        registerCard.classList.remove('hidden');
    } else {
        loginCard.classList.remove('hidden');
        registerCard.classList.add('hidden');
    }
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    fetch(API_URL + 'auth.php?action=login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            showLoginError(data.message);
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        showLoginError('An error occurred. Please try again.');
    });
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showRegisterError('Passwords do not match');
        return;
    }
    
    // Validate password length
    if (password.length < 6) {
        showRegisterError('Password must be at least 6 characters long');
        return;
    }
    
    fetch(API_URL + 'auth.php?action=register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            showRegisterError(data.message);
        }
    })
    .catch(error => {
        console.error('Registration error:', error);
        showRegisterError('An error occurred. Please try again.');
    });
}

function showLoginError(message) {
    const errorEl = document.getElementById('loginError');
    errorEl.textContent = message;
    errorEl.classList.add('show');
}

function showRegisterError(message) {
    const errorEl = document.getElementById('registerError');
    errorEl.textContent = message;
    errorEl.classList.add('show');
}
