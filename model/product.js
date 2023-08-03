const mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    product_id: { type: String, require: true },
    product_name: { type: String },
    product_price: { type: Number },
    product_quantity: { type: Number },
    product_category: { type: String },
    product_size: [{ type: String }] ,
    product_color: { type: String },
    product_description: { type: String },
    product_image: [{ type: String }],
    product_default: { type: Boolean }
});

const product = mongoose.model('product',productSchema);

module.exports = product;