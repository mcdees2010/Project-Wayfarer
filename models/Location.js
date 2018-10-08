const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const locationSchema = new mongoose.Schema({
    city: String,
    pic: String,
    posts: [postSchema]
})

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;