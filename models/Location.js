const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    city: String,
    pic: String
})

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;