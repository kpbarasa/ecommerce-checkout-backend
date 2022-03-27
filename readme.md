Features present in the app :-

1. Endpoints authentication
   1. Authenticate user
   2. Authenticate orders
   3. Authenticate Sales trans actions 

1. Get Shopping cart information 
   1. shopping cart items
   2. shopping cart Total

2  Get Coupon information  

3. Sale transaction 
   1. paypal Checkout
   2. Mpesa checkout
   3. Stripe checkout 
   4. Save sales
   5. Save sold products

4. Get User information

5. Shipping processes
   1. Create Shiping order after completetion of sale transaction
   2. Get shipping information

COMPONENETS INDEX:-

1. NODE DEPENDENCIES
2. ROUTES/ENDPOINTS 
3. CONTROLLERS
  3.1 CONTROLLERS PAYMENT
4. MIDDLEWARE
5. MODELS
6. VIEWS
7. PUBLIC files
8. ENV

1. NODE DEPENDENCIES ==============================================================================================================
 ===============================================================================================================================
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

Git ignore files 
node_module
.env

2. ROUTES/ENDPOINTS ===============================================================================================================
 ===============================================================================================================================
1  /index
2  /checkout
3  /checkout/success
4  /checkout/cancle
5  /checkout/coupons

MPESA
6  /checkout/mpesa/:id/:shipping
7  /checkout/stk_callback

Pay Pal
8  /checkout/paypal

Stripe
9  /checkout/stripe
10 /checkout/stripe/success
11 /checkout/stripe/cancle

Cart
12 /checkout/cart
13 /checkout/cart/items
14 /checkout/cart/total

Sales & Invoice
15 /checkout/save
16 /checkout/invoice/:id
17 /checkout/sale/report/:id
18 /checkout/sale/product/report/:id

Shipping
19 /checkout/shipping
20 /checkout/shipping/area
21 /checkout/shipping/location
22 /checkout/shipping/details

3. CONTROLLERS  ===================================================================================================================
 ===============================================================================================================================
1 Shopping cart (cart.js) 
  Store item
  cart items  
  Get shoppingcart
  Get cart items (id & quantity)
  Get cart total 

2 Coupons (coupons.js)
   COUPONS ITEM HERE 
   coupons
   Get coupons 

3 Functions (function.js)
   Function generate token 
   Get full date y/m/d  
   Get full date y/m/d/h/m/s
   Get Cart total 
   Get coupon total 
   Get Net total 
   Get Full total 
   
4 Orders (orders.js)
   create order

5 Sales (sales.js) 
   save transaction,
   sale InVoice 
   save Sale 
   save ProductSales 
   sales Report 
   Product SalesReport
   sale Success

6 Shipping (shipping.js)
   Shipping Area
   Shipping Location
   Save Shipping Details
   Get Shipping Details
   Save Shipping Details
   Shipping Area List
   Shipping LocationList

7 user info (user-info.js)
   User Info

3.1 CONTROLLERS PAYMENT ============================================================================================================
 ===============================================================================================================================
1 Mpesa (mpesa.js)
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
             
2 Paypal (paypal.js) "Pay pal client execute request"
   checkoutPayPal
      Result-:
         result: {
            id
            intent
            status
            purchase_units
            create_time
            links
         }

3 Stripe (stripe.js)
   checkout Stripe
      Result-:
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
         
      checkoutStripe Success  
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
      
      checkoutStripe Cancle  
         Result-:
         (index view)

MIDDLEWARE =====================================================================================================================
 ===============================================================================================================================
1 Mpesa (authentification access token)  (mpesa-access.js)
2 Order access (authentification)  (order-access.js)

MODELS =========================================================================================================================
 ===============================================================================================================================
1 Coupon Model  (coupon.model.js)
2 Customer Orders  (customer_orders.model.js)
3 Product Sales   (shipping.model.js)
4 Sales model  (sales.model.js)
5 Shipping model  (shipping.model.js)

VIEWS ==========================================================================================================================
 ===============================================================================================================================
1 Cancle.ejs
2 checkout.ejs
3 Index.ejs
4 Success.ejs

 .Public files ==========================================================================================================================
 ===============================================================================================================================
  resul.js
  script.js
  main.css
  
.env ==========================================================================================================================
===============================================================================================================================

 ATLAS_URI=mongodb+srv://<UserName>:<password>.4p1ws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

 PAYPAL_CLIENT_ID=<Client id here>
 PAYPAL_CLIENT_SECRET=<Secrete here>

 STRIPE_PRIVATE_KEY=<Key here>
 CLIENT_URL=http:// 

 SAFARICOM_AUTH_TOKEN=<token here>
 SAFARICOM_CLIENT_URL=https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials


 COOKIE_SECRETE=<secrete here>
