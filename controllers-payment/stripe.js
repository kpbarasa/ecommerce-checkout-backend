// ==================================================================================================================================
// ==================================================================================================================================
// STRIPE COMPONETES
// Stripe checkout code 
// 1 Stripe checkout 
// 
// 2 stripe checkout success
//   2.1 Save sale transaction 
//   2.2 Save shipping details
//   2.3 Set cookie order id
//   2.4 Return success viewd 
// 
// 2 stripe checkout Cancle
// ==================================================================================================================================
// ==================================================================================================================================

const { default: axios } = require('axios');
const {userInfo} = require('../controllers/user-info')  
const {storeItems, items} = require('../controllers/cart') 
const {coupons, couponMap} = require('../controllers/coupons')
const {saveSale,saveProductSales} = require('../controllers/sales') 
const {funcSaveShippingDetails} = require('../controllers/shipping') 

// Generate Order Id
const {generate_id, getTotal, couponTotal} = require('../controllers/functions')  

var stripeSessionId = [] 
var stripeTransactiogItems = []
var ShippingArea = "" 
var shippingLocation = "" 
var getDiscount = []
var getcouponId = ""
var OrderId = generate_id(10)
var customerId =  userInfo.map(lst => lst.id).toString()


// ==================================================================================================================================
// Stripe  =========================================================================================================================
// ==================================================================================================================================
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

// 1 Stripe checkout 
const checkoutStripe = async (req, res) => {
  try { 
    const shipingInfoArea = req.body.shipping.map(lst => lst.area)
    const shipingInfoLocation = req.body.shipping.map(lst => lst.location)
    const shipingInfoCost = req.body.shipping.map(lst => lst.cost)

    // Get coupon total 
    const couponTotal = req.body.coupon.reduce((sum, coupon) => {
      return sum + couponMap.get(Number(coupon.id)).price
    }, 0)   
    const couponId = req.body.coupon.map(lst => lst.id)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment", 
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: Number(shipingInfoCost)*100,
              currency: 'usd',
            },
            display_name: shipingInfoArea.toString(), 
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 1,
              },
            }
          }
        }, 
      ],
      
      line_items: items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.price*100,
          },
          quantity: item.quantity,
        }
      }),

      success_url: `${process.env.CLIENT_URL}/checkout/stripe/success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/stripe/cancle`,

    })
    stripeSessionId.push(session.id) 
    stripeTransactiogItems.push(items.map(item => item))
    ShippingArea = (shipingInfoArea)  
    shippingLocation = (shipingInfoLocation)  
    getDiscount.push(couponTotal)
    getcouponId = couponId 

    console.log(session)

    res.json({ url: session.url })

  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

// 2 stripe checkout success
const checkoutStripeSuccess = async (req, res) => {

  try {  
    console.log('.......... Stripe Checkout Success ..................')
    const options ={
      headers: {'Authorization': 'Bearer '+process.env.STRIPE_PRIVATE_KEY+''}
    }

    const getSession = await axios.get(`https://api.stripe.com/v1/checkout/sessions/${stripeSessionId[0]}`,options)
    .then(res => res.data)    
    console.log(getSession)
    //   2.1 Save sale transaction    
    saveSale(
      customerId,
      OrderId,
      (getSession.payment_method_types+" stripe").toString(), 
      getTotal,
      (getSession.payment_status).toString(),
      Number(getSession.shipping_options.map(lst => lst.shipping_amount))/100,
      couponTotal(getcouponId),
      (getcouponId).toString()

    )

    saveProductSales(
      OrderId,
      customerId,
      stripeTransactiogItems,
      (getSession.payment_method_types).toString(),
    )
    
    //   2.2 Save shipping details
    funcSaveShippingDetails( 
      OrderId,
      ShippingArea, 
      shippingLocation, 
      Number(getSession.shipping_options.map(lst => lst.shipping_amount))/100,
      'processing'
      )

    // 2.3 Set cookie order id 
    res.cookie('O_id', '#O_id'+OrderId, {signed: true, maxAge:(1000 * 60 * 100)})
    
    // 2.4 Return to index view
    res.render("success", {
      paypalClientId: process.env.PAYPAL_CLIENT_ID,
    })

  } 
  catch (error) {
    res.json(error)
    res.status(400).json('Error: unable to process transaction' + error) 
  }
  
}

// stripe checkout Cancle
const checkoutStripeCancle = async (req, res) => {
  
  res.render("checkout", {
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
  })
}

module.exports = {
    checkoutStripe,
    checkoutStripeSuccess,
    checkoutStripeCancle
}