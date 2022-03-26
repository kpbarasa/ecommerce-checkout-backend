// ==================================================================================================================================
// ==================================================================================================================================
// checkout payPal
// ==================================================================================================================================
// ==================================================================================================================================


const {userInfo} = require('../controllers/user-info') 
const {storeItems, items} = require('../controllers/cart')
const {coupons, couponMap} = require('../controllers/coupons')
const {getTotal} = require('../controllers/functions')

// Paypal node sdk 
const paypal = require("@paypal/checkout-server-sdk") 

// Get shooping cart info
const {shippingAreaList} = require("../controllers/shipping")

const customerId = userInfo.map(lst => lst.id).toString()

// ==================================================================================================================================
// checkout payPal =================================================================================================================
// ==================================================================================================================================

// Check if environment is production 
const Environment =
  process.env.NODE_ENV === "production"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
)

// Checkout Pay Pal
const checkoutPayPal = async (req, res) => {  
  const request = new paypal.orders.OrdersCreateRequest()
  const shipingInfoId = (req.body.shipping.map(lst => lst.id)).toString()
  const shipingInfoArea = req.body.shipping.map(lst => lst.area)
  const shipingInfoType = req.body.shipping.map(lst => lst.type)
  const shipingInfoCost = req.body.shipping.map(lst => lst.cost)
  const couponId = req.body.coupon 


  request.prefer("return=representation")

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        // Order amount here 
        amount: {
          currency_code: "USD",
          value: getTotal,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: getTotal,
            },
          },
        },
        // Shipping oprtions here 
        shipping: {
          options: [
            {
                id: Number(shipingInfoId),
                label: shipingInfoArea.toString(),
                type: shipingInfoType.toString(),
                selected: true,
                amount: {
                    value: Number(shipingInfoCost),
                    currency_code: "USD"
                }
            }, 
            // {
            //   id: "SHIP_123",
            //   label: "Free shipping",
            //   type: "SHIPPING",
            //   selected: false,
            //   amount: {
            //       value: "0.00",
            //       currency_code: "USD"
            //   },
            // },
          ]
        },
        // Purchased items here 
        items: items.map(item => {
          const storeItem = storeItems.get(item.id)
          return {
            name: storeItem.name,
            unit_amount: {
              currency_code: "USD",
              value: storeItem.price,
            },
            quantity: item.quantity,
          }
        }),
      },
    ],
  })

  try {
    // Paypal clien order processing request 
    const order = await paypalClient.execute(request)
    console.log(order)
    res.json({ id: order.result.id })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
  
}

module.exports = {
    checkoutPayPal
}