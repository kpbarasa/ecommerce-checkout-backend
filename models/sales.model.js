const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saleSchema = new Schema({
  user_id: {
    type: String,
    required: true, 
    // unique: true,
    // index:{unique: true}, 
    trim: true
    
  },
  order_id: {
    type: String,
    unique: true,
    required: true, 
    trim: true
    
  },
  payment_type: {
    type: String,
    required: true, 
    trim: true
    
  },
  discout_rate: {
    type: Number,
    required: true, 
    trim: true
    
  },
  discout: {
    type: Number 
    
  },
  coupon_id: {
    type: String 
    
  },
  tax_rate: {
    type: Number,
    required: true, 
    trim: true
    
  },
  tax: {
    type: Number,
    required: true, 
    trim: true
    
  },
  sub_total: {
    type: Number,
    required: true, 
    trim: true
    
  },
  net_total: {
    type: Number,
    required: true, 
    trim: true
    
  },
  shipping: {
    type: Number,
    required: true, 
    trim: true
    
  }
}, {
  timestamps: true,
});

const sales = mongoose.model('sales', saleSchema);

module.exports = sales;