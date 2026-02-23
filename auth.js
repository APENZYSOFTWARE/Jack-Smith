// Authentication JavaScript
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null;
let verificationCode = '';
let verificationTimer = null;
let timerSeconds = 60;
let pendingUser = null;

// Initialize auth page
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    // Load sample users for demo
    loadSampleUsers();
});

// Load sample users for demonstration
function loadSampleUsers() {
    if (users.length === 0) {
        users = [
            {
                id: 1,
                name: 'Demo User',
                email: 'demo@stylehub.ng',
                phone: '+234 808-6224-0288',
                password: 'demo123',
                verified: true,
                createdAt: new Date().toISOString(),
                orders: [],
                wishlist: []
            }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Phone validation
function validatePhone(input) {
    const phone = input.value;
    const phoneError = document.getElementById('phoneError');
    const phoneRegex = /^\+234[0-9]{10}$/;
    
    if (!phoneRegex.test(phone)) {
        phoneError.textContent = 'Please enter a valid Nigerian phone number (+234 XXX XXX XXXX)';
        input.style.borderColor = '#dc3545';
        return false;
    } else {
        phoneError.textContent = '';
        input.style.borderColor = '#28a745';
        return true;
    }
}

// Password strength checker
function checkPasswordStrength(password) {
    const strengthDiv = document.getElementById('passwordStrength');
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    
    let strengthClass = '';
    let strengthText = '';
    
    if (strength <= 2) {
        strengthClass = 'strength-weak';
        strengthText = 'Weak';
    } else if (strength <= 4) {
        strengthClass = 'strength-medium';
        strengthText = 'Medium';
    } else {
        strengthClass = 'strength-strong';
        strengthText = 'Strong';
    }
    
    strengthDiv.innerHTML = `<div class="password-strength-bar ${strengthClass}"></div>`;
    return strength;
}

// Switch between login and register tabs
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    // Remove active class from all forms and buttons
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected tab
    if (tab === 'login') {
        loginForm.classList.add('active');
        tabButtons[0].classList.add('active');
    } else {
        registerForm.classList.add('active');
        tabButtons[1].classList.add('active');
    }
    
    // Clear any existing messages
    clearMessages();
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Clear previous messages
    clearMessages();
    
    // Validate input
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login successful
        currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt
        };
        
        // Store user session
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Remember me functionality
        if (rememberMe) {
            localStorage.setItem('rememberedUser', email);
        } else {
            localStorage.removeItem('rememberedUser');
        }
        
        showMessage('Login successful! Redirecting...', 'success');
        
        // Redirect to main site
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        
    } else {
        showMessage('Invalid email or password', 'error');
    }
}

// Handle registration with phone verification
function handleRegister(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    const referralCode = document.getElementById('referralCode').value;
    
    // Clear previous messages
    clearMessages();
    
    // Validate input
    if (!fullName || !email || !phone || !password || !confirmPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!validatePhone(document.getElementById('registerPhone'))) {
        showMessage('Please enter a valid Nigerian phone number', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    if (checkPasswordStrength(password) < 3) {
        showMessage('Password is too weak. Please include uppercase, lowercase, numbers, and special characters', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showMessage('Please agree to the terms and conditions', 'error');
        return;
    }
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        showMessage('An account with this email already exists', 'error');
        return;
    }
    
    if (users.find(u => u.phone === phone)) {
        showMessage('An account with this phone number already exists', 'error');
        return;
    }
    
    // Store pending user data
    pendingUser = {
        id: Date.now(),
        name: fullName,
        email: email,
        phone: phone,
        password: password,
        referralCode: referralCode,
        createdAt: new Date().toISOString(),
        orders: [],
        wishlist: [],
        addresses: [],
        paymentMethods: [],
        verified: false
    };
    
    // Send verification code
    sendVerificationCode(phone);
}

// Send verification code
function sendVerificationCode(phone) {
    // Generate 6-digit code
    verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store code in session (in real app, this would be sent via SMS)
    sessionStorage.setItem('verificationCode', verificationCode);
    sessionStorage.setItem('verificationPhone', phone);
    
    // Show verification modal
    document.getElementById('verificationPhone').textContent = phone;
    document.getElementById('verificationModal').style.display = 'flex';
    
    // Start timer
    startVerificationTimer();
    
    // For demo, show the code in console
    console.log('Verification Code:', verificationCode);
    showMessage(`Verification code sent to ${phone}. Check console for demo code.`, 'info');
}

// Start verification timer
function startVerificationTimer() {
    timerSeconds = 60;
    const timerElement = document.getElementById('timer');
    const resendBtn = document.querySelector('.resend-btn');
    
    resendBtn.disabled = true;
    
    verificationTimer = setInterval(() => {
        timerSeconds--;
        timerElement.textContent = timerSeconds;
        
        if (timerSeconds <= 0) {
            clearInterval(verificationTimer);
            resendBtn.disabled = false;
            timerElement.textContent = '0';
        }
    }, 1000);
}

// Move to next input
function moveToNext(input, index) {
    const inputs = document.querySelectorAll('.code-input');
    
    if (input.value.length === 1) {
        input.classList.add('filled');
        if (index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    } else {
        input.classList.remove('filled');
    }
    
    // Auto-verify when all inputs are filled
    const allFilled = Array.from(inputs).every(inp => inp.value.length === 1);
    if (allFilled) {
        setTimeout(verifyCode, 500);
    }
}

// Verify code
function verifyCode() {
    const inputs = document.querySelectorAll('.code-input');
    const enteredCode = Array.from(inputs).map(input => input.value).join('');
    const storedCode = sessionStorage.getItem('verificationCode');
    
    if (enteredCode === storedCode) {
        // Code verified, complete registration
        completeRegistration();
    } else {
        showMessage('Invalid verification code', 'error');
        // Clear inputs
        inputs.forEach(input => {
            input.value = '';
            input.classList.remove('filled');
        });
        inputs[0].focus();
    }
}

// Complete registration
function completeRegistration() {
    if (!pendingUser) return;
    
    // Mark as verified
    pendingUser.verified = true;
    
    // Add to users array
    users.push(pendingUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Clear pending user
    pendingUser = null;
    
    // Close modal
    closeVerificationModal();
    
    showMessage('Registration successful! Please login...', 'success');
    
    // Switch to login tab
    setTimeout(() => {
        switchTab('login');
        // Pre-fill email
        document.getElementById('loginEmail').value = users[users.length - 1].email;
    }, 1500);
}

// Resend verification code
function resendVerificationCode() {
    const phone = sessionStorage.getItem('verificationPhone');
    if (phone) {
        sendVerificationCode(phone);
        showMessage('Verification code resent', 'success');
    }
}

// Close verification modal
function closeVerificationModal() {
    document.getElementById('verificationModal').style.display = 'none';
    
    // Clear timer
    if (verificationTimer) {
        clearInterval(verificationTimer);
    }
    
    // Clear inputs
    document.querySelectorAll('.code-input').forEach(input => {
        input.value = '';
        input.classList.remove('filled');
    });
    
    // Clear session
    sessionStorage.removeItem('verificationCode');
    sessionStorage.removeItem('verificationPhone');
}

// Show message
function showMessage(text, type) {
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Insert at the top of the active form
    const activeForm = document.querySelector('.auth-form.active');
    activeForm.insertBefore(message, activeForm.firstChild);
}

// Clear messages
function clearMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(msg => msg.remove());
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    
    return strength;
}

// Format phone number
function formatPhoneNumber(input) {
    let value = input.value.replace(/\s+/g, '');
    
    // Add +234 if not present
    if (!value.startsWith('+234') && value.length > 0) {
        value = '+234 ' + value;
    }
    
    input.value = value;
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Forgot password functionality
function forgotPassword() {
    const email = prompt('Enter your email address:');
    
    if (email && validateEmail(email)) {
        const user = users.find(u => u.email === email);
        
        if (user) {
            showMessage(`Password reset link sent to ${email}`, 'success');
            // In a real app, this would send an email
            console.log(`Password for ${email}: ${user.password}`);
        } else {
            showMessage('No account found with this email', 'error');
        }
    } else {
        showMessage('Please enter a valid email address', 'error');
    }
}

// Logout function (can be called from any page)
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('rememberedUser');
        window.location.href = 'login.html';
    }
}

// Check authentication on page load
function checkAuth() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return false;
    }
    
    return currentUser;
}

// Get current user
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}

// Update UI with user info
function updateAuthUI() {
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        // Update user display elements
        const userDisplayElements = document.querySelectorAll('.user-display');
        userDisplayElements.forEach(el => {
            el.textContent = currentUser.name;
        });
        
        // Update user avatar if exists
        const userAvatarElements = document.querySelectorAll('.user-avatar');
        userAvatarElements.forEach(el => {
            el.src = currentUser.avatar || `https://picsum.photos/seed/user-${currentUser.id}/100/100.jpg`;
        });
        
        // Show/hide auth-related elements
        const loginElements = document.querySelectorAll('.login-required');
        const logoutElements = document.querySelectorAll('.logout-required');
        
        loginElements.forEach(el => el.style.display = 'none');
        logoutElements.forEach(el => el.style.display = 'block');
    }
}

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname !== '/login.html') {
        updateAuthUI();
    }
});
