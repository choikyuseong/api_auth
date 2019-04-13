const User = require('../models/user');
const JWT = require('jsonwebtoken');

const {JWT_SECRET} = require('../config');

signToken = user =>{
    return JWT.sign({
        iss: 'Codeworkr',
        sub: user.id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate()+1) //current time +1day
    }, JWT_SECRET);
}



module.exports = {

    signUp: async  (req, res, next) => {

        //Email & password
        //req,value.body
        //console.log('UsersController.signUp() called!');
        console.log('contents or req.value.body', req.value.body);

        const {email , password} = req.value.body;

        //check if there is a user with the same email
        const foundUser = await User.findOne({"local.email":email});
        if(foundUser){
            return res.status(403).json({error: 'Email is already in use'});
        }

        //create a new user
        const newUser = new User({ email , password});
        await newUser.save();

        //Generate token
        const token = signToken(newUser);

        //respond with token
        res.status(200).json({user:token});


    },

    signIn: async  (req, res, next) => {
        //Generate token
        console.log('UsersController.signIn() called!');

        const token = signToken(req.user);
        console.log(token);
        res.status(200).json({token});





    },


    googleOAuth: async (req, res, next) => {
        console.log('google got here');
        const token = signToken(req.user);
        console.log(req.user);
        res.status(200).json({ token });
    },



    facebookOAuth: async (req, res, next) => {
    console.log('facebook got here');
    const token = signToken(req.user);
    console.log(req.user);
    res.status(200).json({ token });
    },

    secret: async  (req, res, next) => {
        console.log('UsersController.secret() called!');
        res.json({secret:'resource'});

    }

};