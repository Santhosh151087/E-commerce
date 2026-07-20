import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import {placeOrder , placeOrderStripe ,placeOrderRazorpay , allOrders , userOrders , updateStatus, verifyStripe ,verifyRazorpay} from '../controllers/orderController.js'
import authUser from '../middleware/Auth.js'
const orderRouter = express.Router()


// Admin fratures
orderRouter.post('/list',adminAuth , allOrders)
orderRouter.post('/status',adminAuth , updateStatus)

// Payment Features
orderRouter.post('/place',authUser , placeOrder)
orderRouter.post('/stripe',authUser , placeOrderStripe)
orderRouter.post('/razorpay',authUser , placeOrderRazorpay)


//User fratures
orderRouter.post('/userorders' , authUser , userOrders);


//Very payment

orderRouter.post('/verifyStripe' ,authUser ,verifyStripe)
orderRouter.post('/verifyRazorpay' ,authUser ,verifyRazorpay)
    
export default orderRouter
