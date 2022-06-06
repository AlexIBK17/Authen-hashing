const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index');
require('dotenv').config();

const app = express();

mongoose.connect('mongodb://localhost:27017/Stage6task');

// TESTING MONGODB CONNECTION
mongoose.connection
    .once('open', function () {
        console.log('MongoDB running');
    })
    .on('error', function (err) {
        console.log(err);
    });


app.use(express.json());
app.use(bodyParser.json())
app.use('/', indexRouter);

// TESTING CONSOLE
app.listen(3000, function () {
    console.log("listening on port 3000")

})