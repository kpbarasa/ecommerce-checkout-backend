// ==================================================================================================================================
// ==================================================================================================================================
// create Order
// ==================================================================================================================================
// ==================================================================================================================================

const customerOrders = require('../models/customer_orders.model')

// create Order
const createOrder = (res, oId, total) => {
  
    const order_id = oId
    const customer_id = '#57365253'
    const product_id = "#98476446"
    const total_cost = total
    const qty = 4
    const shipping_type = "none"
    const shipping_status = "pending"
    const order_status = "pending"
  
    const customerOrder = new customerOrders({
      order_id,
      customer_id,
      product_id,
      total_cost,
      qty,
      shipping_type,
      shipping_status,
      order_status
    })
  
     customerOrder.save()
     .then(console.log("order created"))
     .catch(err => res.status(400).json('Error: unable to create order' + err))
     
  }

  module.exports ={createOrder}