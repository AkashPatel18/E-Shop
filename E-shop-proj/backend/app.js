require('dotenv').config()
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser= require("cookie-parser");
const cors = require("cors");
const path = require('path')

//my routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

//DB-connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true
}).then(() =>{
    console.log("DB CONNECTED");
});


//Middle-ware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//my routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)

if (process.env.NODE_ENV==='production'){
    app.use(express.static('projfrontend/build'))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'projfrontend','build','index.html'))
    })
}



// port


const port = process.env.PORT || 8000;


//Starting a Server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});