const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create a schema
const userSchema = new Schema({
    email: {
        type:String,
        requir:true,
        lowercase:true
    },
    password: {
        type:String,
        requir:true

    }


});

//Create a model
const User = mongoose.model('user' , userSchema);

//Export the model
module.exports = User;

