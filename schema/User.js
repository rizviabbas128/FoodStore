const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type:String , require: true , unique: true}, 
    password: {type:String || Number, require: true},
    confirmpassword:{type:String || Number, require:true},
},{timestamps:true} 
)

const model = mongoose.model('RegisterUsers' , userSchema);

module.exports = model;