// Sample product data
const products = [
    {
        id: 1,
        name: "Premium Cotton T-Shirt",
        category: "men",
        price: 29.99,
        originalPrice: 49.99,
        image: "https://picsum.photos/seed/tshirt1/300/300.jpg",
        rating: 4.5,
        reviews: 128,
        badge: "Sale"
    },
    {
        id: 2,
        name: "Elegant Summer Dress",
        category: "women",
        price: 79.99,
        originalPrice: 129.99,
        image: "https://picsum.photos/seed/dress1/300/300.jpg",
        rating: 4.8,
        reviews: 89,
        badge: "New"
    },
    {
        id: 3,
        name: "Kids Sports Set",
        category: "kids",
        price: 39.99,
        originalPrice: 59.99,
        image: "https://picsum.photos/seed/kids1/300/300.jpg",
        rating: 4.6,
        reviews: 45,
        badge: "Popular"
    },
    {
        id: 4,
        name: "Diamond Necklace",
        category: "jewelry",
        price: 299.99,
        originalPrice: 499.99,
        image: "https://picsum.photos/seed/necklace1/300/300.jpg",
        rating: 5.0,
        reviews: 23,
        badge: "Luxury"
    },
    {
        id: 5,
        name: "Smart Watch Pro",
        category: "watches",
        price: 199.99,
        originalPrice: 299.99,
        image: "https://picsum.photos/seed/watch1/300/300.jpg",
        rating: 4.7,
        reviews: 156,
        badge: "Tech"
    },
    {
        id: 6,
        name: "Running Shoes",
        category: "footwear",
        price: 89.99,
        originalPrice: 139.99,
        image: "https://picsum.photos/seed/shoes1/300/300.jpg",
        rating: 4.4,
        reviews: 203,
        badge: "Sport"
    },
    {
        id: 7,
        name: "Casual Jeans",
        category: "men",
        price: 59.99,
        originalPrice: 89.99,
        image: "https://picsum.photos/seed/jeans1/300/300.jpg",
        rating: 4.3,
        reviews: 167,
        badge: "Sale"
    },
    {
        id: 8,
        name: "Handbag Collection",
        category: "women",
        price: 119.99,
        originalPrice: 189.99,
        image: "https://picsum.photos/seed/bag1/300/300.jpg",
        rating: 4.6,
        reviews: 92,
        badge: "Trending"
    }
];

// Shopping cart
let cart = [];
let wishlist = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeHeroSlider();
    loadFeaturedProducts();
    setupEventListeners();
    updateCartCount();
});

// Hero Slider
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance slides
    setInterval(nextSlide, 5000);

    // Manual slide control
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

// Load featured products
function loadFeaturedProducts() {
    const productGrid = document.getElementById('featuredProducts');
    if (!productGrid) return;

    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
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
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-count">(${product.reviews})</span>
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Generate star rating
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

// Setup event listeners
function setupEventListeners() {
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            window.location.href = `products.html?category=${category}`;
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with email: ${email}`);
            this.reset();
        });
    }
}

// Search functionality
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm) {
        window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartCount();
        showNotification('Product added to cart!');
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Add to wishlist
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product && !wishlist.find(item => item.id === productId)) {
        wishlist.push(product);
        showNotification('Product added to wishlist!');
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } else {
        showNotification('Product already in wishlist!');
    }
}

// Quick view
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        showProductModal(product);
    }
}

// Show product modal
function showProductModal(product) {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal()">&times;</span>
            <div class="modal-product">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="modal-info">
                    <h2>${product.name}</h2>
                    <div class="modal-price">
                        <span class="current-price">$${product.price}</span>
                        <span class="original-price">$${product.originalPrice}</span>
                    </div>
                    <div class="modal-rating">
                        <div class="stars">${generateStars(product.rating)}</div>
                        <span>(${product.reviews} reviews)</span>
                    </div>
                    <p class="modal-description">
                        High-quality product with premium materials. Perfect for any occasion.
                        Available in multiple sizes and colors.
                    </p>
                    <div class="modal-actions">
                        <button class="add-to-cart" onclick="addToCart(${product.id}); closeModal();">
                            Add to Cart
                        </button>
                        <button class="wishlist-btn" onclick="addToWishlist(${product.id})">
                            <i class="fas fa-heart"></i> Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.product-modal');
    if (modal) {
        modal.remove();
    }
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
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Load wishlist from localStorage
function loadWishlist() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
}

// Initialize cart and wishlist
loadCart();
loadWishlist();

// Add modal styles
const modalStyles = `
    .product-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    
    .modal-content {
        background: white;
        border-radius: 15px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    }
    
    .close-modal {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 30px;
        cursor: pointer;
        color: #333;
        z-index: 1;
    }
    
    .modal-product {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        padding: 30px;
    }
    
    .modal-image img {
        width: 100%;
        border-radius: 10px;
    }
    
    .modal-info h2 {
        margin-bottom: 20px;
        color: #333;
    }
    
    .modal-price {
        margin-bottom: 15px;
    }
    
    .modal-rating {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
    }
    
    .modal-description {
        margin-bottom: 30px;
        line-height: 1.6;
        color: #666;
    }
    
    .modal-actions {
        display: flex;
        gap: 15px;
    }
    
    .wishlist-btn {
        background: transparent;
        border: 2px solid #ff6b6b;
        color: #ff6b6b;
        padding: 12px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s;
    }
    
    .wishlist-btn:hover {
        background: #ff6b6b;
        color: white;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @media (max-width: 768px) {
        .modal-product {
            grid-template-columns: 1fr;
        }
        
        .modal-actions {
            flex-direction: column;
        }
    }
`;

// Add modal styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
