// ==================================================================================================================================
// ==================================================================================================================================
// Checkout Mpesa (LIPA NA MPESA C2B),
// mpesaCallBackUrl (LIPA NA MPESA C2B  SUCCESS RESPONSE)
// ==================================================================================================================================
// ==================================================================================================================================

const request = require('request')
const {couponMap} = require('../controllers/coupons')
const {userInfo} = require('../controllers/user-info') 
const {storeItems, items} = require('../controllers/cart')
const {getTotal, couponTotal,  fullDate} = require('../controllers/functions')
const {saveSale, saveProductSales} = require('../controllers/sales')
const {funcSaveShippingDetails} = require('../controllers/shipping') 

// Generate Order Id
const {generate_id} = require('../controllers/functions') 
const { default: axios } = require('axios')

const customerId = userInfo.map(lst => lst.id).toString()
var OrderId = generate_id(10)
const payment_method = "m-pesa"
var ShippingArea = "" 
var shippingLocation = "" 
var shippingCost = ""
var getDiscount = []
var getcouponId = ""


// Checkout Mpesa (LIPA NA MPESA C2B),
const CheckoutMpesa = (req, res) => { 

    ShippingArea = req.body.shipping.map(lst => lst.area)
    shippingLocation = req.body.shipping.map(lst => lst.location)
    shippingCost = req.body.shipping.map(lst => lst.cost) 
    getcouponId = req.body.coupon.map(lst => lst.id)  
    const safPhoneNo = req.params.phoneNo
    const tranactionID = req.params.transActionId 

    const endpoint = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    let auth = "Bearer " + req.access_token
    let date = new Date()
    const phoneNo = safPhoneNo
    // const phoneNo = 254703553986
    const paybbilNo = "174379"
    const transactionType = "CustomerPayBillOnline"
    const transAmount ="1"
    // const transAmount =getFullTotal(total, couponTotal, shippingCost).toString()
    const callBackURL ="https://5b3e-102-140-248-201.ngrok.io/checkout/mpesa/success"
    const timestamp = fullDate() 
    const accountReference = "123Test"
    const transactionDesc = "paybill for test checkout application"
    const password = new Buffer.from('174379' + 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919' + timestamp).toString('base64')
    
    request(
        {
            url: endpoint,
            method: "POST",
            headers: {
                "Authorization": auth
            },
            json: {   
                "BusinessShortCode":paybbilNo,    
                "Password":password,   
                "Timestamp":timestamp,    
                "TransactionType":transactionType,    
                "Amount":transAmount,    
                "PartyA":phoneNo,    
                "PartyB":paybbilNo,    
                "PhoneNumber":phoneNo,    
                "CallBackURL":callBackURL,    
                "AccountReference":accountReference,    
                "TransactionDesc":transactionDesc
            }
        },
        function (error, response, body) {
            if (error) { 
                res.status(400).json('Error: unable to process transaction' + err) 
            }
            else { 
                console.log(body)
                res.status(200).json(body)
            }
        }
    )
}

// mpesaCallBackUrl (LIPA NA MPESA C2B  SUCCESS RESPONSE)
const mpesaCallBackUrl = async (req, res) => {
  
  console.log('.......... STK Callback Success ..................')

  const resultsAll = req.body.Body.stkCallback 
  const merchantRequestID = req.body.Body.stkCallback.MerchantRequestID 
  const checkoutRequestID = req.body.Body.stkCallback.CheckoutRequestID 
  const resultCode = req.body.Body.stkCallback.ResultCode
  const resultDesc = req.body.Body.stkCallback.ResultDesc
  console.log(resultsAll)   

  if(req.body.Body.stkCallback.CallbackMetadata){
    
    try {
      const callBackMetadata = req.body.Body.stkCallback.CallbackMetadata
      const callBackMetadataAmount = callBackMetadata.Item.filter(lst => lst.Name === "Amount" ).map(lst => lst.Value)
      const callBackMetadataPhoneNumber = callBackMetadata.Item.filter(lst => lst.Name === "PhoneNumber" ).map(lst => lst.Value)
      const callBackMetadataTransactionDate = callBackMetadata.Item.filter(lst => lst.Name === "TransactionDate" ).map(lst => lst.Value)
      const callBackMetadataMpesaReceiptNumber = callBackMetadata.Item.filter(lst => lst.Name === "ReceiptNumber" ).map(lst => lst.Value)
  
      // SAVE SALE TRANSACTION     
      saveSale(
        customerId,
        OrderId,
        "mpesa", 
        getTotal,
        "auto to delete",
        (shippingCost).toString(),
        couponTotal(getcouponId),
        (getcouponId).toString()
      )
  
      saveProductSales(
        OrderId,
        (customerId).toString(),
        items,
        "mpesa", 
      ) 
  
      funcSaveShippingDetails( 
        OrderId,
        ShippingArea, 
        shippingLocation, 
        (shippingCost).toString(),
        'processing'
      )  

      axios.get("http://localhost:5000/checkout/sale/Transaction/success")
      .then(console.log("rrrrrrrrrrrrrrrrrrrr"))
      
    } 
    catch (error) { 
      res.status(400).json('Error: unable to  get call back url' + error) 
    }
       
   }
   else{
     console.log("Unsuccessfull Request accepted for processing")
     res.json("Unsuccessfull Request not accepted for processing") 
   }
  
     
}


module.exports = {   
    CheckoutMpesa,
    mpesaCallBackUrl 
  }