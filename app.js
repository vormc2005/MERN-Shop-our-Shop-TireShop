const express = require('express')
require("dotenv").config()
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cookieParser = require ('cookie-parser');
const expressValidator = require('express-validator')
const cors = require("cors")

//import routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require('./routes/product')
const braintreeRoutes =require('./routes/braintree')
const orderRoutes = require('./routes/order')

//app
const app = express();

//middlewares

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors())

//routes middleware
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", braintreeRoutes)
app.use("/api", orderRoutes)

//DB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{console.log(`Database at: ${process.env.DATABASE} connected`)})


const port = process.env.PORT || 8030

app.listen(port, ()=>{
    console.log(`Server is running on port#: ${port}`)
}) 
