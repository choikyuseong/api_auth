const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");

const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(bodyparser.json());

//start server
const port = process.env.port || 3000;

app.listen(port);
console.log(`server listening at ${port}`);
