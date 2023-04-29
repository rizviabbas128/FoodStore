const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    title: {type:String, require:true},
    author: {type: String, require:true},
    image_file: {type: String, require:true},
    description: {type:String, require:true}
},{timestamps:true} 
)

const model = mongoose.model('Foods' , foodSchema);

module.exports = model;