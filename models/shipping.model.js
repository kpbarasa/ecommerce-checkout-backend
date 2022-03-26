const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shipping_info = new Schema({
  order_id: {
    type: String,
    required: true,  
    trim: true,
    minlength: 3
  },
  area: {
    type: String,
    required: true,  
    trim: true,
    minlength: 3
  },
  location: {
    type: String,
    trim: true,
    minlength: 3
  },
  cost: {
    type: Number,
    required: true, 
    trim: true,
    minlength: 3
  },
  shipping_status: {
    type: String,
    required: true,  
    trim: true,
    minlength: 3
  }
}, 
{
  timestamps: true,
});

const shipping = mongoose.model('shipping_info', shipping_info);

module.exports = shipping;