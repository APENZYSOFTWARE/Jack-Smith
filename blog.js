// Blog Page JavaScript
let articles = [];
let filteredArticles = [];
let currentCategory = 'all';
let currentSort = 'latest';
let articlesPerPage = 9;
let currentPage = 1;

// Sample blog articles data
const sampleArticles = [
    {
        id: 1,
        title: "Ultimate Guide to Summer 2024 Fashion Trends",
        excerpt: "Discover the hottest trends that will dominate the summer season, from vibrant colors to sustainable fabrics that keep you stylish and comfortable.",
        content: "Summer 2024 is all about bold expressions and sustainable choices...",
        category: "trends",
        categoryName: "Latest Trends",
        author: "Sarah Johnson",
        authorTitle: "Fashion Editor",
        authorImage: "https://picsum.photos/seed/author1/40/40.jpg",
        date: "2024-06-15",
        readTime: 5,
        image: "https://picsum.photos/seed/summer-trends/800/500.jpg",
        featured: true,
        tags: ["summer", "trends", "2024", "sustainable"],
        views: 15234,
        likes: 892
    },
    {
        id: 2,
        title: "The Art of Minimalist Fashion: Less is More",
        excerpt: "Learn how to create a stunning wardrobe with fewer, better pieces that speak volumes about your personal style.",
        content: "Minimalism in fashion isn't about having less—it's about having better...",
        category: "style-tips",
        categoryName: "Style Tips",
        author: "Michael Chen",
        authorTitle: "Style Consultant",
        authorImage: "https://picsum.photos/seed/author2/40/40.jpg",
        date: "2024-06-12",
        readTime: 7,
        image: "https://picsum.photos/seed/minimalist-style/800/500.jpg",
        featured: false,
        tags: ["minimalist", "wardrobe", "style-tips", "basics"],
        views: 8921,
        likes: 567
    },
    {
        id: 3,
        title: "Complete Guide to Accessorizing Your Outfits",
        excerpt: "Master the art of accessories to elevate any look instantly. From jewelry to bags, learn how to choose the perfect pieces.",
        content: "Accessories are the exclamation points of a fashion statement...",
        category: "accessories",
        categoryName: "Accessories",
        author: "Emma Wilson",
        authorTitle: "Accessory Expert",
        authorImage: "https://picsum.photos/seed/author3/40/40.jpg",
        date: "2024-06-10",
        readTime: 6,
        image: "https://picsum.photos/seed/accessories-guide/800/500.jpg",
        featured: false,
        tags: ["accessories", "jewelry", "bags", "style-tips"],
        views: 12456,
        likes: 723
    },
    {
        id: 4,
        title: "10 Sustainable Fashion Brands to Support in 2024",
        excerpt: "Discover eco-conscious brands that don't compromise on style. Support fashion that's good for the planet and your wardrobe.",
        content: "Sustainable fashion is no longer a niche—it's the future...",
        category: "sustainable",
        categoryName: "Sustainable Fashion",
        author: "Lisa Green",
        authorTitle: "Eco Fashion Writer",
        authorImage: "https://picsum.photos/seed/author4/40/40.jpg",
        date: "2024-06-08",
        readTime: 8,
        image: "https://picsum.photos/seed/sustainable-fashion/800/500.jpg",
        featured: false,
        tags: ["sustainable", "eco-friendly", "brands", "2024"],
        views: 9876,
        likes: 645
    },
    {
        id: 5,
        title: "Celebrity Style: Red Carpet Looks We Love",
        excerpt: "Get inspired by the best celebrity fashion moments and learn how to recreate these looks for your everyday style.",
        content: "Red carpet events showcase the pinnacle of fashion creativity...",
        category: "celebrity",
        categoryName: "Celebrity Style",
        author: "Alex Rivera",
        authorTitle: "Celebrity Fashion Analyst",
        authorImage: "https://picsum.photos/seed/author5/40/40.jpg",
        date: "2024-06-05",
        readTime: 5,
        image: "https://picsum.photos/seed/celebrity-style/800/500.jpg",
        featured: false,
        tags: ["celebrity", "red-carpet", "style-inspiration", "trends"],
        views: 18765,
        likes: 1234
    },
    {
        id: 6,
        title: "Spring Wardrobe Essentials: What You Really Need",
        excerpt: "Build the perfect spring wardrobe with these essential pieces that will keep you stylish all season long.",
        content: "Spring is all about renewal and fresh beginnings...",
        category: "seasonal",
        categoryName: "Seasonal Fashion",
        author: "Rachel Bloom",
        authorTitle: "Seasonal Fashion Expert",
        authorImage: "https://picsum.photos/seed/author6/40/40.jpg",
        date: "2024-06-03",
        readTime: 6,
        image: "https://picsum.photos/seed/spring-wardrobe/800/500.jpg",
        featured: false,
        tags: ["spring", "essentials", "wardrobe", "seasonal"],
        views: 7654,
        likes: 432
    },
    {
        id: 7,
        title: "Color Theory: How to Match Colors Like a Pro",
        excerpt: "Understanding color theory can transform your style. Learn the basics of color matching and create harmonious outfits.",
        content: "Color is one of the most powerful tools in fashion...",
        category: "style-tips",
        categoryName: "Style Tips",
        author: "David Park",
        authorTitle: "Color Specialist",
        authorImage: "https://picsum.photos/seed/author7/40/40.jpg",
        date: "2024-06-01",
        readTime: 7,
        image: "https://picsum.photos/seed/color-theory/800/500.jpg",
        featured: false,
        tags: ["color", "theory", "style-tips", "matching"],
        views: 11234,
        likes: 789
    },
    {
        id: 8,
        title: "Men's Fashion: Building a Timeless Wardrobe",
        excerpt: "Create a versatile and timeless wardrobe with these essential pieces that will never go out of style.",
        content: "A well-curated wardrobe is the foundation of great style...",
        category: "style-tips",
        categoryName: "Style Tips",
        author: "James Miller",
        authorTitle: "Men's Fashion Expert",
        authorImage: "https://picsum.photos/seed/author8/40/40.jpg",
        date: "2024-05-29",
        readTime: 8,
        image: "https://picsum.photos/seed/mens-wardrobe/800/500.jpg",
        featured: false,
        tags: ["men", "wardrobe", "timeless", "essentials"],
        views: 14567,
        likes: 923
    },
    {
        id: 9,
        title: "Winter Layering: Stay Warm and Stylish",
        excerpt: "Master the art of layering for winter with these tips and tricks to stay warm without sacrificing style.",
        content: "Winter fashion doesn't mean bulky and boring...",
        category: "seasonal",
        categoryName: "Seasonal Fashion",
        author: "Nina Frost",
        authorTitle: "Winter Style Expert",
        authorImage: "https://picsum.photos/seed/author9/40/40.jpg",
        date: "2024-05-27",
        readTime: 6,
        image: "https://picsum.photos/seed/winter-layering/800/500.jpg",
        featured: false,
        tags: ["winter", "layering", "warm", "stylish"],
        views: 9876,
        likes: 654
    }
];

// Initialize blog page
document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
    displayArticles();
    setupEventListeners();
    updateLoadMoreButton();
});

// Load articles
function loadArticles() {
    // In a real application, this would fetch from an API
    articles = [...sampleArticles];
    filteredArticles = [...articles];
}

// Display articles
function displayArticles() {
    const articlesGrid = document.getElementById('articlesGrid');
    if (!articlesGrid) return;
    
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToShow = filteredArticles.slice(startIndex, endIndex);
    
    if (articlesToShow.length === 0 && currentPage === 1) {
        articlesGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1;">
                <i class="fas fa-search"></i>
                <h3>No articles found</h3>
                <p>Try adjusting your filters or check back later for new content.</p>
            </div>
        `;
        return;
    }
    
    articlesGrid.innerHTML = '';
    articlesToShow.forEach(article => {
        const articleCard = createArticleCard(article);
        articlesGrid.appendChild(articleCard);
    });
    
    updateLoadMoreButton();
}

// Create article card
function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card';
    card.innerHTML = `
        <div class="article-image">
            <img src="${article.image}" alt="${article.title}">
        </div>
        <div class="article-content">
            <div class="article-meta">
                <span class="category">${article.categoryName}</span>
                <span class="date">${formatDate(article.date)}</span>
                <span class="read-time">${article.readTime} min read</span>
            </div>
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <div class="article-author">
                <img src="${article.authorImage}" alt="${article.author}">
                <div class="author-info">
                    <span class="author-name">${article.author}</span>
                    <span class="author-title">${article.authorTitle}</span>
                </div>
            </div>
            <div class="article-stats">
                <span><i class="fas fa-eye"></i> ${formatNumber(article.views)}</span>
                <span><i class="fas fa-heart"></i> ${formatNumber(article.likes)}</span>
            </div>
            <a href="#" class="read-more" onclick="readArticle(${article.id}); return false;">
                Read More <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            currentCategory = this.value;
            currentPage = 1;
            filterAndSortArticles();
        });
    }
    
    // Sort filter
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            currentSort = this.value;
            filterAndSortArticles();
        });
    }
    
    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreArticles);
    }
    
    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            document.getElementById('categoryFilter').value = category;
            currentCategory = category;
            currentPage = 1;
            filterAndSortArticles();
            
            // Scroll to articles section
            document.querySelector('.recent-articles').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    });
    
    // Newsletter signup
    const newsletterSubscribe = document.getElementById('newsletterSubscribe');
    const newsletterEmail = document.getElementById('newsletterEmail');
    
    if (newsletterSubscribe && newsletterEmail) {
        newsletterSubscribe.addEventListener('click', function() {
            const email = newsletterEmail.value.trim();
            if (email && validateEmail(email)) {
                subscribeToNewsletter(email);
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
        
        newsletterEmail.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterSubscribe.click();
            }
        });
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

// Filter and sort articles
function filterAndSortArticles() {
    // Filter by category
    if (currentCategory === 'all') {
        filteredArticles = [...articles];
    } else {
        filteredArticles = articles.filter(article => article.category === currentCategory);
    }
    
    // Sort articles
    switch(currentSort) {
        case 'popular':
            filteredArticles.sort((a, b) => b.views - a.views);
            break;
        case 'trending':
            filteredArticles.sort((a, b) => b.likes - a.likes);
            break;
        case 'latest':
        default:
            filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
    }
    
    displayArticles();
}

// Load more articles
function loadMoreArticles() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.classList.add('loading');
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        // Simulate loading delay
        setTimeout(() => {
            currentPage++;
            displayArticles();
            loadMoreBtn.classList.remove('loading');
            loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Articles';
        }, 1000);
    }
}

// Update load more button
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    const totalArticles = filteredArticles.length;
    const displayedArticles = currentPage * articlesPerPage;
    
    if (displayedArticles >= totalArticles) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
    }
}

// Read article
function readArticle(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (article) {
        // Increment views
        article.views++;
        
        // In a real application, this would navigate to the article page
        showNotification(`Opening article: ${article.title}`, 'info');
        console.log('Reading article:', article);
        
        // Store reading history
        const readingHistory = JSON.parse(localStorage.getItem('blogReadingHistory') || '[]');
        readingHistory.unshift({
            articleId: article.id,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('blogReadingHistory', JSON.stringify(readingHistory.slice(0, 50))); // Keep last 50
    }
}

// Subscribe to newsletter
function subscribeToNewsletter(email) {
    // Show loading state
    const subscribeBtn = document.getElementById('newsletterSubscribe');
    const originalText = subscribeBtn.innerHTML;
    subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    subscribeBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Save subscription
        const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
        if (!subscriptions.includes(email)) {
            subscriptions.push(email);
            localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
        }
        
        // Show success message
        showNotification('Successfully subscribed to newsletter!', 'success');
        
        // Reset form
        document.getElementById('newsletterEmail').value = '';
        subscribeBtn.innerHTML = originalText;
        subscribeBtn.disabled = false;
        
        // Track subscription
        trackNewsletterSubscription(email);
        
    }, 1500);
}

// Track newsletter subscription
function trackNewsletterSubscription(email) {
    const trackingData = {
        email: email,
        timestamp: new Date().toISOString(),
        source: 'blog-page',
        page: 'blog.html'
    };
    
    const subscriptions = JSON.parse(localStorage.getItem('newsletterTracking') || '[]');
    subscriptions.push(trackingData);
    localStorage.setItem('newsletterTracking', JSON.stringify(subscriptions));
    
    console.log('Newsletter subscription tracked:', trackingData);
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    }, 3000);
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

// Track blog analytics
function trackBlogAnalytics() {
    // Track page view
    const pageView = {
        page: 'blog.html',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    const analytics = JSON.parse(localStorage.getItem('blogAnalytics') || '[]');
    analytics.push(pageView);
    localStorage.setItem('blogAnalytics', JSON.stringify(analytics.slice(-1000))); // Keep last 1000
    
    // Track category interests
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            trackCategoryInterest(category);
        });
    });
}

// Track category interest
function trackCategoryInterest(category) {
    const interests = JSON.parse(localStorage.getItem('categoryInterests') || '{}');
    interests[category] = (interests[category] || 0) + 1;
    localStorage.setItem('categoryInterests', JSON.stringify(interests));
    
    console.log('Category interest tracked:', category, interests[category]);
}

// Initialize analytics
trackBlogAnalytics();

// Add keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Press '/' to focus search
        if (e.key === '/' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Press 'Escape' to clear filters
        if (e.key === 'Escape') {
            document.getElementById('categoryFilter').value = 'all';
            document.getElementById('sortFilter').value = 'latest';
            currentCategory = 'all';
            currentSort = 'latest';
            currentPage = 1;
            filterAndSortArticles();
        }
    });
}

// Setup keyboard navigation
setupKeyboardNavigation();

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
