const Location = require('../models/location');

exports.index = (req, res) => {
    Location.find({}, (err, locations) => {
        if (err) res.json({ success: false, err});
        res.json({success: true, payload: locations});
        // res.render('cities/index', {success: true, payload: locations})
    })
}

exports.new = (req, res) => {
    res.render('new');
}

exports.create = (req, res) => {
    Location.create(req.body, (err, createlocale) => {
        if (err) res.json({ success: false, err});
        res.json({success: true, payload: createlocale});
    })
}

exports.show = (req, res) => {
    Location.findById(req.params.id, (err, showlocation) => {
        if (err) res.json({ success: false, err});
        res.json({ status: true, payload: showlocation})
    })
};

exports.createPost = (req, res) => {
    let { id } = req.params;
    Location.findById(id, (err, location) => {
        if (err) res.json({ success: false, err });
        // POST DATA IS COMING IN VIA 
        location.posts.push({...req.body, author: req.user._id });
        location.save((err, location) => {
            //  ERR LOGIN
            // SUCCESS LOGIC
        })
    })
}