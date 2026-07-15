import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connect } from 'mongoose'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App config

const app = express()
// .env is a file used to store important values separately from your code.
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()
// Middle wares
// Converts incoming JSON data into JavaScript object.
app.use(express.json())

// Used to allow frontend and backend communication.
// React frontend → localhost:5173
// Backend → localhost:4000

// Browser blocks request because ports are different.
app.use(cors())

// api end points if i get the prefix as /api/user means it wll call the userRouter function which is a route 
app.use('/api/user',userRouter)
app.use('/api/product' , productRouter);
app.use('/api/cart',cartRouter)
app.get('/',(req, res)=>{
    res.send("API working ")
})
app.use('/api/order',orderRouter)


app.listen(port , ()=> console.log('Server started on PORT :'+port))

