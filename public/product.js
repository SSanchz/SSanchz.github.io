document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        try {
            const response = await fetch(`/api/products/${productId}`);
            const product = await response.json();

            // Set main product image
            document.getElementById('main-image').src = product.image;

            // Populate thumbnails if multiple images exist
            const thumbnails = document.getElementById('thumbnails');
            const images = [product.image]; // Add more images if available
            thumbnails.innerHTML = images.map(img => `
                <img src="${img}" alt="${product.name}" class="thumbnail">
            `).join('');

            // Change main image on thumbnail click
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.addEventListener('click', () => {
                    document.getElementById('main-image').src = thumb.src;
                });
            });

            // Populate product details
            const productInfo = document.getElementById('product-info');
            productInfo.innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Color:</strong> ${product.color}</p>
                <p><strong>Thickness:</strong> ${product.thickness} mm</p>
                <p><strong>Status:</strong> ${product.status}</p>
            `;
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    } else {
        document.getElementById('product-info').innerHTML = '<p>Product not found.</p>';
    }
});
