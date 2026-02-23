// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    setupFAQ();
    setupFormValidation();
});

// Setup event listeners
function setupEventListeners() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }
}

// Setup FAQ functionality
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });
}

// Setup form validation
function setupFormValidation() {
    const inputs = document.querySelectorAll('#contactForm input[required], #contactForm select[required], #contactForm textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// Validate field
function validateField(field) {
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    removeFieldError(field);
    
    // Check if field is empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(field.value) || field.value.replace(/\D/g, '').length < 10) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Order number validation
    if (field.id === 'orderNumber' && field.value) {
        const orderRegex = /^ORD-\d{6}$/;
        if (!orderRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid order number (format: ORD-XXXXXX)';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

// Remove field error
function removeFieldError(field) {
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Handle contact form submission
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    // Validate all required fields
    const requiredFields = document.querySelectorAll('#contactForm input[required], #contactForm select[required], #contactForm textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Please correct the errors in the form', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(e.target);
    const contactData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        orderNumber: formData.get('orderNumber'),
        message: formData.get('message'),
        urgent: formData.get('urgent') === 'on',
        timestamp: new Date().toISOString()
    };
    
    // Simulate form submission
    setTimeout(() => {
        // Save contact message to localStorage (in real app, this would be sent to server)
        const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        contactMessages.push(contactData);
        localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
        
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        e.target.reset();
        
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Send confirmation email (simulation)
        sendConfirmationEmail(contactData);
        
    }, 2000);
}

// Send confirmation email (simulation)
function sendConfirmationEmail(contactData) {
    // In a real application, this would send an actual email
    console.log('Confirmation email sent to:', contactData.email);
    console.log('Message details:', contactData);
    
    // Store confirmation for admin dashboard
    const confirmations = JSON.parse(localStorage.getItem('emailConfirmations') || '[]');
    confirmations.push({
        to: contactData.email,
        subject: `Confirmation: Your message to StyleHub Support`,
        timestamp: new Date().toISOString(),
        message: `Thank you for contacting StyleHub, ${contactData.firstName}! We have received your message regarding "${contactData.subject}" and will respond within 24 hours.`
    });
    localStorage.setItem('emailConfirmations', JSON.stringify(confirmations));
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `${type}-message`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add slide out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// Auto-expand FAQ based on URL hash
function expandFAQFromHash() {
    const hash = window.location.hash;
    if (hash.startsWith('#faq-')) {
        const faqId = hash.substring(5);
        const faqItem = document.querySelector(`[data-faq-id="${faqId}"]`);
        if (faqItem) {
            faqItem.classList.add('active');
            faqItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Initialize FAQ hash expansion
expandFAQFromHash();

// Track contact form analytics
function trackContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Track form field interactions
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        field.addEventListener('focus', function() {
            // Track field focus (for analytics)
            console.log('Field focused:', field.name);
        });
    });
    
    // Track form abandonment
    let formStarted = false;
    
    fields.forEach(field => {
        field.addEventListener('input', function() {
            if (!formStarted) {
                formStarted = true;
                console.log('Contact form started');
            }
        });
    });
    
    // Track if user leaves page without submitting
    window.addEventListener('beforeunload', function(e) {
        if (formStarted && !form.dataset.submitted) {
            console.log('Contact form abandoned');
            // In real app, this would send analytics data
        }
    });
}

// Initialize contact form tracking
trackContactForm();

// Add keyboard navigation for FAQ
function setupFAQKeyboardNavigation() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', `faq-answer-${index}`);
        
        const answer = item.querySelector('.faq-answer');
        answer.id = `faq-answer-${index}`;
        
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Update ARIA attributes when toggled
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isActive = item.classList.contains('active');
                    question.setAttribute('aria-expanded', isActive);
                }
            });
        });
        
        observer.observe(item, { attributes: true });
    });
}

// Setup FAQ keyboard navigation
setupFAQKeyboardNavigation();

// Add smooth scroll behavior for internal links
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup smooth scroll
setupSmoothScroll();

// Add live chat functionality (simulation)
function setupLiveChat() {
    const liveChatBtn = document.querySelector('.channel-btn[href="#live-chat"]');
    if (!liveChatBtn) return;
    
    liveChatBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Simulate live chat opening
        showNotification('Live chat is opening... This feature is coming soon!', 'info');
        
        // In real app, this would open a live chat widget
        console.log('Live chat initiated');
    });
}

// Setup live chat
setupLiveChat();

// Add social media chat functionality
function setupSocialChat() {
    const socialLinks = document.querySelectorAll('.channel-btn');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                showNotification('Social media chat integration coming soon!', 'info');
            }
        });
    });
}

// Setup social chat
setupSocialChat();
