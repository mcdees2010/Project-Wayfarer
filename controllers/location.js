const Location = require('../models/location');

exports.index = (req, res) => {
    Location.find({}, (err, locations) => {
        if (err) res.json({ success: false, err});
        res.json({success: true, payload: locations});
    })
}

