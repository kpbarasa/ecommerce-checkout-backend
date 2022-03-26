const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customer_orders_Schema = new Schema({
   order_id:{
      type: String, 
      required: true, 
      unique:true,
      trim: true,
      minlength: 1
   },
   customer_id:{
      type: String, 
      required: true, 
      trim: true,
      minlength: 1
   },
   total_cost:{
     type: Number, 
     required: true, 
     trim: true,
     minlength: 3
   }, 
   qty:{
      type: Number, 
      required: true, 
      trim: true,
      minlength: 1
   },
   shipping_type:{
    type: String,
    required: true,   
    trim: true,
    minlength: 3
   },
   shipping_status:{
    type: String,
    required: true, 
    trim: true,
    minlength: 3
   },
   order_status:{
      type: String, 
      required: true, 
      trim: true,
      minlength: 3
   }
}, {
  timestamps: true,
});

const customer_order = mongoose.model('customer_order', customer_orders_Schema);

module.exports = customer_order;