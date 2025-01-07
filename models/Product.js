// models/product.js
const mongoose = require('mongoose');

// Define a Product schema
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    image: String,
    status: String,
    Num_id: Number,
    Name_id: String
});

// Export the model
module.exports = mongoose.model('Granite', productSchema, 'Rock_Samples.Granite');
