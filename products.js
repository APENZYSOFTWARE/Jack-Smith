// Extended product data with more details
const allProducts = [
    {
        id: 1,
        name: "Premium Cotton T-Shirt",
        category: "men",
        price: 29.99,
        originalPrice: 49.99,
        image: "https://picsum.photos/seed/tshirt1/300/300.jpg",
        rating: 4.5,
        reviews: 128,
        badge: "Sale",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["black", "white", "blue", "red"],
        description: "High-quality cotton t-shirt perfect for casual wear"
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
        badge: "New",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["red", "blue", "black", "white"],
        description: "Beautiful summer dress for any occasion"
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
        badge: "Popular",
        sizes: ["XS", "S", "M", "L"],
        colors: ["blue", "red", "green"],
        description: "Comfortable sports set for active kids"
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
        badge: "Luxury",
        sizes: ["One Size"],
        colors: ["gold", "silver"],
        description: "Elegant diamond necklace for special occasions"
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
        badge: "Tech",
        sizes: ["One Size"],
        colors: ["black", "white", "blue"],
        description: "Advanced smartwatch with health tracking features"
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
        badge: "Sport",
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: ["black", "white", "blue", "red"],
        description: "Professional running shoes for athletes"
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
        badge: "Sale",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["blue", "black", "gray"],
        description: "Comfortable casual jeans for everyday wear"
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
        badge: "Trending",
        sizes: ["One Size"],
        colors: ["black", "brown", "red", "blue"],
        description: "Stylish handbag for modern women"
    },
    {
        id: 9,
        name: "Kids Winter Jacket",
        category: "kids",
        price: 69.99,
        originalPrice: 99.99,
        image: "https://picsum.photos/seed/jacket1/300/300.jpg",
        rating: 4.7,
        reviews: 78,
        badge: "Winter",
        sizes: ["XS", "S", "M", "L"],
        colors: ["blue", "red", "green", "black"],
        description: "Warm winter jacket for kids"
    },
    {
        id: 10,
        name: "Gold Wedding Ring",
        category: "jewelry",
        price: 599.99,
        originalPrice: 899.99,
        image: "https://picsum.photos/seed/ring1/300/300.jpg",
        rating: 4.9,
        reviews: 34,
        badge: "Luxury",
        sizes: ["6", "7", "8", "9", "10"],
        colors: ["gold", "white-gold"],
        description: "Beautiful gold wedding ring"
    },
    {
        id: 11,
        name: "Classic Leather Watch",
        category: "watches",
        price: 149.99,
        originalPrice: 249.99,
        image: "https://picsum.photos/seed/watch2/300/300.jpg",
        rating: 4.5,
        reviews: 112,
        badge: "Classic",
        sizes: ["One Size"],
        colors: ["brown", "black"],
        description: "Timeless leather strap watch"
    },
    {
        id: 12,
        name: "Formal Shoes",
        category: "footwear",
        price: 129.99,
        originalPrice: 189.99,
        image: "https://picsum.photos/seed/formal1/300/300.jpg",
        rating: 4.6,
        reviews: 89,
        badge: "Formal",
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: ["black", "brown"],
        description: "Elegant formal shoes for business meetings"
    }
];

// Global variables
let filteredProducts = [...allProducts];
let currentPage = 1;
let productsPerPage = 12;
let currentCategory = '';
let currentSearch = '';

// Initialize products page
document.addEventListener('DOMContentLoaded', function() {
    initializeProductsPage();
    setupEventListeners();
    loadFiltersFromURL();
});

// Initialize products page
function initializeProductsPage() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    currentCategory = urlParams.get('category') || '';
    currentSearch = urlParams.get('search') || '';
    
    // Set page title and breadcrumb
    updatePageInfo();
    
    // Load products
    filterAndDisplayProducts();
    
    // Initialize cart count
    updateCartCount();
}

// Update page information
function updatePageInfo() {
    const pageTitle = document.getElementById('page-title');
    const breadcrumbCategory = document.getElementById('breadcrumb-category');
    
    if (currentCategory) {
        const categoryName = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
        pageTitle.textContent = `${categoryName} Products`;
        breadcrumbCategory.textContent = categoryName;
    } else if (currentSearch) {
        pageTitle.textContent = `Search Results: "${currentSearch}"`;
        breadcrumbCategory.textContent = `Search: ${currentSearch}`;
    } else {
        pageTitle.textContent = 'All Products';
        breadcrumbCategory.textContent = 'Products';
    }
}

// Setup event listeners
function setupEventListeners() {
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
        
        // Set search value from URL
        if (currentSearch) {
            searchInput.value = currentSearch;
        }
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
    
    // View toggle
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            toggleView(view);
        });
    });
    
    // Filter event listeners
    setupFilterListeners();
    
    // Mobile filter toggle
    setupMobileFilterToggle();
}

// Setup filter listeners
function setupFilterListeners() {
    // Category filters
    document.querySelectorAll('.category-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Price filters
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const minPriceDisplay = document.getElementById('minPriceDisplay');
    const maxPriceDisplay = document.getElementById('maxPriceDisplay');
    
    if (minPrice && maxPrice) {
        minPrice.addEventListener('input', function() {
            minPriceDisplay.textContent = this.value;
            applyFilters();
        });
        
        maxPrice.addEventListener('input', function() {
            maxPriceDisplay.textContent = this.value;
            applyFilters();
        });
    }
    
    // Size filters
    document.querySelectorAll('.size-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Color filters
    document.querySelectorAll('.color-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Rating filters
    document.querySelectorAll('.rating-filter').forEach(radio => {
        radio.addEventListener('change', applyFilters);
    });
}

// Setup mobile filter toggle
function setupMobileFilterToggle() {
    const mobileToggle = document.querySelector('.mobile-filter-toggle');
    const filtersSidebar = document.querySelector('.filters-sidebar');
    const closeBtn = document.querySelector('.mobile-filter-close');
    
    if (mobileToggle && filtersSidebar) {
        mobileToggle.addEventListener('click', function() {
            filtersSidebar.classList.add('active');
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                filtersSidebar.classList.remove('active');
            });
        }
    }
}

// Load filters from URL
function loadFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Set category filter
    if (currentCategory) {
        const categoryCheckbox = document.querySelector(`.category-filter[value="${currentCategory}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
        }
    }
}

// Perform search
function performSearch() {
    const searchValue = document.getElementById('searchInput').value.trim();
    if (searchValue) {
        window.location.href = `products.html?search=${encodeURIComponent(searchValue)}`;
    } else {
        window.location.href = 'products.html';
    }
}

// Apply filters
function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked'))
        .map(cb => cb.value);
    const selectedSizes = Array.from(document.querySelectorAll('.size-filter:checked'))
        .map(cb => cb.value);
    const selectedColors = Array.from(document.querySelectorAll('.color-filter:checked'))
        .map(cb => cb.value);
    const selectedRating = document.querySelector('.rating-filter:checked')?.value;
    const minPrice = parseInt(document.getElementById('minPrice')?.value || 0);
    const maxPrice = parseInt(document.getElementById('maxPrice')?.value || 500);
    
    filteredProducts = allProducts.filter(product => {
        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false;
        }
        
        // Size filter
        if (selectedSizes.length > 0 && !selectedSizes.some(size => product.sizes.includes(size))) {
            return false;
        }
        
        // Color filter
        if (selectedColors.length > 0 && !selectedColors.some(color => product.colors.includes(color))) {
            return false;
        }
        
        // Rating filter
        if (selectedRating && product.rating < parseInt(selectedRating)) {
            return false;
        }
        
        // Price filter
        if (product.price < minPrice || product.price > maxPrice) {
            return false;
        }
        
        // Search filter
        if (currentSearch && !product.name.toLowerCase().includes(currentSearch.toLowerCase())) {
            return false;
        }
        
        // Category from URL
        if (currentCategory && product.category !== currentCategory) {
            return false;
        }
        
        return true;
    });
    
    currentPage = 1;
    filterAndDisplayProducts();
}

// Sort products
function sortProducts(sortBy) {
    switch(sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'featured':
        default:
            filteredProducts.sort((a, b) => {
                if (a.badge === 'New' || a.badge === 'Sale') return -1;
                if (b.badge === 'New' || b.badge === 'Sale') return 1;
                return 0;
            });
            break;
    }
    
    displayProducts();
}

// Toggle view
function toggleView(view) {
    const productsGrid = document.getElementById('productsGrid');
    const viewBtns = document.querySelectorAll('.view-btn');
    
    viewBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    if (view === 'list') {
        productsGrid.classList.add('list-view');
    } else {
        productsGrid.classList.remove('list-view');
    }
}

// Filter and display products
function filterAndDisplayProducts() {
    applyFilters();
    displayProducts();
    updateResultsCount();
    displayPagination();
}

// Display products
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button onclick="clearAllFilters()">Clear Filters</button>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = '';
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
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
                <div class="stars">${generateStars(product.rating)}</div>
                <span class="rating-count">(${product.reviews})</span>
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Update results count
function updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        const total = filteredProducts.length;
        const start = (currentPage - 1) * productsPerPage + 1;
        const end = Math.min(currentPage * productsPerPage, total);
        resultsCount.textContent = `Showing ${start}-${end} of ${total} products`;
    }
}

// Display pagination
function displayPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button onclick="changePage(${i})" class="${i === currentPage ? 'active' : ''}">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span>...</span>`;
        }
    }
    
    // Next button
    paginationHTML += `
        <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayProducts();
    updateResultsCount();
    displayPagination();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Clear all filters
function clearAllFilters() {
    // Clear checkboxes
    document.querySelectorAll('.category-filter, .size-filter, .color-filter').forEach(cb => {
        cb.checked = false;
    });
    
    // Clear radio buttons
    document.querySelectorAll('.rating-filter').forEach(radio => {
        radio.checked = false;
    });
    
    // Reset price range
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const minPriceDisplay = document.getElementById('minPriceDisplay');
    const maxPriceDisplay = document.getElementById('maxPriceDisplay');
    
    if (minPrice && maxPrice) {
        minPrice.value = 0;
        maxPrice.value = 500;
        if (minPriceDisplay) minPriceDisplay.textContent = '0';
        if (maxPriceDisplay) maxPriceDisplay.textContent = '500';
    }
    
    // Clear search
    if (document.getElementById('searchInput')) {
        document.getElementById('searchInput').value = '';
    }
    
    // Reset URL
    window.history.pushState({}, '', 'products.html');
    
    // Reset variables
    currentCategory = '';
    currentSearch = '';
    
    // Re-initialize
    initializeProductsPage();
}

// Reuse functions from main script
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

function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
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
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function addToWishlist(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product && !wishlist.find(item => item.id === productId)) {
        wishlist.push(product);
        showNotification('Product added to wishlist!');
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } else {
        showNotification('Product already in wishlist!');
    }
}

function quickView(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        showProductModal(product);
    }
}

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
                    <p class="modal-description">${product.description}</p>
                    <div class="modal-details">
                        <p><strong>Available Sizes:</strong> ${product.sizes.join(', ')}</p>
                        <p><strong>Available Colors:</strong> ${product.colors.join(', ')}</p>
                    </div>
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

function closeModal() {
    const modal = document.querySelector('.product-modal');
    if (modal) {
        modal.remove();
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

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

// Load cart and wishlist from localStorage
let cart = [];
let wishlist = [];

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function loadWishlist() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
}

// Initialize cart and wishlist
loadCart();
loadWishlist();
