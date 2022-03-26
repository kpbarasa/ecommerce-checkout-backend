const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const product_sales_Schema = new Schema({
   product_id: {
      type: String, 
      required: true, 
      trim: true,
      minlength: 1
   },
   order_id: {
     type: String, 
     required: true, 
     trim: true,
     minlength: 3
   },
   price: {
    type: Number,
    required: true, 
    trim: true,
    minlength: 3
   },
   qty:{
      type: String, 
      required: true, 
      trim: true,
      minlength: 1
   },
   customer_id: {
    type: String,
    required: true,   
    trim: true,
    minlength: 3
   },
   product_sku: {
      type: String, 
      required: true, 
      trim: true,
      minlength: 3
   },
   payment_type: {
    type: String,
    required: true, 
    trim: true,
    minlength: 3
   },
   product_cat: {
      type: String, 
      required: true, 
      trim: true,
      minlength: 3
   }
}, {
  timestamps: true,
});

const product_sales = mongoose.model('product_sales', product_sales_Schema);

module.exports = product_sales;