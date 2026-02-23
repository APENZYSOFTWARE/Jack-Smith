// Checkout functionality
let checkoutData = null;
let cart = [];

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    loadCheckoutData();
    loadCart();
    displayOrderItems();
    updateOrderSummary();
    setupEventListeners();
    setupFormValidation();
});

// Load checkout data from session storage
function loadCheckoutData() {
    const savedData = sessionStorage.getItem('checkoutData');
    if (savedData) {
        checkoutData = JSON.parse(savedData);
    } else {
        // Redirect to cart if no checkout data
        window.location.href = 'cart.html';
    }
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartCount();
}

// Display order items
function displayOrderItems() {
    const orderItemsContainer = document.getElementById('orderItems');
    if (!orderItemsContainer || !checkoutData) return;
    
    orderItemsContainer.innerHTML = '';
    checkoutData.cart.forEach(item => {
        const orderItem = createOrderItemElement(item);
        orderItemsContainer.appendChild(orderItem);
    });
}

// Create order item element
function createOrderItemElement(item) {
    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    
    orderItem.innerHTML = `
        <div class="order-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="order-item-details">
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-quantity">Qty: ${item.quantity}</div>
        </div>
        <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
    `;
    
    return orderItem;
}

// Update order summary
function updateOrderSummary() {
    if (!checkoutData) return;
    
    updateSummaryElement('subtotal', checkoutData.subtotal);
    updateSummaryElement('shipping', checkoutData.shipping);
    updateSummaryElement('tax', checkoutData.tax);
    updateSummaryElement('total', checkoutData.total);
    
    // Show discount if applied
    if (checkoutData.discount > 0) {
        const discountRow = document.getElementById('discountRow');
        const discountElement = document.getElementById('discount');
        if (discountRow && discountElement) {
            discountRow.style.display = 'flex';
            discountElement.textContent = `-$${checkoutData.discount.toFixed(2)}`;
        }
    }
}

// Update summary element
function updateSummaryElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = `$${value.toFixed(2)}`;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Payment method change
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            togglePaymentMethod(this.value);
        });
    });
    
    // Shipping method change
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    shippingRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateShippingCost(this.value);
        });
    });
    
    // Form submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', formatCardNumber);
    }
    
    // Expiry date formatting
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', formatExpiryDate);
    }
    
    // CVV validation
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', validateCVV);
    }
}

// Toggle payment method
function togglePaymentMethod(method) {
    const cardDetails = document.getElementById('cardDetails');
    const paypalDetails = document.getElementById('paypalDetails');
    const mobileMoneyDetails = document.getElementById('mobileMoneyDetails');
    
    // Hide all payment details
    cardDetails.style.display = 'none';
    paypalDetails.style.display = 'none';
    mobileMoneyDetails.style.display = 'none';
    
    // Show selected payment method details
    switch(method) {
        case 'card':
            cardDetails.style.display = 'block';
            break;
        case 'paypal':
            paypalDetails.style.display = 'block';
            break;
        case 'mobile':
            mobileMoneyDetails.style.display = 'block';
            break;
    }
}

// Update shipping cost
function updateShippingCost(method) {
    let shippingCost = 0;
    
    switch(method) {
        case 'standard':
            shippingCost = 9.99;
            break;
        case 'express':
            shippingCost = 19.99;
            break;
        case 'overnight':
            shippingCost = 29.99;
            break;
    }
    
    // Update checkout data
    if (checkoutData) {
        checkoutData.shipping = shippingCost;
        checkoutData.total = checkoutData.subtotal + shippingCost + checkoutData.tax - checkoutData.discount;
        updateOrderSummary();
    }
}

// Setup form validation
function setupFormValidation() {
    const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
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
    
    // ZIP code validation
    if (field.id === 'zipCode' && field.value) {
        const zipRegex = /^\d{5}(-\d{4})?$/;
        if (!zipRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid ZIP code';
        }
    }
    
    // Card number validation
    if (field.id === 'cardNumber' && field.value) {
        const cardNumber = field.value.replace(/\s/g, '');
        if (cardNumber.length < 13 || cardNumber.length > 19) {
            isValid = false;
            errorMessage = 'Please enter a valid card number';
        }
    }
    
    // Expiry date validation
    if (field.id === 'expiryDate' && field.value) {
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid expiry date (MM/YY)';
        } else {
            // Check if date is in the future
            const [month, year] = field.value.split('/');
            const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
            const today = new Date();
            if (expiryDate <= today) {
                isValid = false;
                errorMessage = 'Card has expired';
            }
        }
    }
    
    // CVV validation
    if (field.id === 'cvv' && field.value) {
        const cvvRegex = /^\d{3,4}$/;
        if (!cvvRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid CVV';
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

// Format card number
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    
    e.target.value = formattedValue;
}

// Format expiry date
function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    e.target.value = value;
}

// Validate CVV
function validateCVV(e) {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate all required fields
    const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Validate payment method specific fields
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
    
    if (paymentMethod === 'card') {
        const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
        cardFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !validateField(field)) {
                isValid = false;
            }
        });
    } else if (paymentMethod === 'mobile') {
        const mobileFields = ['mobileProvider', 'mobileNumber'];
        mobileFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !validateField(field)) {
                isValid = false;
            }
        });
    }
    
    if (!isValid) {
        showNotification('Please correct the errors in the form', 'error');
        return;
    }
    
    // Process order
    processOrder();
}

// Process order
function processOrder() {
    // Show loading state
    const submitBtn = document.querySelector('.place-order-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(document.getElementById('checkoutForm'));
    const orderData = {
        customer: {
            email: formData.get('email'),
            phone: formData.get('phone'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zipCode: formData.get('zipCode'),
            country: formData.get('country')
        },
        shipping: formData.get('shipping'),
        payment: formData.get('payment'),
        orderNotes: formData.get('orderNotes'),
        items: checkoutData.cart,
        totals: {
            subtotal: checkoutData.subtotal,
            shipping: checkoutData.shipping,
            tax: checkoutData.tax,
            discount: checkoutData.discount,
            total: checkoutData.total
        },
        orderDate: new Date().toISOString(),
        orderId: generateOrderId()
    };
    
    // Add payment method specific data
    if (formData.get('payment') === 'card') {
        orderData.paymentDetails = {
            cardNumber: formData.get('cardNumber'),
            expiryDate: formData.get('expiryDate'),
            cardName: formData.get('cardName')
        };
    } else if (formData.get('payment') === 'mobile') {
        orderData.paymentDetails = {
            provider: formData.get('mobileProvider'),
            mobileNumber: formData.get('mobileNumber')
        };
    }
    
    // Simulate order processing
    setTimeout(() => {
        // Save order to localStorage (in real app, this would be sent to server)
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart
        localStorage.removeItem('cart');
        sessionStorage.removeItem('checkoutData');
        
        // Show success message
        showNotification('Order placed successfully!', 'success');
        
        // Redirect to confirmation page
        setTimeout(() => {
            window.location.href = `order-confirmation.html?orderId=${orderData.orderId}`;
        }, 1500);
        
    }, 2000);
}

// Generate order ID
function generateOrderId() {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${timestamp.slice(-6)}${random}`;
}

// Go back to cart
function goBack() {
    window.location.href = 'cart.html';
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `${type}-message`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Search functionality
function setupSearch() {
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

// Initialize search
setupSearch();
