const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const UserSchema = mongoose.model('users', new Schema({

    'name': { type: String, required: true },
    'email': { type: String, required: true,  index: true, unique:true },
    'password' :{type: String, required:true},
    'address': {type: String, required:true},
    "role":  {type: Number, default:0}

},{timestamps : true}));

module.exports = {UserSchema}