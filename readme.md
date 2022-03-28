<h5>Features present in the app :-<h5>

<p>
Simple eccommerce checkout back-end appllication with: Authentication, Shopping Cart processing, Sale transaction processing(PayPal, Stripe & M-Pesa API), Couppon discount options and Shipping processing.
</p>

1. Endpoints authentication
   1. Authenticate user
   2. Authenticate orders
   3. Authenticate Sales trans actions 

2. Get Shopping cart information 
   1. shopping cart items
   2. shopping cart Total

3. Get Coupon information  

4. Sale transaction 
   1. paypal Checkout
   2. Mpesa checkout
   3. Mpesa success
   4. Stripe checkout checkout
   5. Stripe checkout success
   6. Save sales
   7. Save sold products
   8. Get sales recent sales information

5. Get User information

6. Shipping processes
   1. Create Shiping order after completetion of sale transaction
   2. Get shipping information

<h5>APPP COMPONENETS INDEX:-<h5> 

1.NODE DEPENDENCIES

2.ROUTES/ENDPOINTS 

3.CONTROLLERS

  3.1 CONTROLLERS PAYMENT

4.MIDDLEWARE

5.MODELS

6.VIEWS

7.PUBLIC files

8.ENV
 
<h5>APP COMPONENETS :-<h5>
<h5>1. NODE DEPENDENCIES =========================================================================<h5>
<p>
"@paypal/checkout-server-sdk": "^1.0.3",

"axios": "^0.26.1",

"cookie-parser": "^1.4.6",

"cors": "^2.8.5",

"dotenv": "^16.0.0",

"ejs": "^3.1.6",

"express": "^4.17.3",

"mongoose": "^6.2.3",

"request": "^2.88.2",

"stripe": "^8.205.0"
</p>

<h5>
<h5>
Git ignore files ===============================================================================

1.    node_module

2.    .env

<h5>

<h5>Features present in the app :-<h5>

<p>
Simple eccommerce checkout back-end appllication with: Authentication, Shopping Cart processing, Sale transaction processing(PayPal, Stripe & M-Pesa API), Couppon discount options and Shipping processing.
</p>

1. Endpoints authentication
   1. Authenticate user
   2. Authenticate orders
   3. Authenticate Sales trans actions 

2. Get Shopping cart information 
   1. shopping cart items
   2. shopping cart Total

3. Get Coupon information  

4. Sale transaction 
   1. paypal Checkout
   2. Mpesa checkout
   3. Mpesa success
   4. Stripe checkout checkout
   5. Stripe checkout success
   6. Save sales
   7. Save sold products
   8. Get sales recent sales information

5. Get User information

6. Shipping processes
   1. Create Shiping order after completetion of sale transaction
   2. Get shipping information

<h5>APPP COMPONENETS INDEX:-<h5> 

1.NODE DEPENDENCIES

2.ROUTES/ENDPOINTS 

3.CONTROLLERS

  3.1 CONTROLLERS PAYMENT

4.MIDDLEWARE

5.MODELS

6.VIEWS

7.PUBLIC files

8.ENV
 
<h5>APP COMPONENETS :-<h5>
<h5>1. NODE DEPENDENCIES =========================================================================<h5>
<p>
"@paypal/checkout-server-sdk": "^1.0.3",

"axios": "^0.26.1",

"cookie-parser": "^1.4.6",

"cors": "^2.8.5",

"dotenv": "^16.0.0",

"ejs": "^3.1.6",

"express": "^4.17.3",

"mongoose": "^6.2.3",

"request": "^2.88.2",

"stripe": "^8.205.0"
</p>

<h5>
<h5>
Git ignore files ===============================================================================

1.    node_module

2.    .env

<h5>
2. ROUTES/ENDPOINTS ============================================================================
</h5>
<p>
2.1   /index

2.2   /checkout

2.2.1 /checkout/success

2.2.3 /checkout/cancle

2.3   /checkout/coupons 

      controller: Get coupons 
</p>

<h5>

2.4   MPESA
</h5>
<p>
2.4.1 /checkout/mpesa/:id/:shipping

      controller: CheckoutMpesa (LIPA NA MPESA C2B)

2.4.2 /checkout/stk_callback

      controller: mpesaCallBackUrl (LIPA NA MPESA C2B  SUCCESS RESPONSE)
</p>

<h5>

2.5 Pay Pal
</h5>
<p>
2.3.1 /checkout/paypal

   <h6 dir="head1234">controller</h6> 

      checkoutPayPal
</p>

<h5>

2.6 Stripe
</h5>
<p>
2.6.1 /checkout/stripe

      controller: checkout Stripe

2.6.2 /checkout/stripe/success

      controller: checkoutStripe Success

2.6.2 /checkout/stripe/cancle

      controller: checkoutStripe Cancle
</p>

<h5>

2.7  Cart
</h5>
<p>
2.7.1 /checkout/cart 

      controller: cart items   

2.7.2 /checkout/cart/items

      controller: Get cart items (id & quantity)

1.7.3 /checkout/cart/total

      controller: Get cart total 
</p>

<h5>

2.8  Sales & Invoice
</h5>

<p>
2.8.1 /checkout/save

      controller: save transaction  

2.8.2 /checkout/invoice/:id

      controller: sale InVoice 

2.8.3 /checkout/sale/report/:id

      controller: sales Report 

2.8.4 /checkout/sale/product/report/:id

      controller: Product SalesReport
</p>

<h5>
2.9 Shipping
</h5>
<p>
2.9.1 /checkout/shipping

      controller: Save Shipping Details

2.9.2 /checkout/shipping/area 

      controller: Shipping Area 

2.9.3 /checkout/shipping/location

      controller: Shipping Location

2.9.4 /checkout/shipping/details  

      controller: Get Shipping Details 
</p>


4. MIDDLEWARE  ============================================================================
</h5>

      1 Mpesa (authentification access token)  (mpesa-access.js)
<br>  

      2 Order access (authentification)  (order-access.js)

<h5>

5. MODELS  ============================================================================
</h5>

      1 Coupon Model  (coupon.model.js)
<br>  

      2 Customer Orders  (customer_orders.model.js)
<br>  

      3 Product Sales   (shipping.model.js)
<br>  

      4 Sales model  (sales.model.js)
<br>  

      5 Shipping model  (shipping.model.js)

<h5>

6. VIEWS  ============================================================================
</h5>

      1 Cancle.ejs

      2 checkout.ejs

      3 Index.ejs

      4 Success.ejs

<h5>

 7. Public files  ======================================================================
</h5>
 
      resul.js
        
      script.js

      main.css
  
<h5>

8. env  ============================================================================
</h5>

      ATLAS_URI=mongodb+srv://<UserName>:<password>.4p1ws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

      PAYPAL_CLIENT_ID=<Client id here>
      PAYPAL_CLIENT_SECRET=<Secrete here>

      STRIPE_PRIVATE_KEY=<Key here>
      CLIENT_URL=http:// 

      SAFARICOM_AUTH_TOKEN=<token here>
      SAFARICOM_CLIENT_URL=https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials


      COOKIE_SECRETE=<secrete here>
      
<h5>
3. CONTROLLERS   ============================================================================

3.3 Functions (function.js)
</h5>

<p>

   3.3.1 Function generate token 
            
            Function:-
            
                  generate token :  generate_id(length)
            
            
            Result:-

                  <return token>

<br>
   3.3.2 Get  date 
            
            Function:-
            
                  Get date:  GetFullDate(date)
            
            
            Result:-

                  <return y/m/d >

<br>
   3.3.3 Get full date 
            
            Function:-
            
                  Get full date:  GetFullDate(date)
            
            Result:-

                  <return y/m/d/h/m/s >

<br>
   3.3.4 Get Cart total   
            
            Function:-
            
                  Get Cart Total:  cartTotal(3.1.3 cart items, 3.1.2 Store item )
            
            Result:-

               <return Tota> 

<br>
   3.3.5 Get coupon total   
            
            Function:-
            
                  Get Coupon Total: 3.2.2 coupons ++
            
            Result:-

               <return Tota>

<br>
   3.3.6 Get Net total   
            
            Function:-
            
                  Get Net Total: tax + total
            
            Result:-

               <return Tota>

<br>
   3.3.7 Get Full total 
            
            Function:-
            
                  Get Full Total: (Total- Discount(Coupons)) + Tax + shippingCost
            
            Result:-

               <return cost>
</p>


3.1 Shopping cart (cart.js) 
</h5>

<p>

   3.1.2 Store item
            
            Result:-

                  Map([
                        ["Product id", { price: "000", name: "product title", sku: "#0000000", cat: "Cat Id"}],
                  ])
<br>
   3.1.3 cart items  
            
            Result:-
            
                  [
                        { id: "Product id", quantity: "0" },
                  ]

<br>
   3.1.4 Get shoppingcart
            
            Result:-
            
                  {"Product id", price: "000", name: "product title", sku: "#0000000", cat: "Cat Id"}

<br>
   3.1.5 Get cart items (id & quantity)
            
            Result:-
            
                  { id: "Product id", quantity: "0" },

<br>
   3.1.6 Get cart total

            functions:-
                  3.3.4 Get Cart total( 3.1.3 cart items )
            
            Result:-
            
                  {total: 00.00},

</p>


<h5> 
3.2 Coupons (coupons.js)
</h5>

<p> 

<br>
   3.2.2 coupons
            
            Result:-

                  Map([
                        ["cupon id", { price: "000", startDate: "", endDate: "", type: "", desc: ""}],
                  ])

<br>
   3.2.3 Get coupons 
            
            Result:-

                  <coupons>

</p>


 
<h5> 
3.4 Orders (orders.js)
</h5> 

<p>

      3.4.1 create order
            
            Function:-

               save order
            
            Result:-

               console.log("order created")
  
</p>



<h5> 
3.5 Sales (sales.js) 
</h5>

<p>

      3.5.1 save transaction

      3.5.2 sale InVoice 

      3.5.3 save Sale 

      3.5.4 save ProductSales

      3.5.5 sales Report 

      3.5.6 Product SalesReport

      3.5.7 sale Success
</p>



<h5> 
3.6 Shipping (shipping.js)
</h5>

<p>

      3.5.1 Shipping Area

      3.5.2 Shipping Location

      3.5.3 Save Shipping Details

      3.5.4 Get Shipping Details

      3.5.5 Save Shipping Details

      3.5.6 Shipping Area List
   
      3.5.7 Shipping LocationList
</p>


<h5> 
3.7 user info (user-info.js)
</h5>
<p>

      3.7.1 User Info
</p>

<h5>

3.1 CONTROLLERS PAYMENT ============================================================================
</h5>

<h5> 
3.1.1 Mpesa (mpesa.js)
</h5>
      CheckoutMpesa (LIPA NA MPESA C2B)

         Returns-:
            "MerchantRequestID"
            "CheckoutRequestID"
            "ResponseCode"
            "ResponseDescription"
            "CustomerMessage" 

      mpesaCallBackUrl (LIPA NA MPESA C2B  SUCCESS RESPONSE)

         Returns-:
          stkCallback:
            "MerchantRequestID"
            "CheckoutRequestID"
            "ResultCode"
            "ResultDesc"
            CallbackMetadata-:
               "Amount"
               "PhoneNumber"
               "TransactionDate"
               "ReceiptNumber"
          
<h5> 
3.1.2 Paypal (paypal.js) "Pay pal client execute request"
</h5>   
      checkoutPayPal

         Result: {
            id
            intent
            status
            purchase_units
            create_time
            links
         }

<h5> 
3.1.3 Stripe (stripe.js)
</h5>
      checkout Stripe
      
         Result:- 
         id
         object
         amount_subtotal
         amount_total
         cancel_url 
         currency
         expires_at
         metadata
         mode
         payment_method_types
         payment_status
         shipping
         shipping_options: [
               {
                  shipping_amount.
                  shipping_rate
               }
            ], 
         success_url
         total_details: { amount_discount, amount_shipping, amount_tax}, 
<br >  
      checkoutStripe Success
      
         result:- 
         id
         object
         amount_subtotal
         amount_total
         cancel_url 
         currency
         customer_details: {
            email
            phone
            tax_exempt
            tax_ids
         },
         expires_at
         metadata
         mode
         payment_method_types
         payment_status
         shipping
         shipping_options: [
               {
                  shipping_amount.
                  shipping_rate
               }
            ], 
         success_url
         total_details: { amount_discount, amount_shipping, amount_tax}, 
<br>    
      checkoutStripe Cancle  
         Result-:
         (index view)

<h5>


<h5>
3. CONTROLLERS   ============================================================================

3.3 Functions (function.js)
</h5>

<p>

   3.3.1 Function generate token 
            
            Function:-
            
                  generate token :  generate_id(length)
            
            
            Result:-

                  <return token>

<br>
   3.3.2 Get  date 
            
            Function:-
            
                  Get date:  GetFullDate(date)
            
            
            Result:-

                  <return y/m/d >

<br>
   3.3.3 Get full date 
            
            Function:-
            
                  Get full date:  GetFullDate(date)
            
            Result:-

                  <return y/m/d/h/m/s >

<br>
   3.3.4 Get Cart total   
            
            Function:-
            
                  Get Cart Total:  cartTotal(3.1.3 cart items, 3.1.2 Store item )
            
            Result:-

               <return Tota> 

<br>
   3.3.5 Get coupon total   
            
            Function:-
            
                  Get Coupon Total: 3.2.2 coupons ++
            
            Result:-

               <return Tota>

<br>
   3.3.6 Get Net total   
            
            Function:-
            
                  Get Net Total: tax + total
            
            Result:-

               <return Tota>

<br>
   3.3.7 Get Full total 
            
            Function:-
            
                  Get Full Total: (Total- Discount(Coupons)) + Tax + shippingCost
            
            Result:-

               <return cost>
</p>


3.1 Shopping cart (cart.js) 
</h5>

<p>

   3.1.2 Store item
            
            Result:-

                  Map([
                        ["Product id", { price: "000", name: "product title", sku: "#0000000", cat: "Cat Id"}],
                  ])
<br>
   3.1.3 cart items  
            
            Result:-
            
                  [
                        { id: "Product id", quantity: "0" },
                  ]

<br>
   3.1.4 Get shoppingcart
            
            Result:-
            
                  {"Product id", price: "000", name: "product title", sku: "#0000000", cat: "Cat Id"}

<br>
   3.1.5 Get cart items (id & quantity)
            
            Result:-
            
                  { id: "Product id", quantity: "0" },

<br>
   3.1.6 Get cart total

            functions:-
                  3.3.4 Get Cart total( 3.1.3 cart items )
            
            Result:-
            
                  {total: 00.00},

</p>


<h5> 
3.2 Coupons (coupons.js)
</h5>

<p> 

<br>
   3.2.2 coupons
            
            Result:-

                  Map([
                        ["cupon id", { price: "000", startDate: "", endDate: "", type: "", desc: ""}],
                  ])

<br>
   3.2.3 Get coupons 
            
            Result:-

                  <coupons>

</p>


 
<h5> 
3.4 Orders (orders.js)
</h5> 

<p>

      3.4.1 create order
            
            Function:-

               save order
            
            Result:-

               console.log("order created")
  
</p>



<h5> 
3.5 Sales (sales.js) 
</h5>

<p>

      3.5.1 save transaction
            
            Function:-

               3.5.3 save Sale 
             
               3.5.4 save ProductSales
            
               3.6.5 Save Shipping Details

            Result:-

               console.log("Transaction saved completed successfully")


      3.5.2 sale InVoice 
            
            Function:-

               sales.model.find(order_id)
            
            Result:-

               return sales: {

                  user_id,
                  order_id,
                  payment_type,
                  total,     
                  discout,
                  coupon_id,
                  tax_rate,
                  tax,
                  shipping,
                  sub_total,
                  net_total,
                  date

               }
               

      3.5.3 save Sale 
            
            Function:-

               sales.save(
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
                  net_total,
                  date
               )
            
            Result:-

               console.log("Sale saved completed successfully")
               

      3.5.4 save ProductSales
            
            Function:-

               productSales.save(
                  product_id,
                  order_id,
                  price,
                  qty,
                  customer_id,
                  product_sku,
                  payment_type,
                  product_cat,
                  date
               )
            
            Result:-

               console.log("Sale saved completed successfully")
            

      3.5.5 Product Sales Report 
            
            Function:-

               sales.model.find(order_id)
            
            Result:-

               return sales: {

                  product_id,
                  order_id,
                  price,
                  qty,
                  customer_id,
                  product_sku,
                  payment_type,
                  product_cat,
                  date

               }
</p>



<h5> 
3.6 Shipping (shipping.js)
</h5>

<p>

      3.6.1 Shipping Area
            
            Function:-

               shippingAreaList.find()
            
            Result:-

               return {shippingAreaList}

      3.6.2 Shipping Location
            
            Function:-

               shippingLocationList.find(shippingAreaList.id)
            
            Result:-

               return {shippingLocationList}


      3.6.3 Save Shipping Details
            
            Function:-

               shipping.model.save()
            
            Result:-

               return Shipping Details: {

                  order_id,
                  area,
                  location,
                  cost,
                  shipping_status

               }

      3.6.4 Get Shipping Details
            
            Function:-

               shipping.model.find(order_id)
            
            Result:-

               return Shipping Details: {

                  order_id,
                  area,
                  location,
                  cost,
                  shipping_status

               }  
</p>


<h5> 
3.7 user info (user-info.js)
</h5>
<p>

      3.7.1 User Info
</p>

<h5>

2. ROUTES/ENDPOINTS ============================================================================
</h5>
<p>
2.1   /index

2.2   /checkout

2.2.1 /checkout/success

2.2.3 /checkout/cancle

2.3   /checkout/coupons 

      controller: Get coupons 
</p>

<h5>

2.4   MPESA
</h5>
<p>
2.4.1 /checkout/mpesa/:id/:shipping

      controller: CheckoutMpesa (LIPA NA MPESA C2B)

2.4.2 /checkout/stk_callback

      controller: mpesaCallBackUrl (LIPA NA MPESA C2B  SUCCESS RESPONSE)
</p>

<h5>

2.5 Pay Pal
</h5>
<p>
2.3.1 /checkout/paypal

   <h6 dir="head1234">controller</h6> 

      checkoutPayPal
</p>

<h5>

2.6 Stripe
</h5>
<p>
2.6.1 /checkout/stripe

      controller: checkout Stripe

2.6.2 /checkout/stripe/success

      controller: checkoutStripe Success

2.6.2 /checkout/stripe/cancle

      controller: checkoutStripe Cancle
</p>

<h5>

2.7  Cart
</h5>
<p>
2.7.1 /checkout/cart 

      controller: cart items   

2.7.2 /checkout/cart/items

      controller: Get cart items (id & quantity)

1.7.3 /checkout/cart/total

      controller: Get cart total 
</p>

<h5>

2.8  Sales & Invoice
</h5>

<p>
2.8.1 /checkout/save

      controller: save transaction  

2.8.2 /checkout/invoice/:id

      controller: sale InVoice 

2.8.3 /checkout/sale/report/:id

      controller: sales Report 

2.8.4 /checkout/sale/product/report/:id

      controller: Product SalesReport
</p>

<h5>
2.9 Shipping
</h5>
<p>
2.9.1 /checkout/shipping

      controller: Save Shipping Details

2.9.2 /checkout/shipping/area 

      controller: Shipping Area 

2.9.3 /checkout/shipping/location

      controller: Shipping Location

2.9.4 /checkout/shipping/details  

      controller: Get Shipping Details 
</p>


3.1 CONTROLLERS PAYMENT ============================================================================
</h5>

<h5> 
3.1.1 Mpesa (mpesa.js)
</h5>
      CheckoutMpesa (LIPA NA MPESA C2B)

         Returns-:
            "MerchantRequestID"
            "CheckoutRequestID"
            "ResponseCode"
            "ResponseDescription"
            "CustomerMessage" 

      mpesaCallBackUrl (LIPA NA MPESA C2B  SUCCESS RESPONSE)

         Returns-:
          stkCallback:
            "MerchantRequestID"
            "CheckoutRequestID"
            "ResultCode"
            "ResultDesc"
            CallbackMetadata-:
               "Amount"
               "PhoneNumber"
               "TransactionDate"
               "ReceiptNumber"
          
<h5> 
3.1.2 Paypal (paypal.js) "Pay pal client execute request"
</h5>   
      checkoutPayPal

         Result: {
            id
            intent
            status
            purchase_units
            create_time
            links
         }

<h5> 
3.1.3 Stripe (stripe.js)
</h5>
      checkout Stripe
      
         Result:- 
         id
         object
         amount_subtotal
         amount_total
         cancel_url 
         currency
         expires_at
         metadata
         mode
         payment_method_types
         payment_status
         shipping
         shipping_options: [
               {
                  shipping_amount.
                  shipping_rate
               }
            ], 
         success_url
         total_details: { amount_discount, amount_shipping, amount_tax}, 
<br >  
      checkoutStripe Success
      
         result:- 
         id
         object
         amount_subtotal
         amount_total
         cancel_url 
         currency
         customer_details: {
            email
            phone
            tax_exempt
            tax_ids
         },
         expires_at
         metadata
         mode
         payment_method_types
         payment_status
         shipping
         shipping_options: [
               {
                  shipping_amount.
                  shipping_rate
               }
            ], 
         success_url
         total_details: { amount_discount, amount_shipping, amount_tax}, 
<br>    
      checkoutStripe Cancle  
         Result-:
         (index view)

<h5>

