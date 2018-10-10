const mongoose = require('mongoose'),
      User = require('../models/User');
      

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
