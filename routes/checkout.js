const express = require('express')  
const access = require('../middleware/mpesa-acess')
const accessOrder = require('../middleware/order-acces')
const router = express.Router()  


// CONTOLLERS  ==========================================================================================================
// ======================================================================================================================
const {CheckoutMpesa, mpesaCallBackUrl} = require('../controllers-payment/mpesa')
const {checkoutPayPal } = require('../controllers-payment/paypal') 
const {checkoutStripe, checkoutStripeSuccess, checkoutStripeCancle} = require('../controllers-payment/stripe')
const {getCoupons} = require('../controllers/coupons')
const {cart, cartItems, cartTotal } = require('../controllers/cart')
const {saveTransaction, saleInVoice, salesReport, ProductSalesReport, saleSuccess, saleTransSuccess} = require('../controllers/sales') 
const {shippingArea, shippingLocation, saveShippingDetails, getShippingDetails} = require('../controllers/shipping')



// ROUTES  ==============================================================================================================
// ======================================================================================================================

// CHECKOUT MAIN VIEW HERE
router.get("/", (req, res) => {
    res.render("checkout", {
      paypalClientId: process.env.PAYPAL_CLIENT_ID,
    })
})

// Success view 
router.get("/success", accessOrder, (req, res) => {
  try { 
    res.render("success")

  } 
  catch (error) { 
    res.status(400).json('Error: unable to load succes view' + error)
  }
})

router.get("/sale/success",accessOrder, (saleSuccess))

router.get("/cancel", (req, res) => {res.render("index")})  

router.get("/sale/Transaction/success", (saleTransSuccess))


// COUPONS   ===========================================================================================================
router.get('/coupons', (getCoupons))

// PAYMENT   ===========================================================================================================
// m-pesa 
router.post('/mpesa/:transActionId/:phoneNo', access, (CheckoutMpesa))

// mpesa success
router.post('/mpesa/success', (mpesaCallBackUrl))

// Pay pal 
router.post('/paypal', (checkoutPayPal)) 

// stripe
router.post('/stripe', (checkoutStripe))

// stripe success
router.get('/stripe/success',(checkoutStripeSuccess))

// stripe cancle
router.get('/stripe/cancle', (checkoutStripeCancle))



// CART  ================================================================================================================
// get cart 
router.get('/cart', (cart))

// get cart items 
router.get('/cart/items', (cartItems))

// Get cart total
router.get('/cart/total', (cartTotal))

// SALES  ================================================================================================================
// save sales 
router.post('/save', (saveTransaction))

// get invoice 
router.get('/invoice/:orderId', (saleInVoice)) 
router.get('/sale/report/:orderId', (salesReport))
router.get('/sale/product/report/:orderId', (ProductSalesReport))

// SHIPPING  ==============================================================================================================
// Shipping information
router.post('/shipping', (saveShippingDetails)) 

// area 
router.get('/shipping/area', (shippingArea))

// location
router.get('/shipping/location', (shippingLocation))

// Get shipping details
router.get('/shipping/details', (getShippingDetails)) 


module.exports = router