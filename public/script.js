// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Global variables ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var arrOne = ""
var shippingCost = ""
var shippingArea = ""
var shippingLocation = ""
var arrCoupon = []



var loadingScreen = function() {

  var loader = document.getElementById('loading');
  var i = 1;

  function loop () {
    setTimeout(function() {
      loader.append('.');
      i++;
      if (i < 5) {
        loop();
      }
    }, 1000);
  }
  
  loop();
  
  setTimeout(function() {
    loader.innerHTML = loader.innerHTML.replace(/\./g, '');
  }, 5000);
  
};

loadingScreen();

setInterval(function() {
  loadingScreen();
}, 5000);


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Evaluation ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var processEvaluation = false

function Evaluate(){
  
  // shipping
  // Check Area 
  if( document.querySelector('#shipping-area-select').value === '0,0'){
    document.querySelector('#shipping-area-label').innerHTML="<span class='text-danger'><i class='fa fa-info'></i> select shippimg area</span>"
    alert("select shipping area")
    return 
  }
  document.querySelector('#shipping-area-label').innerHTML=""

  // Check location 
  if( document.querySelector('#shipping-location-select').value === '0'){
    document.querySelector('#shipping-location-label').innerHTML="<span class='text-danger'><i class='fa fa-info'></i> select shippimg location</span>"
    alert("select shipping location") 
    return 
  }
  
  if( document.querySelector('#shipping-area-select').value != '0,0' &&  document.querySelector('#shipping-location-select').value != '0'){
    return processEvaluation = true 
  }
  

  // Check Payment 
}

function showLoader(id, desc){
  document.querySelector('#loader').style.display = "block"
  document.querySelector('#paymenyType').innerHTML= id
  document.querySelector('#paymenyDesc').innerHTML= desc
}

function hideLoader(id){
  document.querySelector('#loader').style.display = "none"
}

function validatePhonr(){
  var phoneNo = document.querySelector('#phone-no').value
  var phoneNoAlert = document.querySelector('#phone-no-alert')
  if(phoneNo.length == 12){ 
    phoneNoAlert.classList.remove('text-danger')
    phoneNoAlert.classList.add('text-success')
    phoneNoAlert.innerHTML="Success"
  
  }
  else if(phoneNo.length > 12){ 
    phoneNoAlert.classList.remove('text-success')
    phoneNoAlert.innerHTML="Phone number length too long"
    phoneNoAlert.classList.add('text-danger')

  }
  else if(phoneNo.length < 12){ 
    phoneNoAlert.classList.remove('text-success')
    phoneNoAlert.classList.add('text-danger')
    phoneNoAlert.innerHTML="Phone number length too long"  
  }
}

function validatePayment(id){ 
   console.log(id)
  if(id === "paypal"){
    document.querySelector("#m-pesa-info").classList.toggle('d-none')
    document.querySelector("#stripe-info").classList.toggle('d-none')
  } 
  if(id === "mpesa"){ 
    document.querySelector("#paypal-info").classList.toggle('d-none')
    document.querySelector("#stripe-info").classList.toggle('d-none') 
  }    
  if(id === "stripe"){
    document.querySelector("#m-pesa-info").classList.toggle('d-none')
    document.querySelector("#paypal-info").classList.toggle('d-none')
  }  
  if(id === ""){
    document.querySelector("#m-pesa-info").classList.remove('d-none')
    document.querySelector("#paypal-info").classList.remove('d-none')
    document.querySelector("#stripe-info").classList.remove('d-none')
  }
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// SHIPPING ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Area 
function getshippingArea(){
  fetch("http://localhost:5000/checkout/shipping/area")
  .then(res => res.json())
  .then(res => res.map((res, index) => {
      document.querySelector('#shipping-area-select').innerHTML += `<option value="${res.area+","+res.cost}">${res.area}</option>`
  })) 
  .catch(e => e.error)
}

// Location 
function getshippingLocation(){
  
  // FUnction sum(shipping + cart total)
  shippingCartTotal()

  // Filter location area value 
  let areaVar = document.querySelector("#shipping-area-select").value.split(",")[0]    

  fetch("http://localhost:5000/checkout/shipping/location")
  .then(res => res.json())
  .then(res => res.filter(res => res.area === areaVar).map((res, index) => { 
      document.querySelector('#shipping-location-select').innerHTML += `<option value="${res.location}">${res.location}</option>`
  })) 
  .catch(e => e.error)

} 

// Shipping area select on change get shipping total 
document.querySelector("#shipping-area-select").addEventListener("change",() => {getShippingTotal()})

// Shipping total map to (#shipping-area-select) html element
function getShippingTotal(){  
  document.querySelector('#shipping-cost').innerHTML = document.querySelector("#shipping-area-select").value.split(",")[1] 
}

// SHipping + Cart Total 
async function shippingCartTotal(){

  
  shippingCost = document.querySelector("#shipping-area-select").value.split(",")[1] 

  if(shippingCost != ""){

    const cartTotal = await fetch("http://localhost:5000/checkout/cart/total")
    .then(res => res.json())
    .then(res => res)
    // GEt sum of cart total and shipping cost 
     var nTotal = Number(shippingCost) + Number(cartTotal)
     
     document.querySelector("#sub-total").innerHTML = Number(cartTotal)
      document.querySelector("#total-cost").innerHTML = nTotal

      arrOne = nTotal
    
    return nTotal

  }

}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CART (id and quantity)+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const shoppingCart = []

const  cartDetails = async () =>{

  const cartData = await fetch("http://localhost:5000/checkout/cart/items")
  .then(res => res.json())
  .then(data => shoppingCart.push(data))  
  .catch(function(err){console.warn("error")}) 

} 

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CART (customer products)+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
async function fetchcart (){ 
   
  showLoader()

  await fetch("http://localhost:5000/checkout/cart")
  .then(function (res){ return res.json()})
  .then(function(data){ 
    data.map(items => {
      document.querySelector("#cart-content").innerHTML+=
      `
    <tr> 
      <td class="col-8" colspan="">
        <span class="d-block h6">${items.product_name}</span><span class="d-block small text-muted">Quantity ${items.quantity} </span>
        </td>  
        <td>
        <a class="btn btn-sm text-muted btn-link cart-btn"> <i class="fa fa-times"></i> </a>
        <span class="d-block h5"> <small>${items.currency}</small> ${items.amount} </span><span class="d-block small text-muted">${items.currency} ${items.unit_amount} each</span>
      </td>
    </tr>
    `
    })
  })
  .then(() => hideLoader())
  .catch(function(err){console.warn("error")})
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CART TOTAL ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function fetchcartTotal(){
  fetch("http://localhost:5000/checkout/cart/total")
  .then(function(res){return res.json()})
  .then(function(data){ 
    document.querySelector("#cart-total").innerHTML = data

  })
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// PAYPAL ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
paypal
  .Buttons({  
    createOrder: async function () {  

      Evaluate()  
    
       if(processEvaluation === true){ 
       
         return await fetch("/checkout/paypal", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             items: [ 
               { id: 1, quantity: 2 },
               { id: 2, quantity: 3 },
               { id: 3, quantity: 3 },
               { id: 4, quantity: 3 },
               { id: 5, quantity: 3 },
               { id: 6, quantity: 3 },
             ],  
             shipping: [
               {id:2, area: document.querySelector("#shipping-area-select").value.split(",")[0], type:"SHIPPING", selected:true, cost: shippingCost,}
             ],
             coupon: arrCoupon
           }),
         })
           .then(res => {
             if (res.ok) return res.json()
             return res.json().then(json => Promise.reject(json))
           })
           .then(({ id }) => {
             return id
           })
           .catch(e => {
             console.error(e.error)
           })

           showLoader("pay pal")

       }
    },
    onApprove: async function (data, actions) { 

      await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders/'+data.orderID, {
        method:"get",
        headers: {
          'Authorization': 'bearer '+data.facilitatorAccessToken+'', 
          'Content-Type': 'application/json', 
      },
        // body: JSON.stringify({items: data}),
      }) 
      .then(function (res){ return res.json()})
      .then(function (data){ 
        
        fetch("http://localhost:5000/checkout/save", {
          method:"post",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(
              {
                items: data,  
                shipping: [
                  {
                    id:document.querySelector("#shipping-area-select").value.split(",")[0], 
                    area: document.querySelector("#shipping-area-select").value.split(",")[0], 
                    location: document.querySelector("#shipping-location-select").value, 
                    cost: shippingCost,
                  }
                ],
                coupon: arrCoupon,
                paymentType: "paypal",
              }
            ),
        })
       })  
       .then( async function (res){  
          await fetch("http://localhost:5000/checkout/sale/success")
          window.location = "http://localhost:5000/checkout/success"
        }) 
       .catch(e => e.error) 

        if(data){
          window.location = "http://localhost:5000/checkout/success"
        }
      
      return actions.order.capture()
    },
  })
  .render("#paypal")

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// STRIPE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const button = document.querySelector("#stripe-id") 
button.addEventListener("click", async () => { 

  Evaluate()  

   if(processEvaluation === true){
     
    await fetch("http://localhost:5000/checkout/stripe", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         items: [ 
           { id: 1, quantity: 2 },
           { id: 2, quantity: 3 },
           { id: 3, quantity: 3 },
           { id: 4, quantity: 3 },
           { id: 5, quantity: 3 },
           { id: 6, quantity: 3 },
         ],
         shipping: [
           {id:2, area: document.querySelector("#shipping-area-select").value.split(",")[0], location: document.querySelector("#shipping-location-select").value, cost: shippingCost,}
         ],
         coupon: arrCoupon
       }),
     })
       .then(res => {
         if (res.ok) return res.json()
         return res.json().then(json => Promise.reject(json))
       })
       .then(({ url }) => {
         window.location = url
       })
       .catch(e => {
         console.error(e.error)
       })
       
    showLoader("stripe")
   }
})


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// M-PESA ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const mPesa = document.querySelector("#m-pesa")
const safPhoneNo = document.querySelector("#phone-no")
const Desc = 
  "<div class='alert alert-success list-num'>"+
  "<div class='mpesa-help'><i class='fa fa-info'></i> Help</div>"+
    "<ul class=''>"+
    " <li class='small'>Enter phone number <b>254700000000 </b></li>"+
      "<li class='small'>check phone for safaricom prompt</li>"+
      "<li class='small'>check safaricom prompt confirm amaount</li>"+
      "<li class='small'>enter safaricom pin</li>"+
    "</ul> "+
  "</div> "
document.querySelector("#mpesa-info").innerHTML= Desc
mPesa.addEventListener("click", async () => { 
  
  
  Evaluate()
    
   showLoader("mpesa", Desc)

   if(processEvaluation === true){
    await fetch(`http://localhost:5000/checkout/mpesa/${arrOne}/${safPhoneNo.value}`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         items: [ 
           { id: 1, quantity: 2 },
           { id: 2, quantity: 3 },
           { id: 3, quantity: 3 },
           { id: 4, quantity: 3 },
           { id: 5, quantity: 3 },
           { id: 6, quantity: 3 },
         ],
         shipping: [
           {id:2, area: document.querySelector("#shipping-area-select").value.split(",")[0], location: document.querySelector("#shipping-location-select").value, cost: shippingCost,}
         ],
         coupon: arrCoupon,
       }),
     }) 
      .then(() => hideLoader("mpesa", Desc))
      .catch(e => {
        console.error(e.error)
      })
      

   }
})



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// COUPONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
async function getCoupons(){
  await fetch("http://localhost:5000/checkout/coupons")
  .then(res => res.json())
  .then(res => 
  {
    res.filter(coupon => coupon.type === "two").map((coupon, index) => 
      document.querySelector('#coupon-area').innerHTML += 
      `
      <div class="p-3 col-4">
      <div class="card p-2">
      <div class="form-check form-check-inline pb-2">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox${coupon._id}" value=${coupon._id} onchange="getCoupon(${coupon._id})" /> 
        <small>Coupon</small>
      </div>
      <div class="form-check form-check-inline"> 
        <label class="form-check-label h5" for="inlineCheckbox1">  <small>${coupon.type === "one" ? "" : "Ksh"}</small> ${coupon.price} <small>${coupon.type === "one" ? "%  Off" : ""}</small></label>
      </div> 
      </div>
      </div>
      `
      )
    
  }
  )
}

async function getCouponsType2(){
  await fetch("http://localhost:5000/checkout/coupons")
  .then(res => res.json())
  .then(res => 
  {
    res.filter(coupon => coupon.type === "one").map((coupon, index) => 
      document.querySelector('#coupon-area2').innerHTML += 
      `
      <div class="p-3 col-4">
      <div class="card p-2">
      <div class="form-check form-check-inline pb-2">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox${coupon._id}" value=${coupon._id} onchange="getCoupon(${coupon._id})" /> 
        <small>Coupon</small>
      </div>
      <div class="form-check form-check-inline"> 
        <label class="form-check-label h5" for="inlineCheckbox1">  <small>${coupon.type === "one" ? "" : "Ksh"}</small> ${coupon.price} <small>${coupon.type === "one" ? "%  Off" : ""}</small></label>
      </div> 
      </div>
      </div>
      `
      )
    
  }
  )
}

function getCoupon(id){
  
  if(document.getElementById("inlineCheckbox"+id+"").checked){ 
    arrCoupon.push({id:(document.getElementById("inlineCheckbox"+id+"").value).toString()}) 
  }
  else if(!document.getElementById("inlineCheckbox"+id+"").checked){ 
    
    const index = arrCoupon.indexOf((document.getElementById("inlineCheckbox"+id+"").value).toString()) 

    arrCoupon.splice(index,index === 0 ? 1 : index)

  }
}


getshippingArea()
getshippingLocation()
fetchcartTotal()
cartDetails()
fetchcart()
getCoupons()
// getCouponsType2()
