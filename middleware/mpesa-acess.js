const request = require('request')

// Access token  ==================================================================================================================== 
// ================================================================================================================================== 
module.exports = (req, res, next) => {   
    let url = process.env.SAFARICOM_CLIENT_URL
    // let auth = new Buffer.from("Bjf0WQCCV6cT1sGUn2TDp9nmMP0aUcxS:Zcg4SEOP4fxTYbKK").toString('base64')

    // let url = process.env.SAFARICOM_CLIENT_URL
    let auth = new Buffer.from(process.env.SAFARICOM_ACCESS_TOKEN).toString('base64') 
    
    request(
        {
            url: url, 
            headers: {
                'Authorization': 'Basic '+auth+'' 
            } 
        },
        function (error, response, body) {
            if (error) { 
                console.log(error) 
            }
            else{ 
                req.access_token = JSON.parse(body).access_token
                next()
                // res.json(JSON.parse(body))
            }
        }
    )

}