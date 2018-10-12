const mongoose = require('mongoose'),
      User = require('../models/User'),
      moment = require('moment'),
      Location = require('../models/Location');
      

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
    let { city, id } = req.params;
    id = id ? mongoose.Types.ObjectId(id) : req.user._id;
    let user = await User.findById(id); 
    Location.aggregate([{
        $match: {'posts.author': id}},
        { $unwind: '$posts'}, {
        $match: {'posts.author': id  }}, {
            $project: {
                title: '$posts.title',
                body: '$posts.body',
                city_id: '$_id',
                post_id: '$posts._id'
            }}
    ]).exec((err, posts) => {
        if (err) res.json({ status: false, err });
        res.render('profile', { success: true, user, posts, moment, city})
    })
 }