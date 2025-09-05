// Mobile Header
document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('mobile-burger-btn');
    const navMenu = document.getElementById('mobile-nav-menu');
    const header = document.querySelector('.site-header');

    if (!burgerBtn || !navMenu || !header) return;

    // Toggle menu
    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navMenu.classList.toggle('show');
        burgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close when clicking outside the header
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            navMenu.classList.remove('show');
            burgerBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navMenu.classList.remove('show');
            burgerBtn.setAttribute('aria-expanded', 'false');
        }
    });
});

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart
function addToCart(name, price, image = '') {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1, image });
    }
    updateCart();
}

// Update Cart
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    if (cartItemsDiv) {
        cartItemsDiv.innerHTML = '';

        if (cart.length === 0) {
            cartItemsDiv.classList.add('empty-cart');
            cartItemsDiv.innerHTML = `
                <img src="assets/images/cart.png" alt="Cart Icon">
                <p>Your Cart is Empty</p>
            `;
        } else {
            cartItemsDiv.classList.remove('empty-cart');

            cart.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');

                itemDiv.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>₱${item.price}</p>
                        <div class="cart-quantity">
                            <button onclick="changeQuantity('${item.name}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="changeQuantity('${item.name}', 1)">+</button>
                        </div>
                    </div>
                `;
                cartItemsDiv.appendChild(itemDiv);
            });
        }

        const totalPrice = document.getElementById('total-price');
        if (totalPrice) {
            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            totalPrice.textContent = `₱${total}`;
        }
    }

    // ✅ Update both desktop & mobile counts
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCount = document.querySelector('.cart-count');
    if (cartCount) cartCount.textContent = totalCount;

    const mobileCartCount = document.querySelector('.mobile-cart-count');
    if (mobileCartCount) mobileCartCount.textContent = totalCount;

    // Preview logic
    const previewItemsDiv = document.querySelector('.cart-preview-items');
    const previewTotalDiv = document.querySelector('.cart-preview-total');
    const emptyPreview = document.querySelector('.empty-preview');

    if (previewItemsDiv && previewTotalDiv && emptyPreview) {
        previewItemsDiv.innerHTML = '';
        if (cart.length === 0) {
            emptyPreview.style.display = 'block';
            previewTotalDiv.textContent = '';
        } else {
            emptyPreview.style.display = 'none';
            let total = 0;
            cart.forEach(item => {
                total += item.price * item.quantity;
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-preview-item');
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <p>${item.name}</p>
                        <small>${item.quantity} × ₱${item.price}</small>
                    </div>
                `;
                previewItemsDiv.appendChild(itemDiv);
            });
            previewTotalDiv.textContent = "Total: ₱" + total;
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}


// Change item quantity
function changeQuantity(name, change) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
    }
    updateCart();
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", () => {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCart();
});



/* Mobile Cart Scroller */
document.addEventListener("DOMContentLoaded", () => {
    const scrollBtn = document.getElementById("scroll-to-cart");
    const cartSection = document.querySelector(".cart");

    let isDragging = false;
    let offsetX, offsetY;

    scrollBtn.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - scrollBtn.getBoundingClientRect().left;
        offsetY = e.clientY - scrollBtn.getBoundingClientRect().top;
        scrollBtn.style.transition = "none"; 
    });

    document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    const maxX = window.innerWidth - scrollBtn.offsetWidth;
    const maxY = window.innerHeight - scrollBtn.offsetHeight;

    const newX = Math.min(Math.max(0, x), maxX);
    const newY = Math.min(Math.max(0, y), maxY);

    scrollBtn.style.left = `${newX}px`;
    scrollBtn.style.top = `${newY}px`;
    scrollBtn.style.right = "auto";
    scrollBtn.style.bottom = "auto";
});

    document.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;
            scrollBtn.style.transition = "transform 0.2s ease"; 
        }
    });

    scrollBtn.addEventListener("touchstart", (e) => {
        isDragging = true;
        const touch = e.touches[0];
        offsetX = touch.clientX - scrollBtn.getBoundingClientRect().left;
        offsetY = touch.clientY - scrollBtn.getBoundingClientRect().top;
        scrollBtn.style.transition = "none";
    });

    document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const x = touch.clientX - offsetX;
    const y = touch.clientY - offsetY;

    const maxX = window.innerWidth - scrollBtn.offsetWidth;
    const maxY = window.innerHeight - scrollBtn.offsetHeight;

    const newX = Math.min(Math.max(0, x), maxX);
    const newY = Math.min(Math.max(0, y), maxY);

    scrollBtn.style.left = `${newX}px`;
    scrollBtn.style.top = `${newY}px`;
    scrollBtn.style.right = "auto";
    scrollBtn.style.bottom = "auto";
});

    document.addEventListener("touchend", () => {
        if (isDragging) {
            isDragging = false;
            scrollBtn.style.transition = "transform 0.2s ease";
        }
    });

    scrollBtn.addEventListener("click", () => {
        if (!isDragging && cartSection) {
            cartSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});






// Search bar functionality
document.getElementById('searchBar').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        const description = product.querySelector('p').textContent.toLowerCase();

        if (name.includes(searchTerm) || description.includes(searchTerm)) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
});


// Filters
function applyFilters() {
    const category = document.getElementById('filterCategory').value;
    const ratingFilter = document.getElementById('filterRating').value;
    const sortPrice = document.getElementById('sortPrice').value;
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();

    let products = Array.from(document.querySelectorAll('.product-card'));

    // Filter by category
    products.forEach(product => {
        const matchesCategory = (category === 'all' || product.dataset.category === category);
        const productName = product.querySelector('h3').textContent.toLowerCase();
        const matchesSearch = productName.includes(searchQuery);

        const productRating = parseInt(product.dataset.rating) || 5;
        const matchesRating = (ratingFilter === 'all' || productRating === parseInt(ratingFilter));


        if (matchesCategory && matchesSearch && matchesRating) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });

    // Sort by price
    if (sortPrice !== 'default') {
        const productList = document.querySelector('.product-list');
        const visibleProducts = products.filter(p => p.style.display !== 'none');

        visibleProducts.sort((a, b) => {
            const priceA = parseInt(a.querySelector('.price').textContent.replace('₱', ''));
            const priceB = parseInt(b.querySelector('.price').textContent.replace('₱', ''));
            return sortPrice === 'asc' ? priceA - priceB : priceB - priceA;
        });

        visibleProducts.forEach(p => productList.appendChild(p)); // re-order in DOM
    }
}

// Attach event listeners
document.getElementById('filterCategory').addEventListener('change', applyFilters);
document.getElementById('filterRating').addEventListener('change', applyFilters);
document.getElementById('sortPrice').addEventListener('change', applyFilters);
document.getElementById('searchBar').addEventListener('input', applyFilters);


// Checkout button
document.getElementById('checkout-btn').addEventListener('click', function () {
    if (cart.length === 0) {
        alert("Your cart is empty! Add something first.");
        return;
    }

    let receiptHTML = "<ul style='text-align:left;'>";
    cart.forEach(item => {
        receiptHTML += `<li>${item.quantity} × ${item.name} - ₱${item.price * item.quantity}</li>`;
    });
    receiptHTML += "</ul>";

    document.getElementById('receipt-details').innerHTML = receiptHTML;

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('receipt-total').textContent = `₱${total}`;

    document.getElementById('receipt-popup').style.display = 'flex';
});

// Handle Confirm
document.getElementById('confirm-order').addEventListener('click', function () {
    document.getElementById('receipt-popup').style.display = 'none';
    document.getElementById('checkout-popup').style.display = 'flex';

    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });
});

// Handle Cancel
document.getElementById('cancel-order').addEventListener('click', function () {
    document.getElementById('receipt-popup').style.display = 'none';
});

// Close Popup
document.getElementById('close-popup').addEventListener('click', function () {
    document.getElementById('checkout-popup').style.display = 'none';

    startRatingFlow(cart);

    cart = [];
    updateCart();
});



window.addEventListener('click', function (e) {
    if (e.target === document.getElementById('checkout-popup')) {
        document.getElementById('checkout-popup').style.display = 'none';
    }
});


//  Rating System  
function startRatingFlow(products) {
    if (products.length === 0) return;

    // Create overlay
    const ratingPopup = document.createElement('div');
    ratingPopup.classList.add('rating-popup');
    ratingPopup.innerHTML = `
        <div class="rating-content">
            <h3>Rate Your Purchases</h3>
            
            <!-- Global rating buttons -->
           <div class="global-rating">
                <span>Rate all:</span>
                <div class="rate-all-stars">
                    <button class="rate-all" data-star="1">★</button>
                    <button class="rate-all" data-star="2">★</button>
                    <button class="rate-all" data-star="3">★</button>
                    <button class="rate-all" data-star="4">★</button>
                    <button class="rate-all" data-star="5">★</button>
                </div>
            </div>


            <div id="rating-list"></div>
            <button id="submit-rating">Submit Ratings</button>
        </div>
    `;
    document.body.appendChild(ratingPopup);

    const ratingList = ratingPopup.querySelector("#rating-list");

    // Build product rating rows
    products.forEach(product => {
        const productRow = document.createElement("div");
        productRow.classList.add("rating-row");
        productRow.innerHTML = `
            <span class="product-name">${product.name}</span>
            <div class="stars">
                ${[1, 2, 3, 4, 5].map(star => `<span data-star="${star}">★</span>`).join('')}
            </div>
        `;
        ratingList.appendChild(productRow);

        // Default rating = 5
        let selectedRating = 5;
        const stars = productRow.querySelectorAll(".stars span");
        stars.forEach((s, i) => {
            if (i < 5) s.classList.add("selected");
        });

        // Click-to-select (no hover)
        stars.forEach(star => {
            star.addEventListener("click", () => {
                selectedRating = star.getAttribute("data-star");
                stars.forEach(s => s.classList.remove("selected"));
                for (let i = 0; i < selectedRating; i++) {
                    stars[i].classList.add("selected");
                }
                product.rating = selectedRating;
            });
        });

        // Save default rating initially
        product.rating = selectedRating;
    });

    // Global rating buttons (rate all products at once)
    ratingPopup.querySelectorAll(".rate-all").forEach(btn => {
        btn.addEventListener("click", () => {
            const ratingValue = parseInt(btn.getAttribute("data-star"));

            // Update global stars (make 1 → ratingValue active)
            const allStars = ratingPopup.querySelectorAll(".rate-all");
            allStars.forEach(s => s.classList.remove("active"));
            for (let i = 0; i < ratingValue; i++) {
                allStars[i].classList.add("active");
            }

            // Update each product row
            ratingList.querySelectorAll(".rating-row").forEach((row, idx) => {
                const stars = row.querySelectorAll(".stars span");
                stars.forEach(s => s.classList.remove("selected"));
                for (let i = 0; i < ratingValue; i++) {
                    stars[i].classList.add("selected");
                }
                products[idx].rating = ratingValue;
            });
        });
    });

    // Submit button
    ratingPopup.querySelector("#submit-rating").addEventListener("click", () => {
        console.log("User Ratings:", products);

        // Update stars in product cards
        products.forEach(product => {
            const productCard = [...document.querySelectorAll('.product-card')]
                .find(card => card.querySelector('h3').textContent === product.name);

            if (productCard) {
                const ratingContainer = productCard.querySelector('.rating');
                if (ratingContainer) {
                    ratingContainer.innerHTML = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
                    productCard.setAttribute('data-rating', product.rating);
                }
            }
        });

        ratingPopup.remove();
    });
}


document.querySelectorAll('.product-card').forEach(card => {
    const ratingContainer = card.querySelector('.rating');
    const rating = parseInt(card.getAttribute('data-rating')) || 5;
    if (ratingContainer) {
        ratingContainer.innerHTML = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }
});

// Auto-add product from URL parameters
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const price = params.get("price");
    const image = params.get("image");

    if (name && price) {
        addToCart(name, parseInt(price), image);
    }
});














