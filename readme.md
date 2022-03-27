<h5>Features present in the app :-<h5>

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
<h6>1. NODE DEPENDENCIES =========================================================================<h6>
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

<h6>
<h6>
Git ignore files ===============================================================================

1.    node_module

2.    .env

<h6>
2. ROUTES/ENDPOINTS ============================================================================
</h6>
<p>
2.1   /index

2.2   /checkout

2.2.1 /checkout/success

2.2.3 /checkout/cancle

2.3   /checkout/coupons
</p>

<h6>

2.4   MPESA
</h6>
<p>
2.4.1 /checkout/mpesa/:id/:shipping

2.4.2 /checkout/stk_callback
</p>

<h6>

2.5 Pay Pal
</h6>
<p>
2.3.1 /checkout/paypal
</p>

<h6>

2.6 Stripe
</h6>
<p>
2.6.1 /checkout/stripe

2.6.2 /checkout/stripe/success

2.6.2 /checkout/stripe/cancle
</p>

<h6>

2.7  Cart
</h6>
<p>
2.7.1 /checkout/cart

2.7.2 /checkout/cart/items

1.7.3 /checkout/cart/total
</p>

<h6>

2.8  Sales & Invoice
</h6>

<p>
2.8.1 /checkout/save

2.8.2 /checkout/invoice/:id

2.8.3 /checkout/sale/report/:id

2.8.4 /checkout/sale/product/report/:id
</p>

<h6>
2.9 Shipping
</h6>
<p>
2.9.1 /checkout/shipping

2.9.2 /checkout/shipping/area

2.9.3 /checkout/shipping/location

2.9.4 /checkout/shipping/details  
</p>

<h6>
3. CONTROLLERS   ============================================================================

3.1 Shopping cart (cart.js) 
</h6>

<p>
      3.1.2 Store item

      3.1.3 cart items  

      3.1.4 Get shoppingcart

      3.1.5 Get cart items (id & quantity)

      3.1.6 Get cart total 
</p>


<h6> 
3.2 Coupons (coupons.js)
</h6>

<p>
      3.2.1 COUPONS ITEM HERE 

      3.2.2 coupons

      3.2.3 Get coupons 
</p>


<h6> 
3.3 Functions (function.js)
</h6>

<p>
      3.3.1 Function generate token 

      3.3.2 Get full date y/m/d  

      3.3.3 Get full date y/m/d/h/m/s

      3.3.4 Get Cart total 

      3.3.5 Get coupon total 

      3.3.6 Get Net total 

      3.3.7 Get Full total 
</p>

 
<h6> 
3.4 Orders (orders.js)
</h6>  
<p>
      3.4.1 create order
</p>



<h6> 
3.5 Sales (sales.js) 
</h6>

<p>
      3.5.1 save transaction

      3.5.2 sale InVoice 

      3.5.3 save Sale 

      3.5.4 save ProductSales

      3.5.5 sales Report 

      3.5.6 Product SalesReport

      3.5.7 sale Success
</p>



<h6> 
3.6 Shipping (shipping.js)
</h6>

<p>
      3.5.1 Shipping Area

      3.5.2 Shipping Location

      3.5.3 Save Shipping Details

      3.5.4 Get Shipping Details

      3.5.5 Save Shipping Details

      3.5.6 Shipping Area List
   
      3.5.7 Shipping LocationList
</p>


<h6> 
3.7 user info (user-info.js)
</h6>
<p>
      User Info
</p>

<h6>

3.1 CONTROLLERS PAYMENT ============================================================================
</h6>

<h6> 
3.1.1 Mpesa (mpesa.js)
</h6>
      CheckoutMpesa (LIPA NA MPESA C2B)

         Returns-:
            "MerchantRequestID"
            "CheckoutRequestID"
            "ResponseCode"
            "ResponseDescription"
            "CustomerMessage" 

      mpesaCallBackUrl (LIPA NA MPESA C2B  SUCCESS RESPONSE):

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
          
<h6> 
3.1.2 Paypal (paypal.js) "Pay pal client execute request"
</h6>   
      checkoutPayPal

         Result: {
            id
            intent
            status
            purchase_units
            create_time
            links
         }

<h6> 
3.1.3 Stripe (stripe.js)
</h6>
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

<h6>

4. MIDDLEWARE  ============================================================================
</h6>

1 Mpesa (authentification access token)  (mpesa-access.js)
2 Order access (authentification)  (order-access.js)

<h6>

5. MODELS  ============================================================================
</h6>

1 Coupon Model  (coupon.model.js)
2 Customer Orders  (customer_orders.model.js)
3 Product Sales   (shipping.model.js)
4 Sales model  (sales.model.js)
5 Shipping model  (shipping.model.js)

<h6>

6. VIEWS  ============================================================================
</h6>

1 Cancle.ejs
2 checkout.ejs
3 Index.ejs
4 Success.ejs

<h6>

 7. Public files  ======================================================================
</h6>
 
  resul.js
  script.js
  main.css
  
<h6>

8. env  ============================================================================
</h6>

 ATLAS_URI=mongodb+srv://<UserName>:<password>.4p1ws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

 PAYPAL_CLIENT_ID=<Client id here>
 PAYPAL_CLIENT_SECRET=<Secrete here>

 STRIPE_PRIVATE_KEY=<Key here>
 CLIENT_URL=http:// 

 SAFARICOM_AUTH_TOKEN=<token here>
 SAFARICOM_CLIENT_URL=https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials


 COOKIE_SECRETE=<secrete here>
