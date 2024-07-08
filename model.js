const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    users : {
        type : String,
        required: true
    },
    recipes : {
        type: String,
        required: true,
    }
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;