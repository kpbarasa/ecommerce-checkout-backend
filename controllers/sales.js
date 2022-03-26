// ==================================================================================================================================
// ==================================================================================================================================
// SALES COMPONENT 
// Save transaction 
// Save sale
// Get product sales report 
// Save sales report 
// Save sale inVoice  
// ==================================================================================================================================
// ==================================================================================================================================

const productSales = require('../models/product_sales.model') 
const newSales = require('../models/sales.model')  
const {funcSaveShippingDetails} = require('./shipping') 
const {generate_id, getTotal, couponTotal} = require('../controllers/functions')  
const {storeItems, items} = require('../controllers/cart')
const {userInfo} = require('../controllers/user-info')  


const customerId = userInfo.map(lst => lst.id).toString()
const paymentType ="paypal"
var OrderId = generate_id(10)

// Save transaction  ================================================================================================
const saveTransaction = (req, res) => {

  try { 

    const couponId = req.body.coupon.map(lst => lst.id) 
    const shipingInfoArea = req.body.shipping.map(lst => lst.area).toString()
    const shipingInfoLocation = req.body.shipping.map(lst => lst.location).toString()
    const shipingInfoCost = (req.body.shipping.map(lst => lst.cost)).toString()

    // save sale 
    saveSale(
      customerId,
      OrderId,
      req.body.paymentType,
      getTotal,
      req.body.items.status, 
      shipingInfoCost,
       couponTotal(couponId),
      (couponId).toString()
    )
    
    // save products sale 
    saveProductSales( 
      OrderId,
      customerId,
      req.body.items,
      paymentType,
    )
    
    
    // Save shipping details
    funcSaveShippingDetails( 
      OrderId,
      shipingInfoArea, 
      shipingInfoLocation, 
      shipingInfoCost,
      'processing'
      )
  
    console.log("Transaction saved")
  
  } catch (error) {
    res.status(400).json('Error: unable to save transaction ' +error)
  }
  
} 

const saleTransSuccess = (req, res) => {
  res.cookie('O_id', '#O_id'+OrderId, {signed: true, maxAge:(1000 * 60 * 100)})
  res.render("success")
}

// Save sale  ================================================================================================
const saveSale = async (cId, oId, type, tt, pStatus, shippingCost, discountValue, couponId) => { 
    const user_id = cId
    const order_id = oId
    const payment_type = type
    const discout_rate = 0.05
    const total = tt    
    const discout = discountValue === "" ? 0 : discountValue
    const coupon_id = couponId === "" ? 0 : couponId
    const tax_rate = 0.14
    const tax = tt * tax_rate    
    const shipping = shippingCost
    const sub_total = tt 
    const net_total = (Number(tt) - discout) + Number(tax) + Number(shipping)
    const payment_status = pStatus
    
    const newsale = await new newSales({
        user_id,
        order_id,
        payment_type,
        total,    
        discout_rate,
        discout,
        coupon_id,
        tax_rate,
        tax,
        shipping,
        sub_total,
        net_total
      });
      newsale.save() 
      // .then()  
      console.log("sale saved succefully");
    
}
  
  
// Save product sales  =======================================================================================
const saveProductSales = async (oId, cId, orderItems, orderPaymentType) => {

  items.map(lst => 
      
      {
        product_id = lst.id
        order_id = oId
        product_sku = storeItems.get(lst.id).sku
        product_cat = storeItems.get(lst.id).cat
        price = storeItems.get(lst.id).price
        qty = lst.quantity
        customer_id = cId
        payment_type = orderPaymentType
    
        const newproductSale = new productSales({
          product_id,
          order_id,
          price,
          qty,
          customer_id,
          product_sku,
          payment_type,
          product_cat
        }); 
      
        newproductSale.save()  
        // .then(console.log("sale products saved  succefully"))
      }
    )
}

// Save sale inVoice  =======================================================================================
const saleInVoice = (req, res) => {
    newSales.find()
    // .then(sales => sales.json())
    .then(sales => res.json(sales) )
    .catch(e => res.status(400).json('Error: unable get sales invoice' +e.error))
}

// Save sales report  =======================================================================================
const salesReport = async (req, res) =>{ 
  try {  
    if(!req.signedCookies.O_id){
      var filter = req.params.id

      newSales.findOne({order_id: filter}, function (err, sale) {
        res.json(sale)
      })
    }
    else {
      var filter = (req.signedCookies.O_id).split("#O_id")[1] 

      newSales.findOne({order_id: filter}, function (err, sale) {
        res.json(sale)
      })
    }
  } catch (error) {
    res.status(400).json('Error: unable to find report ' + error)
  } 
}

// Get product sales report  =======================================================================================
const ProductSalesReport = (req, res) =>{ 
  try { 
    var filter = req.signedCookies.O_id !== "" ? (req.signedCookies.O_id).split("#O_id")[1] : req.params.id
    productSales.find({order_id: filter}, function (err, sale) {
      res.json(sale)
    })
  } catch (error) {
    res.status(400).json('Error: unable to find report ' + error)
  } 
}

// Get saleSuccess  sales  =======================================================================================
const saleSuccess = (req, res) =>{  
  if(!req.signedCookies.O_id){
    res.cookie('O_id', '#O_id'+OrderId, {signed: true, maxAge:(1000 * 60 * 100)})
        res.json("success")
  }else{
    res.clearCookie('O_id') 
    res.cookie('O_id', '#O_id'+OrderId, {signed: true, maxAge:(1000 * 60 * 100)})
        res.json("success")
  }
}

module.exports ={
  saveTransaction, 
  saleTransSuccess,
  saleInVoice, 
  saveSale, 
  saveProductSales, 
  salesReport, 
  ProductSalesReport,
  saleSuccess}