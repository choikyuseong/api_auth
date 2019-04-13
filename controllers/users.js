const User = require('../models/user');

module.exports = {

    signUp: async  (req, res, next) => {

        //Email & password
        //req,value.body
        //console.log('UsersController.signUp() called!');
        console.log('contents or req.value.body', req.value.body)

        const {email , password} = req.value.body;

        //check if there is a user with the same email
        const foundUser = await User.findOne({email});
        if(foundUser){
            return res.status(403).json({error: 'Email is already in use'});
        }

        //create a new user
        const newUser = new User({ email , password});
        await newUser.save();

        //respond with token
        res.status(200).json({user:'created'});


    },

    signIn: async  (req, res, next) => {
        //Generate token
        console.log('UsersController.signIn() called!');


    },

    secret: async  (req, res, next) => {
        console.log('UsersController.secret() called!');

    }

};