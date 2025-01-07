// Fetch and display products
async function fetchProducts(color = '') {
    try {
        const response = await fetch(`/api/products?color=${color}`);
        const products = await response.json();
        const productList = document.getElementById('product-list');
        productList.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" style="width:100%">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span>Color: ${product.color}</span>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Fetch and display products
async function fetchProducts(color = '') {
    try {
        const response = await fetch(`/api/products?color=${color}`);
        const products = await response.json();
        const productList = document.getElementById('product-list');
        productList.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" style="width:100%; height:150px; object-fit:cover;">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span>Color: ${product.color}</span>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Search bar event listener
document.getElementById('search-bar').addEventListener('input', (event) => {
    const color = event.target.value;
    fetchProducts(color);
});

// Initial fetch
fetchProducts();

