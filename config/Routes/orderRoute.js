const express = require("express");
const { requireSignin, isAdmin } = require("../../Users/Middlewares/authmiddleware");
const { PaymentController, getOrderController, getAllOrderController, orderStatusController, saveOrderController } = require("../Orders/Orders");

const ordersrouter = express.Router();
 ordersrouter.post("/payments",PaymentController,saveOrderController)
ordersrouter.post('/orders',requireSignin,getOrderController)
ordersrouter.get('/all-orders',requireSignin,isAdmin,getAllOrderController)
ordersrouter.put('/order-status/:orderId',requireSignin,isAdmin,orderStatusController)

 module.exports = {ordersrouter}