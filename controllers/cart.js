// ==================================================================================================================================
// ==================================================================================================================================
// CART COMPONENT
// Sore item
// cart items  
// Get shoppingcart
// Get cart items (id & quantity)
// Get cart total 
// ==================================================================================================================================
// ==================================================================================================================================

// STORE ITEM  
const storeItems = new Map([
    [1, { price: 1400, name: "Learn React Today", sku: "#097343864", cat: "#1224356"}],
    [2, { price: 2000, name: "Learn CSS Today", sku: "#4575847", cat: "#2389573857" }],
    [3, { price: 2500, name: "Learn HTML Today", sku: "#4575847", cat: "#2389573857" }],
    [4, { price: 4300, name: "Learn Docker Today", sku: "#4575847", cat: "#2389573857" }],
    [5, { price: 1200, name: "Learn Python Today", sku: "#4575847", cat: "#2389573857" }], 
    [6, { price: 2200, name: "Learn Java Today", sku: "#4575847", cat: "#2389573857" }], 
    [8, { price: 1000, name: "Learn Java Today", sku: "#4575847", cat: "#2389573857" }], 
  ])

// cart items  
const items = [ 
    { id: 1, quantity: 2 },
    { id: 2, quantity: 3 },
    { id: 3, quantity: 3 },
    { id: 4, quantity: 3 },
    { id: 5, quantity: 3 },
    { id: 6, quantity: 3 },
  ]

// Get shoppingcart  ============================================================================================
const cart = ("/cart", (req, res) => {

    const cart = items.map(item => {
  
      const storeItem = storeItems.get(item.id)
  
      return  {
          currency: "Ksh",
          product_name: storeItem.name,
          unit_amount: storeItem.price,
          amount: (storeItem.price) * item.quantity,
          quantity: item.quantity,
      }
      
    })
    res.json(cart) 
  })
  
  // Get cart items (id & quantity)  ========================================================================================
  const cartItems = ("/cart/items", (req, res) => {
  
    const cartItem = items.map(item => { 
  
      return  {
          id: item.id,
          quantity: item.quantity,
      }
      
    })
    res.json(cartItem) 
  })
  
  // Get cart total  =======================================================================================================
  const cartTotal = (req, res) => {
    
    try {
      const total = items.reduce((sum, item) => {
        return sum + storeItems.get(item.id).price * item.quantity
      }, 0)   
    
      res.json(total) 
      
    } catch (error) {
      res.status(400).json('Error: unable to grt cart ' + err)
    }
  }
  
  module.exports = {
      cart,
      cartItems,
      cartTotal,
      storeItems, 
      items
  }