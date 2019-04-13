
module.exports = {

    signUp: async  (req, res, next) => {

        //Email & password
        //req,value.body
        //console.log('UsersController.signUp() called!');
        console.log('contents or req.value.bod', req.value.body)


    },

    signIn: async  (req, res, next) => {
        //Generate token
        console.log('UsersController.signIn() called!');


    },

    secret: async  (req, res, next) => {
        console.log('UsersController.secret() called!');

    }

};