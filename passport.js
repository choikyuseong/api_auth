const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./config');
const User = require('./models/user');


// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);

    } catch (error) {
        done(error.false);
    }
}));





// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {

    try{
        // Find the user given the email
        const user = await User.findOne({ "local.email" : email });

        // If not, handle it
        if (!user) {
            return done(null, false);
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);
        // If not, handle it
        if (!isMatch) {
            return done(null, false);
        }
        // Otherwise, return the user
        done(null,user);
    }
    catch (error) {
        done(error, false)
    }

}));



//google oauth strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID:"181715878681-o821sherigd36fp8gbbkucu5ka8cbeam.apps.googleusercontent.com",
    clientSecret:"6pNE6TFPTeTVRyQSOjyndCkZ"
}, async (accessToken, refreshToken, profile, done) =>{
    try{
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);


    }
    catch (error) {
        done(error, false, error.message)
    }
}));

//facebook oauth strategy
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID:"405752289972716",
    clientSecret:"65470b588dcbabd8b5756b9163a3feef"
}, async (accessToken, refreshToken, profile, done) =>{
    try{
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);


    }
    catch (error) {
        done(error, false, error.message)
    }
}));