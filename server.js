const express = require('express') 
const cors = require('cors');
const app = express()
var cookieParser = require('cookie-parser')



// Help connect to MongoDB database 
const mongoose = require('mongoose');

require('dotenv').config();

// Set Port 
const port = process.env.PORT || 5000;


app.use(express.static("public"))
app.use(express.json())
app.set("view engine", "ejs")
app.use(cookieParser(process.env.COOKIE_SECRETE))

// app.use(cors({ origin: 'http://localhost:5000' }));

// parse form data
app.use(express.urlencoded({extended: false}))

// Parse Json 
app.use(express.json()) 

// Connection String to express atlas and Environment variable.
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
  
    useNewUrlParser: true, useUnifiedTopology: true 

  },err => { 
    if(err){
        console.log('Error un able Connected to MongoDB!!!')
    }
    else{
        console.log('Connected to MongoDB!!!')
    }
    }
)

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully"); 
})

// Index view 
app.use('/index', (req, res) => {
  res.render("index") 
}) 

// Routes 
const checkoutRoute = require('./routes/checkout') 
app.use('/checkout', checkoutRoute)


// Port 
app.listen(port)