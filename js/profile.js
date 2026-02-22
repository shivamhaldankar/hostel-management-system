/* ===========================
   PROFILE PAGE JAVASCRIPT
   =========================== */

const API_URL = 'php/';

document.addEventListener('DOMContentLoaded', function() {
    loadProfileData();
});

function loadProfileData() {
    fetch(API_URL + 'auth.php?action=get_user')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const user = data.user;
                
                // Update profile header
                document.getElementById('profileName').textContent = user.name;
                document.getElementById('profileEmail').textContent = user.email;
                document.getElementById('profileRole').textContent = 
                    user.role.charAt(0).toUpperCase() + user.role.slice(1);
                
                // Populate form fields
                document.getElementById('fullName').value = user.name;
                document.getElementById('email').value = user.email;
            }
        })
        .catch(error => console.error('Error loading profile:', error));
}

function updateProfile() {
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    
    if (!fullName) {
        showError('Please enter your full name', 'errorMessage');
        return;
    }
    
    // In a real system, this would send an update request to the server
    // For now, we'll just show a success message
    showSuccess('Profile updated successfully!', 'successMessage');
    
    // Update profile header
    document.getElementById('profileName').textContent = fullName;
}

function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
        showError('Please fill in all password fields', 'errorMessage');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showError('New passwords do not match', 'errorMessage');
        return;
    }
    
    if (newPassword.length < 6) {
        showError('New password must be at least 6 characters', 'errorMessage');
        return;
    }
    
    // In a real system, this would send a change password request to the server
    // For now, we'll just show a success message
    showSuccess('Password changed successfully!', 'successMessage');
    
    // Clear form
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

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
