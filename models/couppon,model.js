const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coupon = new Schema({
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

const coupon_info = mongoose.model('coupon', coupon);

module.exports = coupon_info;