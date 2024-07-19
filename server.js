const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan')
const connectDB = require('./config/Db.js')
const { router } = require('./config/Routes/authRouter.js');


const app = express();




                                //  MONGODB CONNECT
connectDB();

// middleware
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth',router)
      
                                 // Buliding 1st api//


app.get('/', (req,res)=>{
    res.send({
        message:"Welcome To Ecommerce App"  
    })
})
                                   // SERVER//////////////////////////////////
const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is running on  ${PORT}`)

})