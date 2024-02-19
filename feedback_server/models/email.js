const mongoose=require('mongoose')
const Populate = require('../util/autopopulate');

const EmailSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    msg:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
 
}, { timestamps: true });

const Email=module.exports=mongoose.model('User', EmailSchema)
