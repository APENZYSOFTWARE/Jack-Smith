// Cart functionality
let cart = [];
let promoCodeApplied = null;
let discountPercentage = 0;

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    displayCartItems();
    updateOrderSummary();
    loadRelatedProducts();
    setupEventListeners();
});

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartCount();
}

// Display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <a href="products.html" class="shop-now-btn">Shop Now</a>
            </div>
        `;
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItemElement = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItemElement);
    });
}

// Create cart item element
function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.itemId = item.id;
    
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
            <h3 class="cart-item-name">${item.name}</h3>
            <div class="cart-item-variant">
                Size: ${item.selectedSize || 'M'} | Color: ${item.selectedColor || 'Black'}
            </div>
            <div class="cart-item-price">
                <span class="item-current-price">$${item.price}</span>
                <span class="item-original-price">$${item.originalPrice}</span>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="quantity-input" value="${item.quantity}" 
                           min="1" max="10" onchange="setQuantity(${item.id}, this.value)">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
        <div class="cart-item-actions">
            <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `;
    
    return cartItem;
}

// Update quantity
function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity >= 1 && newQuantity <= 10) {
            item.quantity = newQuantity;
            saveCart();
            refreshCart();
        }
    }
}

// Set quantity directly
function setQuantity(itemId, value) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        const quantity = parseInt(value);
        if (quantity >= 1 && quantity <= 10) {
            item.quantity = quantity;
            saveCart();
            refreshCart();
        }
    }
}

// Remove from cart
function removeFromCart(itemId) {
    const cartItem = document.querySelector(`[data-item-id="${itemId}"]`);
    if (cartItem) {
        cartItem.classList.add('removing');
        setTimeout(() => {
            cart = cart.filter(item => item.id !== itemId);
            saveCart();
            refreshCart();
            showNotification('Item removed from cart');
        }, 300);
    }
}

// Clear cart
function clearCart() {
    if (confirm('Are you sure you want to clear your entire cart?')) {
        cart = [];
        saveCart();
        refreshCart();
        showNotification('Cart cleared');
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Refresh cart display
function refreshCart() {
    displayCartItems();
    updateOrderSummary();
}

// Update order summary
function updateOrderSummary() {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping(subtotal);
    const tax = calculateTax(subtotal);
    const discount = calculateDiscount(subtotal);
    const total = subtotal + shipping + tax - discount;
    
    // Update desktop summary
    updateSummaryElement('subtotal', subtotal);
    updateSummaryElement('shipping', shipping);
    updateSummaryElement('tax', tax);
    updateSummaryElement('total', total);
    
    // Update mobile summary
    updateSummaryElement('mobileSubtotal', subtotal);
    updateSummaryElement('mobileShipping', shipping);
    updateSummaryElement('mobileTax', tax);
    updateSummaryElement('mobileTotal', total);
    
    // Show discount if applied
    if (discount > 0) {
        showDiscountRow(discount);
    }
}

// Update summary element
function updateSummaryElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = `$${value.toFixed(2)}`;
    }
}

// Calculate subtotal
function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Calculate shipping
function calculateShipping(subtotal) {
    if (subtotal >= 50) {
        return 0; // Free shipping for orders over $50
    }
    return 9.99; // Standard shipping
}

// Calculate tax
function calculateTax(subtotal) {
    const taxRate = 0.08; // 8% tax rate
    return subtotal * taxRate;
}

// Calculate discount
function calculateDiscount(subtotal) {
    if (promoCodeApplied && discountPercentage > 0) {
        return subtotal * (discountPercentage / 100);
    }
    return 0;
}

// Show discount row
function showDiscountRow(discount) {
    const summaryContent = document.querySelector('.summary-content');
    if (!summaryContent) return;
    
    // Remove existing discount row if any
    const existingDiscountRow = summaryContent.querySelector('.discount-row');
    if (existingDiscountRow) {
        existingDiscountRow.remove();
    }
    
    // Add discount row
    const discountRow = document.createElement('div');
    discountRow.className = 'summary-row discount-row';
    discountRow.style.color = '#28a745';
    discountRow.innerHTML = `
        <span>Discount (${promoCodeApplied})</span>
        <span>-$${discount.toFixed(2)}</span>
    `;
    
    // Insert before divider
    const divider = summaryContent.querySelector('.summary-divider');
    if (divider) {
        summaryContent.insertBefore(discountRow, divider);
    }
}

// Apply promo code
function applyPromoCode() {
    const promoInput = document.getElementById('promoCode');
    const code = promoInput.value.trim().toUpperCase();
    
    if (!code) {
        showNotification('Please enter a promo code', 'error');
        return;
    }
    
    // Check if promo code is valid
    const validPromoCodes = {
        'SAVE10': 10,
        'SAVE20': 20,
        'WELCOME': 15,
        'SUMMER': 25
    };
    
    if (validPromoCodes[code]) {
        promoCodeApplied = code;
        discountPercentage = validPromoCodes[code];
        updateOrderSummary();
        showNotification(`Promo code ${code} applied! You saved ${discountPercentage}%`, 'success');
        promoInput.value = '';
    } else {
        showNotification('Invalid promo code', 'error');
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    // Save cart data to session storage for checkout page
    sessionStorage.setItem('checkoutData', JSON.stringify({
        cart: cart,
        subtotal: calculateSubtotal(),
        shipping: calculateShipping(calculateSubtotal()),
        tax: calculateTax(calculateSubtotal()),
        discount: calculateDiscount(calculateSubtotal()),
        total: calculateSubtotal() + calculateShipping(calculateSubtotal()) + calculateTax(calculateSubtotal()) - calculateDiscount(calculateSubtotal()),
        promoCode: promoCodeApplied,
        discountPercentage: discountPercentage
    }));
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Load related products
function loadRelatedProducts() {
    const relatedProductsContainer = document.getElementById('relatedProducts');
    if (!relatedProductsContainer) return;
    
    // Sample related products (in real app, this would be based on cart items)
    const relatedProducts = [
        {
            id: 101,
            name: "Classic Polo Shirt",
            price: 39.99,
            originalPrice: 59.99,
            image: "https://picsum.photos/seed/polo1/300/300.jpg",
            rating: 4.5,
            reviews: 89,
            badge: "Popular"
        },
        {
            id: 102,
            name: "Elegant Handbag",
            price: 89.99,
            originalPrice: 139.99,
            image: "https://picsum.photos/seed/handbag1/300/300.jpg",
            rating: 4.7,
            reviews: 156,
            badge: "Trending"
        },
        {
            id: 103,
            name: "Sports Shoes",
            price: 79.99,
            originalPrice: 119.99,
            image: "https://picsum.photos/seed/sports1/300/300.jpg",
            rating: 4.4,
            reviews: 203,
            badge: "Sport"
        },
        {
            id: 104,
            name: "Fashion Watch",
            price: 129.99,
            originalPrice: 199.99,
            image: "https://picsum.photos/seed/fashion1/300/300.jpg",
            rating: 4.6,
            reviews: 67,
            badge: "New"
        }
    ];
    
    relatedProductsContainer.innerHTML = '';
    relatedProducts.forEach(product => {
        const productCard = createRelatedProductCard(product);
        relatedProductsContainer.appendChild(productCard);
    });
}

// Create related product card
function createRelatedProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <span class="product-badge">${product.badge}</span>
            <div class="product-actions">
                <button class="action-btn" onclick="addToWishlist(${product.id})" title="Add to Wishlist">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="action-btn" onclick="quickView(${product.id})" title="Quick View">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">
                <span class="current-price">$${product.price}</span>
                <span class="original-price">$${product.originalPrice}</span>
            </div>
            <div class="product-rating">
                <div class="stars">${generateStars(product.rating)}</div>
                <span class="rating-count">(${product.reviews})</span>
            </div>
            <button class="add-to-cart" onclick="addRelatedProductToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Add related product to cart
function addRelatedProductToCart(productId) {
    // In a real app, this would fetch product details from API
    const relatedProduct = {
        id: productId,
        name: "Related Product",
        price: 49.99,
        originalPrice: 79.99,
        image: `https://picsum.photos/seed/product${productId}/300/300.jpg`,
        quantity: 1
    };
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(relatedProduct);
    }
    
    saveCart();
    refreshCart();
    showNotification('Product added to cart!');
}

// Setup event listeners
function setupEventListeners() {
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

// Utility functions
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

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

function addToWishlist(productId) {
    // Placeholder for wishlist functionality
    showNotification('Product added to wishlist!');
}

function quickView(productId) {
    // Placeholder for quick view functionality
    showNotification('Quick view coming soon!');
}
