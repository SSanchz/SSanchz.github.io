// models/product.js
const mongoose = require('mongoose');

// Define a Product schema
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    image: String,
    status: String,
    Num_id: Number,
    Name_id: String,
    color: String,
});

// Export the model
module.exports = mongoose.model('Rock_Samples', productSchema, 'products');
