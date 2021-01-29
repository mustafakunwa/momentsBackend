const express = require('express');
require('./db/mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");

const userRoute = require('./router/user');
const momentRoute =require('./router/moment');


app.use(bodyParser.json({limit: '55mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '55mb', extended: true}))
app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(userRoute);
app.use(momentRoute);

module.exports = app;