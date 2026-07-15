import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId :{type:String , requires:true},
    items :{type:Array , requires:true},
    amount :{type:Number , requires:true},
    address :{type:Object , requires:true},
    status :{type:String , requires:true , default:'Order Placed'},
    paymentMethod :{type:String , requires:true},
    payment :{type:Boolean , required:true , default:false},
    date:{type:Number , required:true}
})

const orderModel = mongoose.models.order || mongoose.model('order' , orderSchema)

export default orderModel;