const mongoose = require('mongoose'),
      User = require('../models/User'),
      Location = require('../models/location');
      

exports.index = (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.json({ success: false, err });
        res.json({ success: true, payload: users })
    })
};
    
exports.create = (req, res) => {
    let { body } = req;
    User.create(body, (err, user) => {
        if (err) res.json({ success: false, err });
        res.json({ success: true, payload: user })
    })
}


exports.show = async (req, res) => {
    let id = mongoose.Types.ObjectId(req.params.id);
    console.log(place.post.author.payload.name)
    let user = await User.findById(id);
    Location.aggregate([{
        // This is going to return the entire card
        $match: { $or: [{'posts.author': id  }, { 'posts.author': id}]}},
        // Destructuring every fight in the fights array into their own elements.
        { $unwind: '$posts'}, {
        // This is going only return the fights where the requested ID matches fighterOne or fighterTwo
        $match: { $or: [{'posts.author': id  }, { 'posts.author': id}]}}, {
        // Formats the data that we are requesting.
        $project: {
            title: '$posts.title',
            body: '$posts.author'
        }}
    ]).exec((err, posts) => {
        if (err) res.json({ status: false, err })
        res.json({ success: true, payload: posts })
    })
 }