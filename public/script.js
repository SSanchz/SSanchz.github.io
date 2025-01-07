// Fetch and display products with filters
async function fetchProducts(filters = {}) {
    try {
        // Convert filters object to query string
        const queryString = new URLSearchParams(filters).toString();
        const response = await fetch(`/api/products?${queryString}`);
        const products = await response.json();
        const productList = document.getElementById('product-list');

        productList.innerHTML = products.map(product => `
            <div class="product-card" data-id="${product._id}">
                <img src="${product.image}" alt="${product.name}" style="width:100%; height:150px; object-fit:cover;">
                <h3>${product.name}</h3>
                <p class="${product.status === 'In-Stock' ? 'status-In-Stock' : 'status-outofstock'}">${product.status}</p>
                <p>Price: ${product.price}</p>
            </div>
        `).join('');

        // Add click event listeners to product cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const productId = card.getAttribute('data-id');
                window.location.href = `/product.html?id=${productId}`;
            });
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Apply filters on form submit
document.getElementById('filter-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get filter values
    const color = document.getElementById('color').value;
    const category = document.getElementById('category').value;
    const thickness = document.getElementById('thickness').value;
    const surfaceFinishing = document.getElementById('surface-finishing').value;

    // Create filters object
    const filters = {
        ...(color && { color }),
        ...(category && { category }),
        ...(thickness && { thickness }),
        ...(surfaceFinishing && { surfaceFinishing })
    };

    // Fetch products with applied filters
    fetchProducts(filters);
});

// Initial fetch without filters
fetchProducts();