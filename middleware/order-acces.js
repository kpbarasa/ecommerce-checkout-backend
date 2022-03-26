
module.exports = (req, res, next) => {
    if (req.signedCookies.O_id) { 
      console.log("Un authorised");
         next();
    }
    else{
    
        res.render("checkout", {
          paypalClientId: process.env.PAYPAL_CLIENT_ID,
        })

    }
  }