const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const userRouter = require('./routes/users');


const app = express();
const db = require('./config/key').mongoURI;


//mongo connect
mongoose.connect(db, {useNewUrlParser:true})
    .then(()=> console.log("Mongo connected"))
    .catch(err => console.log(err));
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex',true)



//Middlewares
app.use(morgan('dev'));
app.use(bodyparser.json());

//Routes
app.use('/users', userRouter);



//start server
const port = process.env.port || 3000;

app.listen(port);
console.log(`server listening at ${port}`);
