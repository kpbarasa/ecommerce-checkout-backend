// ==================================================================================================================================
// ================================================================================================================================== 
  // Function generate token 
  // Get full date y/m/d  
  // Get full date y/m/d/h/m/s
  // Get Cart total 
  // Get coupon total 
  // Get Net total 
  // Get Full total 
// ==================================================================================================================================
// ==================================================================================================================================

const {storeItems, items} = require('../controllers/cart')
const {couponMap} = require('../controllers/coupons')

// Function generate token 
function generate_id(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
  }

// Get full date y/m/d  
function getDate() {
  var date = new Date(),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2)
    day = ("0" + date.getDate()).slice(-2)
    hours = ("0"+date.getHours()).slice(-2)
    min =("0"+date.getMinutes()).slice(-2)
    secs = ("0"+date.getSeconds()).slice(-2)
  return date.getFullYear()+""+[mnth+""+day].join(",");
}

// Get full date y/m/d/h/m/s
function fullDate() {
  var date = new Date(),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2)
    day = ("0" + date.getDate()).slice(-2)
    hours = ("0"+date.getHours()).slice(-2)
    min =("0"+date.getMinutes()).slice(-2)
    secs = ("0"+date.getSeconds()).slice(-2)
  return date.getFullYear()+""+[mnth+""+day+""+hours+""+min+""+secs].join(",");
}

  
  // Get Cart total 
  const getTotal = items.reduce((sum, item) => {
    return sum + storeItems.get(item.id).price * item.quantity
  }, 0)

  // Get coupon total 
  const couponTotal = (getcouponId) => getcouponId.reduce((sum, coupon) => {
    return sum + couponMap.get(Number(coupon)).price
  }, 0)  
    
  // Get Net total 
 function getNetTotal(total, couponTotal, shippingCost){   
   const tax_rate = 0.14
   const tax = total * tax_rate 
   const netTotal = Number(tax + total) 
   return netTotal
  }
  
  // Get Full total 
function getFullTotal(total, couponTotal, shippingCost){   
  const tax_rate = 0.14
  const tax = total * tax_rate  
  const fullTotal = (Number(total) - couponTotal) +tax + Number(shippingCost) 
  return fullTotal
 }
module.exports = {generate_id, getDate, fullDate, getTotal, getNetTotal, getFullTotal, couponTotal}