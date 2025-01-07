
// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/granite_store', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define a Product schema and model
const productSchema = new mongoose.Schema({
    name: String,
    color: String,
    image: String,
    description: String
});

const Product = mongoose.model('Product', productSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/api/products', async (req, res) => {
    try {
        const colorFilter = req.query.color;
        let query = {};
        if (colorFilter) {
            query.color = colorFilter;
        }
        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

/* Steps to Run the Project:
1. Install dependencies: npm install express mongoose body-parser
2. Start MongoDB server: Run 'mongod' in a separate terminal
3. Add product data to the MongoDB database manually or via a separate script
4. Start the server: node app.js
5. Open http://localhost:3000 in the browser */
