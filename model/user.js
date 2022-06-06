const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
    username: String,
    password: String
});

const logSchema = mongoose.model('usr', user);

module.exports = logSchema;