// ==================================================================================================================================
// ==================================================================================================================================
// COUPONS ITEM HERE 
// coupons
// Get coupons 
// ==================================================================================================================================
// ==================================================================================================================================

// COUPONS ITEM  
const coupons = [
   { _id: "1", price: 3000, startDate: "Tue Mar 15 2022 16:03:49 GMT+0300 (East Africa Time)", endDate: "Tue Mar 26 2022 16:03:49 GMT+0300 (East Africa Time)", type: "two"},
   { _id: "2", price: 1000, startDate: "Tue Mar 15 2022 16:03:49 GMT+0300 (East Africa Time)", endDate: "Tue Mar 26 2022 16:03:49 GMT+0300 (East Africa Time)", type: "two"},
   { _id: "3", price: 50, startDate: "Tue Mar 15 2022 16:03:49 GMT+0300 (East Africa Time)", endDate: "Tue Mar 26 2022 16:03:49 GMT+0300 (East Africa Time)", type: "one"},
   { _id: "4", price: 20, startDate: "Tue Mar 15 2022 16:03:49 GMT+0300 (East Africa Time)", endDate: "Tue Mar 26 2022 16:03:49 GMT+0300 (East Africa Time)", type: "one"},
   { _id: "5", price: 10, startDate: "Tue Mar 15 2022 16:03:49 GMT+0300 (East Africa Time)", endDate: "Tue Mar 26 2022 16:03:49 GMT+0300 (East Africa Time)", type: "one"},
   { _id: "6", price: 5000, startDate: "Tue Mar 15 2022 16:03:49 GMT+0300 (East Africa Time)", endDate: "Tue Mar 26 2022 16:03:49 GMT+0300 (East Africa Time)", type: "two"},
  ]
 
// coupons   
const couponMap = new Map([
   [1, { price: 3000, startDate: "Tue Mar 15 2022 16:03:49 GMT+0300 (East Africa Time)", endDate: "Tue Mar 26 2022 16:03:49 GMT+0300 (East Africa Time)", type: "two", desc: "desc"}],
   [2, { price: 1000, startDate: "Tue Mar 15 2022 16:03:49 GMT+0300 (East Africa Time)", endDate: "Tue Mar 26 2022 16:03:49 GMT+0300 (East Africa Time)", type: "two", desc: "desc"}],
   [3, { price: 1000, startDate: "Tue Mar 15 2022 16:03:49 GMT+0300 (East Africa Time)", endDate: "Tue Mar 26 2022 16:03:49 GMT+0300 (East Africa Time)", type: "one", desc: "desc"}],
   [4, { price: 15, startDate: "Tue Mar 15 2022 16:03:49 GMT+0300 (East Africa Time)", endDate: "Tue Mar 26 2022 16:03:49 GMT+0300 (East Africa Time)", type: "one", desc: "desc"}],
   [5, { price: 5, startDate: "Tue Mar 15 2022 16:03:49 GMT+0300 (East Africa Time)", endDate: "Tue Mar 26 2022 16:03:49 GMT+0300 (East Africa Time)", type: "one", desc: "desc"}],
   [6, { price: 5000, startDate: "Tue Mar 15 2022 16:03:49 GMT+0300 (East Africa Time)", endDate: "Tue Mar 26 2022 16:03:49 GMT+0300 (East Africa Time)", type: "two", desc: "desc"}],
])

// Get coupons
const getCoupons = (req, res) => {
   try {
          
      res.json(coupons)

   } catch (error) {
          
      res.json('Error: unable to find coupons ' + error)

   } 
      
}

  module.exports = {getCoupons,coupons,couponMap}