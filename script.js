// Nigerian Fashion Product Data with Naira Prices
const products = [
    {
        id: 1,
        name: "Nigerian Agbada Set",
        category: "men",
        subcategory: "traditional",
        price: 45000,
        originalPrice: 65000,
        images: {
            main: "https://picsum.photos/seed/nigerian-agbada-main/800/800.jpg",
            gallery: [
                "https://picsum.photos/seed/nigerian-agbada-1/400/400.jpg",
                "https://picsum.photos/seed/nigerian-agbada-2/400/400.jpg",
                "https://picsum.photos/seed/nigerian-agbada-3/400/400.jpg"
            ],
            thumbnail: "https://picsum.photos/seed/nigerian-agbada-thumb/150/150.jpg"
        },
        colors: ["#8B4513", "#2C3E50", "#FFD700", "#4B0082"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        rating: 4.8,
        reviews: 156,
        badge: "Traditional",
        description: "Premium quality Nigerian Agbada set perfect for weddings and special occasions. Made with authentic Nigerian fabrics.",
        material: "Nigerian Brocade & Cotton",
        care: "Dry clean only"
    },
    {
        id: 2,
        name: "Ankara Print Gown",
        category: "women",
        subcategory: "traditional",
        price: 28000,
        originalPrice: 42000,
        images: {
            main: "https://picsum.photos/seed/ankara-gown-main/800/800.jpg",
            gallery: [
                "https://picsum.photos/seed/ankara-gown-1/400/400.jpg",
                "https://picsum.photos/seed/ankara-gown-2/400/400.jpg",
                "https://picsum.photos/seed/ankara-gown-3/400/400.jpg"
            ],
            thumbnail: "https://picsum.photos/seed/ankara-gown-thumb/150/150.jpg"
        },
        colors: ["#FF6B6B", "#F39C12", "#8E44AD", "#16A085"],
        sizes: ["XS", "S", "M", "L", "XL"],
        rating: 4.7,
        reviews: 203,
        badge: "Ankara",
        description: "Beautiful Ankara print gown showcasing vibrant Nigerian patterns. Perfect for church and social events.",
        material: "100% Ankara Cotton",
        care: "Hand wash recommended"
    },
    {
        id: 3,
        name: "Kids Aso-Oke Outfit",
        category: "kids",
        subcategory: "traditional",
        price: 22000,
        originalPrice: 35000,
        images: {
            main: "https://picsum.photos/seed/kids-asooke-main/800/800.jpg",
            gallery: [
                "https://picsum.photos/seed/kids-asooke-1/400/400.jpg",
                "https://picsum.photos/seed/kids-asooke-2/400/400.jpg",
                "https://picsum.photos/seed/kids-asooke-3/400/400.jpg"
            ],
            thumbnail: "https://picsum.photos/seed/kids-asooke-thumb/150/150.jpg"
        },
        colors: ["#FFD700", "#FF6B6B", "#4ECDC4", "#A569BD"],
        sizes: ["2T", "3T", "4T", "5T", "6T"],
        rating: 4.9,
        reviews: 89,
        badge: "Cultural",
        description: "Traditional Aso-Oke outfit for children's cultural events and celebrations.",
        material: "Hand-woven Aso-Oke",
        care: "Dry clean only"
    },
    {
        id: 4,
        name: "Nigerian Beaded Necklace",
        category: "jewelry",
        subcategory: "traditional",
        price: 15000,
        originalPrice: 25000,
        images: {
            main: "https://picsum.photos/seed/beaded-necklace-main/800/800.jpg",
            gallery: [
                "https://picsum.photos/seed/beaded-necklace-1/400/400.jpg",
                "https://picsum.photos/seed/beaded-necklace-2/400/400.jpg",
                "https://picsum.photos/seed/beaded-necklace-3/400/400.jpg"
            ],
            thumbnail: "https://picsum.photos/seed/beaded-necklace-thumb/150/150.jpg"
        },
        colors: ["#FFD700", "#C0C0C0", "#FF6B6B"],
        sizes: ["One Size"],
        rating: 4.6,
        reviews: 67,
        badge: "Handmade",
        description: "Authentic Nigerian beaded necklace crafted by local artisans.",
        material: "Glass Beads & Thread",
        care: "Store in jewelry box"
    },
    {
        id: 5,
        name: "Smart Watch Pro",
        category: "watches",
        subcategory: "tech",
        price: 85000,
        originalPrice: 120000,
        images: {
            main: "https://picsum.photos/seed/smartwatch-pro-main/800/800.jpg",
            gallery: [
                "https://picsum.photos/seed/smartwatch-pro-1/400/400.jpg",
                "https://picsum.photos/seed/smartwatch-pro-2/400/400.jpg",
                "https://picsum.photos/seed/smartwatch-pro-3/400/400.jpg"
            ],
            thumbnail: "https://picsum.photos/seed/smartwatch-pro-thumb/150/150.jpg"
        },
        colors: ["#2C3E50", "#E74C3C", "#3498DB", "#27AE60"],
        sizes: ["One Size"],
        rating: 4.7,
        reviews: 156,
        badge: "Tech",
        description: "Advanced smartwatch with health tracking, GPS, and smartphone integration.",
        material: "Stainless Steel & Silicon",
        care: "Water resistant up to 50m"
    },
    {
        id: 6,
        name: "Nigerian Leather Sandals",
        category: "footwear",
        subcategory: "traditional",
        price: 18000,
        originalPrice: 28000,
        images: {
            main: "https://picsum.photos/seed/leather-sandals-main/800/800.jpg",
            gallery: [
                "https://picsum.photos/seed/leather-sandals-1/400/400.jpg",
                "https://picsum.photos/seed/leather-sandals-2/400/400.jpg",
                "https://picsum.photos/seed/leather-sandals-3/400/400.jpg"
            ],
            thumbnail: "https://picsum.photos/seed/leather-sandals-thumb/150/150.jpg"
        },
        colors: ["#8B4513", "#2C3E50", "#000000", "#A0522D"],
        sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
        rating: 4.5,
        reviews: 124,
        badge: "Handcrafted",
        description: "Handcrafted Nigerian leather sandals perfect for traditional and modern wear.",
        material: "Genuine Nigerian Leather",
        care: "Leather polish recommended"
    },
    {
        id: 7,
        name: "Senator Style Suit",
        category: "men",
        subcategory: "formal",
        price: 55000,
        originalPrice: 75000,
        images: {
            main: "https://picsum.photos/seed/senator-suit-main/800/800.jpg",
            gallery: [
                "https://picsum.photos/seed/senator-suit-1/400/400.jpg",
                "https://picsum.photos/seed/senator-suit-2/400/400.jpg",
                "https://picsum.photos/seed/senator-suit-3/400/400.jpg"
            ],
            thumbnail: "https://picsum.photos/seed/senator-suit-thumb/150/150.jpg"
        },
        colors: ["#2C3E50", "#1C2833", "#5D6D7E"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        rating: 4.8,
        reviews: 98,
        badge: "Premium",
        description: "Classic Nigerian Senator style suit perfect for business meetings and formal events.",
        material: "Premium Nigerian Wool",
        care: "Dry clean only"
    },
    {
        id: 8,
        name: "Modern Kaftan Dress",
        category: "women",
        subcategory: "modern",
        price: 32000,
        originalPrice: 48000,
        images: {
            main: "https://picsum.photos/seed/kaftan-dress-main/800/800.jpg",
            gallery: [
                "https://picsum.photos/seed/kaftan-dress-1/400/400.jpg",
                "https://picsum.photos/seed/kaftan-dress-2/400/400.jpg",
                "https://picsum.photos/seed/kaftan-dress-3/400/400.jpg"
            ],
            thumbnail: "https://picsum.photos/seed/kaftan-dress-thumb/150/150.jpg"
        },
        colors: ["#FF6B6B", "#F39C12", "#8E44AD", "#16A085"],
        sizes: ["XS", "S", "M", "L", "XL"],
        rating: 4.6,
        reviews: 145,
        badge: "Modern",
        description: "Contemporary Kaftan dress blending Nigerian traditional style with modern fashion.",
        material: "Premium Cotton Blend",
        care: "Machine washable"
    },
    {
        id: 9,
        name: "Kids School Uniform Set",
        category: "kids",
        subcategory: "school",
        price: 15000,
        originalPrice: 22000,
        images: {
            main: "https://picsum.photos/seed/school-uniform-main/800/800.jpg",
            gallery: [
                "https://picsum.photos/seed/school-uniform-1/400/400.jpg",
                "https://picsum.photos/seed/school-uniform-2/400/400.jpg",
                "https://picsum.photos/seed/school-uniform-3/400/400.jpg"
            ],
            thumbnail: "https://picsum.photos/seed/school-uniform-thumb/150/150.jpg"
        },
        colors: ["#FFFFFF", "#0000FF", "#008000"],
        sizes: ["2T", "3T", "4T", "5T", "6T", "7T"],
        rating: 4.4,
        reviews: 78,
        badge: "School",
        description: "Durable and comfortable school uniform set for Nigerian primary schools.",
        material: "Polyester-Cotton Blend",
        care: "Machine washable"
    },
    {
        id: 10,
        name: "Fashion Sunglasses",
        category: "accessories",
        subcategory: "eyewear",
        price: 12000,
        originalPrice: 18000,
        images: {
            main: "https://picsum.photos/seed/fashion-sunglasses-main/800/800.jpg",
            gallery: [
                "https://picsum.photos/seed/fashion-sunglasses-1/400/400.jpg",
                "https://picsum.photos/seed/fashion-sunglasses-2/400/400.jpg",
                "https://picsum.photos/seed/fashion-sunglasses-3/400/400.jpg"
            ],
            thumbnail: "https://picsum.photos/seed/fashion-sunglasses-thumb/150/150.jpg"
        },
        colors: ["#000000", "#8B4513", "#FFD700", "#C0C0C0"],
        sizes: ["One Size"],
        rating: 4.5,
        reviews: 89,
        badge: "Stylish",
        description: "Trendy sunglasses with UV protection perfect for Nigerian sun.",
        material: "Polarized Lenses",
        care: "Clean with microfiber cloth"
    },
    {
        id: 11,
        name: "Nigerian Leather Belt",
        category: "accessories",
        subcategory: "belts",
        price: 8000,
        originalPrice: 12000,
        images: {
            main: "https://picsum.photos/seed/leather-belt-main/800/800.jpg",
            gallery: [
                "https://picsum.photos/seed/leather-belt-1/400/400.jpg",
                "https://picsum.photos/seed/leather-belt-2/400/400.jpg",
                "https://picsum.photos/seed/leather-belt-3/400/400.jpg"
            ],
            thumbnail: "https://picsum.photos/seed/leather-belt-thumb/150/150.jpg"
        },
        colors: ["#8B4513", "#2C3E50", "#000000", "#A0522D"],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.3,
        reviews: 56,
        badge: "Handmade",
        description: "Genuine Nigerian leather belt with traditional buckle design.",
        material: "Genuine Nigerian Leather",
        care: "Leather conditioner recommended"
    },
    {
        id: 12,
        name: "Nigerian Baseball Cap",
        category: "accessories",
        subcategory: "headwear",
        price: 6000,
        originalPrice: 9000,
        images: {
            main: "https://picsum.photos/seed/nigerian-cap-main/800/800.jpg",
            gallery: [
                "https://picsum.photos/seed/nigerian-cap-1/400/400.jpg",
                "https://picsum.photos/seed/nigerian-cap-2/400/400.jpg",
                "https://picsum.photos/seed/nigerian-cap-3/400/400.jpg"
            ],
            thumbnail: "https://picsum.photos/seed/nigerian-cap-thumb/150/150.jpg"
        },
        colors: ["#008751", "#FFFFFF", "#000000", "#FF6B6B"],
        sizes: ["One Size"],
        rating: 4.4,
        reviews: 67,
        badge: "Local",
        description: "Stylish Nigerian-themed baseball cap with adjustable strap.",
        material: "Cotton Twill",
        care: "Spot clean only"
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

// Create product card with enhanced image support
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.images.main}" alt="${product.name}" 
                 onerror="this.src='${product.images.thumbnail}'" 
                 loading="lazy">
            <span class="product-badge">${product.badge}</span>
            <div class="product-actions">
                <button class="action-btn" onclick="addToWishlist(${product.id})" title="Add to Wishlist">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="action-btn" onclick="quickView(${product.id})" title="Quick View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn" onclick="viewGallery(${product.id})" title="View Gallery">
                    <i class="fas fa-images"></i>
                </button>
            </div>
            <div class="color-options">
                ${product.colors.map(color => `<span class="color-swatch" style="background-color: ${color};" title="Color option"></span>`).join('')}
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">
                <span class="current-price">${formatPrice(product.price)}</span>
                <span class="original-price">${formatPrice(product.originalPrice)}</span>
            </div>
            <div class="product-rating">
                <div class="stars">${generateStars(product.rating)}</div>
                <span class="rating-count">(${product.reviews})</span>
            </div>
            <div class="product-meta">
                <span class="material">${product.material}</span>
                <span class="sizes">${product.sizes.slice(0, 3).join(', ')}${product.sizes.length > 3 ? '...' : ''}</span>
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Format price in Naira
function formatPrice(price) {
    return `₦${price.toLocaleString('en-NG')}`;
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

// View product gallery
function viewGallery(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        showGalleryModal(product);
    }
}

// Show gallery modal
function showGalleryModal(product) {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal()">&times;</span>
            <div class="gallery-container">
                <div class="main-image">
                    <img id="mainGalleryImage" src="${product.images.main}" alt="${product.name}">
                </div>
                <div class="gallery-thumbnails">
                    ${product.images.gallery.map((img, index) => `
                        <img src="${img}" alt="${product.name} - View ${index + 1}" 
                             onclick="changeGalleryImage('${img}')" 
                             class="thumbnail ${index === 0 ? 'active' : ''}">
                    `).join('')}
                </div>
                <div class="gallery-info">
                    <h2>${product.name}</h2>
                    <div class="gallery-price">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        <span class="original-price">${formatPrice(product.originalPrice)}</span>
                    </div>
                    <div class="gallery-colors">
                        <h4>Available Colors:</h4>
                        <div class="color-list">
                            ${product.colors.map(color => `
                                <span class="color-swatch" style="background-color: ${color};" title="Color option"></span>
                            `).join('')}
                        </div>
                    </div>
                    <div class="gallery-details">
                        <p><strong>Material:</strong> ${product.material}</p>
                        <p><strong>Care:</strong> ${product.care}</p>
                        <p><strong>Sizes:</strong> ${product.sizes.join(', ')}</p>
                    </div>
                    <div class="gallery-actions">
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

// Change gallery image
function changeGalleryImage(imageSrc) {
    const mainImage = document.getElementById('mainGalleryImage');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    event.target.classList.add('active');
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
