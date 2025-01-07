
// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://dbUser:dbPass@cluster0.fx7yg.mongodb.net/Rock_Samples?retryWrites=true&w=majority', {
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