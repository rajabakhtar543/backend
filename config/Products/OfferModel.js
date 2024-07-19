const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const OfferSchema = mongoose.model('Offers', new Schema({

    name : { type: String, required: true },
    slug : { type: String, required: true }, 
    description : { type: String, required: true },
    price : { type: Number, required: true },
    category : { type: mongoose.ObjectId, ref: 'categories',required:true },
    quantity : { type: Number, required: true },
    photo : { data: Buffer,contentType:String },
    shipping : { type: Boolean },
},{timestamps : true}));

module.exports = {OfferSchema}