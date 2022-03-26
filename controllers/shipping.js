// ==================================================================================================================================
// ==================================================================================================================================
//  Shipping Area
//  Shipping Location
//  Save Shipping Details
//  Get Shipping Details
//  Save Shipping Details
//  Shipping Area List
//  Shipping LocationList
// ==================================================================================================================================
// ==================================================================================================================================

const shipping = require('../models/shipping.model') 

const shippingAreaList = [
    {id:"1", area:"store pick up", cost:"0"},
    {id:"2", area:"area 1", cost:"400"},
    {id:"3", area:"area 2", cost:"500"},
    {id:"4", area:"area 3", cost:"600"},
    {id:"5", area:"area 4", cost:"400"},
    {id:"6", area:"area 5", cost:"600"}
]

const shippingLocationList = [
    {id:"1", area:"area 1", areaId:"2", location:"southb"},
    {id:"2", area:"area 2", areaId:"2",  location:"westlans"},
    {id:"3", area:"area 3", areaId:"3",  location:"langata"},
    {id:"4", area:"area 4", areaId:"4",  location:"thika rd Trm mall"},
    {id:"5", area:"area 5", areaId:"5",  location:"east lands"},
    {id:"6", area:"store pick up", areaId:"1",  location:"store pick up"}
]

const shippingArea = (req, res) => {

    try {
        res.json(shippingAreaList)
        
    } catch (error) {
        res.json('Error: unable to find shipping area ' +error)
    }
}

const shippingLocation = (req, res) => {
    
    try {
        res.json(shippingLocationList)
        
    } catch (error) {
        res.json('Error: unable to find shipping location ' +error)
    }
}

const saveShippingDetails = (req, res) => {
    const order_id = req.body.order_id
    const area = req.body.area
    const location = req.body.location
    const cost = req.body.cost
    const shipping_status = req.body.shipping_status

    const shippingNew = new shipping({
        order_id,
        area,
        location,
        cost,
        shipping_status
    })
    shippingNew.save()
    .then(console.log("shiping info saved successfully"))
    .catch(err => res.status(400).json('Error: unable to find shipping details ' + err))
    
}

const funcSaveShippingDetails = (orderId, ShippingArea, shippingLocation, shippingCost, shippingStatus) => {
    console.log(orderId+", "+ShippingArea+", "+shippingLocation+", "+shippingCost+", "+shippingStatus)
    const order_id = orderId
    const area = (ShippingArea).toString()
    const location = (shippingLocation).toString()
    const cost = Number(shippingCost)
    const shipping_status = shippingStatus

    const shippingNew = new shipping({
        order_id,
        area,
        location,
        cost,
        shipping_status
    })
    shippingNew.save()
    .then(console.log("shiping info saved successfully"))
    .catch(err => res.status(400).json('Error: unable to save shipping details ' + err))
    
}

const getShippingDetailsFind = (req, res) => {
    try {
        shipping.findOne({order_id: req.params.id},function(error, shipping){
            res.json(shipping)
        })
    } catch (error) {
        res.json('Error: unable to find shipping details ' +error)
    }
}

const getShippingDetails = (req, res) => {
    console.log((req.signedCookies.O_id).split("id")[1])
    try {
        shipping.findOne({order_id: (req.signedCookies.O_id).split("id")[1]},function(error, shipping){
            res.json(shipping)
        })
    } catch (error) {
        res.json('Error: unable to find shipping details ' +error)
    }
}

module.exports = {
    shippingArea, 
    shippingLocation, 
    saveShippingDetails, 
    getShippingDetails,
    funcSaveShippingDetails,
    shippingAreaList,
    shippingLocationList}