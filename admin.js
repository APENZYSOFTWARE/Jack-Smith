// Admin Dashboard JavaScript
let orders = [];
let products = [];
let customers = [];
let currentSection = 'dashboard';
let currentPage = 1;
let itemsPerPage = 10;

// CEO Profile Management
let ceoProfile = {
    name: 'StyleHub CEO',
    email: 'ceo@stylehub.ng',
    phone: '+234 808-6224-0288',
    bio: 'Leading Nigerian fashion with premium quality and authentic designs.',
    avatar: 'https://picsum.photos/seed/ceo-profile/200/200.jpg',
    social: {
        instagram: '@stylehub_ng',
        twitter: '@stylehub_ng',
        facebook: 'StyleHub Nigeria',
        linkedin: 'StyleHub Nigeria'
    }
};

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadCEOProfile();
    loadOrders();
    loadProducts();
    loadCustomers();
    setupEventListeners();
    updateDashboardStats();
    displayRecentOrders();
});

// Setup event listeners
function setupEventListeners() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            showSection(section);
        });
    });

    // Order search
    const orderSearch = document.getElementById('orderSearch');
    if (orderSearch) {
        orderSearch.addEventListener('input', function() {
            filterOrders(this.value);
        });
    }

    // Order filter
    const orderFilter = document.getElementById('orderFilter');
    if (orderFilter) {
        orderFilter.addEventListener('change', function() {
            filterOrdersByStatus(this.value);
        });
    }

    // Customer search
    const customerSearch = document.getElementById('customerSearch');
    if (customerSearch) {
        customerSearch.addEventListener('input', function() {
            filterCustomers(this.value);
        });
    }

    // Product form
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProduct();
        });
    }

    // Settings form
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings();
        });
    }
}

// Show section
function showSection(sectionName) {
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionName) {
            link.classList.add('active');
        }
    });

    // Update sections
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionName) {
            section.classList.add('active');
        }
    });

    currentSection = sectionName;

    // Load section-specific data
    switch(sectionName) {
        case 'orders':
            displayOrders();
            break;
        case 'products':
            displayProducts();
            break;
        case 'customers':
            displayCustomers();
            break;
        case 'analytics':
            // Analytics would be loaded here
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Load orders from localStorage
function loadOrders() {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    } else {
        // Generate sample orders for demonstration
        orders = generateSampleOrders();
        localStorage.setItem('orders', JSON.stringify(orders));
    }
    updateOrderCount();
}

// Load products
function loadProducts() {
    // Sample products data
    products = [
        {
            id: 1,
            name: "Premium Cotton T-Shirt",
            category: "men",
            price: 29.99,
            stock: 50,
            status: "active",
            image: "https://picsum.photos/seed/tshirt1/100/100.jpg"
        },
        {
            id: 2,
            name: "Elegant Summer Dress",
            category: "women",
            price: 79.99,
            stock: 30,
            status: "active",
            image: "https://picsum.photos/seed/dress1/100/100.jpg"
        },
        {
            id: 3,
            name: "Kids Sports Set",
            category: "kids",
            price: 39.99,
            stock: 25,
            status: "active",
            image: "https://picsum.photos/seed/kids1/100/100.jpg"
        }
    ];
}

// Load customers
function loadCustomers() {
    // Sample customers data
    customers = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "+1234567890",
            orders: 3,
            totalSpent: 299.97,
            joinedDate: "2024-01-15"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+1234567891",
            orders: 5,
            totalSpent: 599.95,
            joinedDate: "2024-01-20"
        }
    ];
}

// Generate sample orders
function generateSampleOrders() {
    const sampleOrders = [
        {
            orderId: "ORD-240001",
            customer: {
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                phone: "+1234567890"
            },
            orderDate: "2024-01-15T10:30:00Z",
            items: [
                {
                    name: "Premium Cotton T-Shirt",
                    quantity: 2,
                    price: 29.99,
                    image: "https://picsum.photos/seed/tshirt1/80/80.jpg"
                }
            ],
            totals: {
                subtotal: 59.98,
                shipping: 9.99,
                tax: 4.80,
                total: 74.77
            },
            payment: {
                method: "card",
                status: "paid"
            },
            status: "delivered",
            shippingAddress: {
                address: "123 Main St",
                city: "New York",
                state: "NY",
                zipCode: "10001",
                country: "US"
            }
        },
        {
            orderId: "ORD-240002",
            customer: {
                firstName: "Jane",
                lastName: "Smith",
                email: "jane@example.com",
                phone: "+1234567891"
            },
            orderDate: "2024-01-16T14:20:00Z",
            items: [
                {
                    name: "Elegant Summer Dress",
                    quantity: 1,
                    price: 79.99,
                    image: "https://picsum.photos/seed/dress1/80/80.jpg"
                }
            ],
            totals: {
                subtotal: 79.99,
                shipping: 0,
                tax: 6.40,
                total: 86.39
            },
            payment: {
                method: "paypal",
                status: "paid"
            },
            status: "processing",
            shippingAddress: {
                address: "456 Oak Ave",
                city: "Los Angeles",
                state: "CA",
                zipCode: "90001",
                country: "US"
            }
        }
    ];
    
    return sampleOrders;
}

// Update dashboard stats
function updateDashboardStats() {
    // Update total orders
    document.getElementById('totalOrders').textContent = orders.length;
    
    // Calculate total revenue
    const totalRevenue = orders.reduce((sum, order) => sum + order.totals.total, 0);
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
    
    // Update total customers
    document.getElementById('totalCustomers').textContent = customers.length;
    
    // Update total products
    document.getElementById('totalProducts').textContent = products.length;
}

// Display recent orders
function displayRecentOrders() {
    const recentOrdersTable = document.getElementById('recentOrdersTable');
    if (!recentOrdersTable) return;
    
    const recentOrders = orders.slice(0, 5);
    recentOrdersTable.innerHTML = '';
    
    recentOrders.forEach(order => {
        const row = createOrderRow(order, true);
        recentOrdersTable.appendChild(row);
    });
}

// Display all orders
function displayOrders() {
    const ordersTable = document.getElementById('ordersTable');
    if (!ordersTable) return;
    
    ordersTable.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedOrders = orders.slice(startIndex, endIndex);
    
    paginatedOrders.forEach(order => {
        const row = createOrderRow(order, false);
        ordersTable.appendChild(row);
    });
    
    displayPagination('ordersPagination', orders.length);
}

// Create order row
function createOrderRow(order, isRecent = false) {
    const row = document.createElement('tr');
    
    if (isRecent) {
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.customer.firstName} ${order.customer.lastName}</td>
            <td>${new Date(order.orderDate).toLocaleDateString()}</td>
            <td>$${order.totals.total.toFixed(2)}</td>
            <td><span class="status-badge status-${order.status}">${order.status}</span></td>
            <td>
                <button class="btn-view" onclick="viewOrder('${order.orderId}')">View</button>
            </td>
        `;
    } else {
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.customer.firstName} ${order.customer.lastName}</td>
            <td>${order.customer.email}</td>
            <td>${new Date(order.orderDate).toLocaleDateString()}</td>
            <td>${order.items.length}</td>
            <td>$${order.totals.total.toFixed(2)}</td>
            <td>${order.payment.method}</td>
            <td><span class="status-badge status-${order.status}">${order.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-view" onclick="viewOrder('${order.orderId}')">View</button>
                    <button class="btn-edit" onclick="updateOrderStatus('${order.orderId}')">Update</button>
                </div>
            </td>
        `;
    }
    
    return row;
}

// Display products
function displayProducts() {
    const productsTable = document.getElementById('productsTable');
    if (!productsTable) return;
    
    productsTable.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">
            </td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td><span class="status-badge status-${product.status}">${product.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </td>
        `;
        productsTable.appendChild(row);
    });
}

// Display customers
function displayCustomers() {
    const customersTable = document.getElementById('customersTable');
    if (!customersTable) return;
    
    customersTable.innerHTML = '';
    
    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.orders}</td>
            <td>$${customer.totalSpent.toFixed(2)}</td>
            <td>${new Date(customer.joinedDate).toLocaleDateString()}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-view" onclick="viewCustomer(${customer.id})">View</button>
                    <button class="btn-edit" onclick="editCustomer(${customer.id})">Edit</button>
                </div>
            </td>
        `;
        customersTable.appendChild(row);
    });
}

// Update order count
function updateOrderCount() {
    const orderCount = document.getElementById('orderCount');
    if (orderCount) {
        orderCount.textContent = orders.length;
    }
}

// View order details
function viewOrder(orderId) {
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return;
    
    const modal = document.getElementById('orderModal');
    const modalBody = document.getElementById('orderModalBody');
    
    modalBody.innerHTML = `
        <div class="order-details">
            <div class="order-section">
                <h4>Order Information</h4>
                <div class="order-info-item">
                    <strong>Order ID:</strong>
                    <span>${order.orderId}</span>
                </div>
                <div class="order-info-item">
                    <strong>Date:</strong>
                    <span>${new Date(order.orderDate).toLocaleDateString()}</span>
                </div>
                <div class="order-info-item">
                    <strong>Status:</strong>
                    <span class="status-badge status-${order.status}">${order.status}</span>
                </div>
                <div class="order-info-item">
                    <strong>Payment Method:</strong>
                    <span>${order.payment.method}</span>
                </div>
            </div>
            
            <div class="order-section">
                <h4>Customer Information</h4>
                <div class="order-info-item">
                    <strong>Name:</strong>
                    <span>${order.customer.firstName} ${order.customer.lastName}</span>
                </div>
                <div class="order-info-item">
                    <strong>Email:</strong>
                    <span>${order.customer.email}</span>
                </div>
                <div class="order-info-item">
                    <strong>Phone:</strong>
                    <span>${order.customer.phone}</span>
                </div>
            </div>
        </div>
        
        <div class="order-section">
            <h4>Shipping Address</h4>
            <p>
                ${order.shippingAddress.address}<br>
                ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
                ${order.shippingAddress.country}
            </p>
        </div>
        
        <div class="order-section">
            <h4>Order Items</h4>
            <div class="order-items-list">
                ${order.items.map(item => `
                    <div class="order-item">
                        <div class="order-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="order-item-details">
                            <div class="order-item-name">${item.name}</div>
                            <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                        </div>
                        <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="order-section">
            <h4>Order Summary</h4>
            <div class="order-info-item">
                <strong>Subtotal:</strong>
                <span>$${order.totals.subtotal.toFixed(2)}</span>
            </div>
            <div class="order-info-item">
                <strong>Shipping:</strong>
                <span>$${order.totals.shipping.toFixed(2)}</span>
            </div>
            <div class="order-info-item">
                <strong>Tax:</strong>
                <span>$${order.totals.tax.toFixed(2)}</span>
            </div>
            <div class="order-info-item">
                <strong>Total:</strong>
                <span style="font-weight: 700; color: #ff6b6b;">$${order.totals.total.toFixed(2)}</span>
            </div>
        </div>
        
        <div class="order-actions">
            <button class="btn-edit" onclick="updateOrderStatus('${order.orderId}')">Update Status</button>
            <button class="btn-view" onclick="printOrder('${order.orderId}')">Print</button>
        </div>
    `;
    
    modal.classList.add('active');
}

// Update order status
function updateOrderStatus(orderId) {
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return;
    
    const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    const currentStatusIndex = statuses.indexOf(order.status);
    const nextStatus = statuses[(currentStatusIndex + 1) % statuses.length];
    
    if (confirm(`Change order status from "${order.status}" to "${nextStatus}"?`)) {
        order.status = nextStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Refresh display
        if (currentSection === 'dashboard') {
            displayRecentOrders();
        } else if (currentSection === 'orders') {
            displayOrders();
        }
        
        closeModal('orderModal');
        showNotification('Order status updated successfully', 'success');
    }
}

// Add new product
function addNewProduct() {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('productModalTitle');
    
    title.textContent = 'Add New Product';
    document.getElementById('productForm').reset();
    modal.classList.add('active');
}

// Edit product
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const title = document.getElementById('productModalTitle');
    
    title.textContent = 'Edit Product';
    
    // Fill form with product data
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productImage').value = product.image;
    
    modal.classList.add('active');
}

// Save product
function saveProduct() {
    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value),
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value,
        status: 'active'
    };
    
    // Simple validation
    if (!productData.name || !productData.category || !productData.price || !productData.stock) {
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    // Add or update product
    const existingIndex = products.findIndex(p => p.name === productData.name);
    if (existingIndex >= 0) {
        products[existingIndex] = { ...products[existingIndex], ...productData };
    } else {
        productData.id = products.length + 1;
        products.push(productData);
    }
    
    closeModal('productModal');
    displayProducts();
    showNotification('Product saved successfully', 'success');
}

// Delete product
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        displayProducts();
        showNotification('Product deleted successfully', 'success');
    }
}

// Filter orders
function filterOrders(searchTerm) {
    const filteredOrders = orders.filter(order => 
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    displayFilteredOrders(filteredOrders);
}

// Filter orders by status
function filterOrdersByStatus(status) {
    if (status === 'all') {
        displayOrders();
    } else {
        const filteredOrders = orders.filter(order => order.status === status);
        displayFilteredOrders(filteredOrders);
    }
}

// Display filtered orders
function displayFilteredOrders(filteredOrders) {
    const ordersTable = document.getElementById('ordersTable');
    if (!ordersTable) return;
    
    ordersTable.innerHTML = '';
    
    filteredOrders.forEach(order => {
        const row = createOrderRow(order, false);
        ordersTable.appendChild(row);
    });
}

// Filter customers
function filterCustomers(searchTerm) {
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );
    
    displayFilteredCustomers(filteredCustomers);
}

// Display filtered customers
function displayFilteredCustomers(filteredCustomers) {
    const customersTable = document.getElementById('customersTable');
    if (!customersTable) return;
    
    customersTable.innerHTML = '';
    
    filteredCustomers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.orders}</td>
            <td>$${customer.totalSpent.toFixed(2)}</td>
            <td>${new Date(customer.joinedDate).toLocaleDateString()}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-view" onclick="viewCustomer(${customer.id})">View</button>
                    <button class="btn-edit" onclick="editCustomer(${customer.id})">Edit</button>
                </div>
            </td>
        `;
        customersTable.appendChild(row);
    });
}

// View customer
function viewCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;
    
    showNotification(`Viewing customer: ${customer.name}`, 'info');
}

// Edit customer
function editCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;
    
    showNotification(`Editing customer: ${customer.name}`, 'info');
}

// Export orders
function exportOrders() {
    // Create CSV content
    let csvContent = "Order ID,Customer,Email,Date,Items,Total,Payment,Status\n";
    
    orders.forEach(order => {
        csvContent += `${order.orderId},${order.customer.firstName} ${order.customer.lastName},${order.customer.email},${new Date(order.orderDate).toLocaleDateString()},${order.items.length},$${order.totals.total.toFixed(2)},${order.payment.method},${order.status}\n`;
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    showNotification('Orders exported successfully', 'success');
}

// Send newsletter
function sendNewsletter() {
    showNotification('Newsletter feature coming soon!', 'info');
}

// View all orders
function viewAllOrders() {
    showSection('orders');
}

// Print order
function printOrder(orderId) {
    window.print();
}

// Load settings
function loadSettings() {
    // Load settings from localStorage or use defaults
    const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
    
    document.getElementById('siteName').value = settings.siteName || 'StyleHub';
    document.getElementById('siteEmail').value = settings.siteEmail || 'imjustokon@gmail.com';
    document.getElementById('sitePhone').value = settings.sitePhone || '080-6224-0288';
    document.getElementById('currency').value = settings.currency || 'USD';
    document.getElementById('taxRate').value = settings.taxRate || 8;
    document.getElementById('shippingThreshold').value = settings.shippingThreshold || 50;
}

// Save settings
function saveSettings() {
    const settings = {
        siteName: document.getElementById('siteName').value,
        siteEmail: document.getElementById('siteEmail').value,
        sitePhone: document.getElementById('sitePhone').value,
        currency: document.getElementById('currency').value,
        taxRate: parseFloat(document.getElementById('taxRate').value),
        shippingThreshold: parseFloat(document.getElementById('shippingThreshold').value)
    };
    
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    showNotification('Settings saved successfully', 'success');
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Display pagination
function displayPagination(containerId, totalItems) {
    const pagination = document.getElementById(containerId);
    if (!pagination) return;
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
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
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayOrders();
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

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear admin session
        sessionStorage.removeItem('adminLoggedIn');
        window.location.href = 'index.html';
    }
}

// CEO Profile Management Functions

// Load CEO profile
function loadCEOProfile() {
    const saved = localStorage.getItem('ceoProfile');
    if (saved) {
        ceoProfile = JSON.parse(saved);
        updateCEOProfileUI();
    }
}

// Update CEO Profile UI
function updateCEOProfileUI() {
    const fullnameEl = document.getElementById('ceo-fullname');
    const emailEl = document.getElementById('ceo-email');
    const phoneEl = document.getElementById('ceo-phone');
    const bioEl = document.getElementById('ceo-bio');
    const instagramEl = document.getElementById('ceo-instagram');
    const twitterEl = document.getElementById('ceo-twitter');
    const facebookEl = document.getElementById('ceo-facebook');
    const linkedinEl = document.getElementById('ceo-linkedin');
    
    if (fullnameEl) fullnameEl.value = ceoProfile.name;
    if (emailEl) emailEl.value = ceoProfile.email;
    if (phoneEl) phoneEl.value = ceoProfile.phone;
    if (bioEl) bioEl.value = ceoProfile.bio;
    if (instagramEl) instagramEl.value = ceoProfile.social.instagram;
    if (twitterEl) twitterEl.value = ceoProfile.social.twitter;
    if (facebookEl) facebookEl.value = ceoProfile.social.facebook;
    if (linkedinEl) linkedinEl.value = ceoProfile.social.linkedin;
    
    // Update avatars
    const ceoAvatar = document.getElementById('ceo-avatar');
    const profileAvatar = document.getElementById('profile-ceo-avatar');
    const miniAvatar = document.getElementById('mini-ceo-avatar');
    
    if (ceoAvatar) ceoAvatar.src = ceoProfile.avatar;
    if (profileAvatar) profileAvatar.src = ceoProfile.avatar;
    if (miniAvatar) miniAvatar.src = ceoProfile.avatar;
}

// Update CEO Avatar
function updateCEOAvatar(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            ceoProfile.avatar = e.target.result;
            updateCEOProfileUI();
            saveCEOProfile();
            showNotification('CEO avatar updated successfully!', 'success');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Update Profile CEO Avatar
function updateProfileCEOAvatar(input) {
    updateCEOAvatar(input);
}

// Save CEO Profile
function saveCEOProfile() {
    const fullnameEl = document.getElementById('ceo-fullname');
    const emailEl = document.getElementById('ceo-email');
    const phoneEl = document.getElementById('ceo-phone');
    const bioEl = document.getElementById('ceo-bio');
    const instagramEl = document.getElementById('ceo-instagram');
    const twitterEl = document.getElementById('ceo-twitter');
    const facebookEl = document.getElementById('ceo-facebook');
    const linkedinEl = document.getElementById('ceo-linkedin');
    
    if (fullnameEl) ceoProfile.name = fullnameEl.value;
    if (emailEl) ceoProfile.email = emailEl.value;
    if (phoneEl) ceoProfile.phone = phoneEl.value;
    if (bioEl) ceoProfile.bio = bioEl.value;
    if (instagramEl) ceoProfile.social.instagram = instagramEl.value;
    if (twitterEl) ceoProfile.social.twitter = twitterEl.value;
    if (facebookEl) ceoProfile.social.facebook = facebookEl.value;
    if (linkedinEl) ceoProfile.social.linkedin = linkedinEl.value;
    
    localStorage.setItem('ceoProfile', JSON.stringify(ceoProfile));
    showNotification('CEO profile saved successfully!', 'success');
}

// Toggle CEO Profile
function toggleCEOProfile() {
    // This function can be used to show/hide CEO profile modal
    console.log('CEO Profile toggled');
}

// Check admin authentication
function checkAdminAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
        // Simple password prompt for demo
        const password = prompt('Enter admin password:');
        if (password === 'admin123') {
            sessionStorage.setItem('adminLoggedIn', 'true');
        } else {
            alert('Invalid password');
            window.location.href = 'index.html';
            return;
        }
    }
}

// Initialize admin authentication
checkAdminAuth();
