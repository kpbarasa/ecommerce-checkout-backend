function fetchInvoiceItems (){ 
    fetch("http://localhost:5000/checkout/sale/product/report/Xt7JmB5FQT")
    .then(function (res){ return res.json()})
    .then(function(data){ 
      data.map(items => {
        document.querySelector("#invoice-items").innerHTML+=
        `
      <tr> 
        <td class="col-9" colspan=""><span class="d-block">${items.product_id}</span><span class="d-block small text-muted">qty ${items.qty} </span></td>  
        <td><span class="d-block">Ksh ${items.price*items.qty} </span><span class="d-block small text-muted">Ksh ${items.price} each</span></td>
      </tr>
      `
      })
    })
    .catch(function(err){console.warn("error")})
  
  }

  fetchInvoiceItems()


function CountCart(){ 
    fetch("http://localhost:5000/checkout/cart")
    .then(function (res){ return res.json()})
    .then(function(data){ 
      
      document.querySelector("#count").innerHTML = data.length
    })
    .catch(function(err){console.warn("error")})
  
  }

CountCart()


  function getInvoice () {
    fetch("http://localhost:5000/checkout/sale/report/Xt7JmB5FQT")
    .then(res => res.json())
    .then(res =>  
      {document.querySelector("#payment-type").innerHTML = res.payment_type 
      document.querySelector("#order-id").innerHTML = res.order_id
      document.querySelector("#date").innerHTML = res.createdAt.split("T")[0]
      document.querySelector("#discount").innerHTML = res.discout
      document.querySelector("#tax-rate").innerHTML = res.tax_rate
      document.querySelector("#tax").innerHTML = res.tax
      document.querySelector("#sub-total").innerHTML = res.sub_total 
      document.querySelector("#net-total").innerHTML = res.net_total} 
    )
    .then(res => console.log(res))
    .catch(e => e.error)

    
    fetch("http://localhost:5000/checkout/shipping/details")
    .then(res => res.json())
    .then(res =>  
      {document.querySelector("#shipping-date").innerHTML = res.createdAt.split("T")[0]
      document.querySelector("#shipping-area").innerHTML = res.area
      document.querySelector("#shipping-location").innerHTML = res.location
      document.querySelector("#shipping-cost").innerHTML = res.cost
      document.querySelector("#shipping-status").innerHTML = res.shipping_status } 
    )
    // .then(res => console.log(res))
    .catch(e => e.error)
  }
  getInvoice()

  
  function getListProducts () {
    fetch("http://localhost:5000/checkout/sale/product/report/Xt7JmB5FQT")
    .then(res => res.json())
    .then(res =>  
      {document.querySelector("#payment-type").innerHTML = res.payment_type 
      document.querySelector("#order-id").innerHTML = res.order_id
      document.querySelector("#date").innerHTML = res.createdAt
      document.querySelector("#discount").innerHTML = res.discout
      document.querySelector("#tax-rate").innerHTML = res.tax_rate
      document.querySelector("#tax").innerHTML = res.tax
      document.querySelector("#sub-total").innerHTML = res.sub_total
      document.querySelector("#shipping").innerHTML = res.sub_total
      document.querySelector("#net-total").innerHTML = res.net_total} 
    )
    .then(res => console.log(res))
    .catch(e => e.error)
  } 

  
  function getDate() {
    var date = new Date(),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2)
      day = ("0" + date.getDate()).slice(-2)
      hours = ("0"+date.getHours()).slice(-2)
      min =("0"+date.getMinutes()).slice(-2)
      secs = ("0"+date.getSeconds()).slice(-2)
      console.log(date.getFullYear());
    return [day+"/"+mnth].join(",")+"/"+date.getFullYear();
}
