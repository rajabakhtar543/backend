const express = require('express');
const {registercontroller,logincontroller}  = require('../../Users/UserController.js');
const {requireSignin,isAdmin} = require('../../Users/Middlewares/authmiddleware.js');
const router = express.Router();

 
 router.post('/register', registercontroller)
 router.post('/login',requireSignin,isAdmin,logincontroller)

module.exports = {router}