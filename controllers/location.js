const Location = require('../models/location');

exports.index = (req, res) => {
    Location.find({}, (err, locations) => {
        if (err) res.json({ success: false, err});
        res.json ({success: true, payload: locations})
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

exports.destroy = (req, res) => {
    let { location_id } = req.params;
    Location.findByIdAndRemove(location_id, (err, deletedlocation) => {
        if (err) res.json({success: false, err});
        res.json({success: true, payload: deletedlocation});
    })
}

exports.createPost = (req, res) => {
    let { location_id } = req.params;
    // location_id
    Location.findById(location_id, (err, location) => {
        if (err) res.json({ success: false, err });
        // console.log("req", req.params);
        // console.log("location", location);
        // location.posts.push({...req.body, author: req.user._id });
        location.posts.push({...req.body});
        location.save((err, location) => {
            if (err) res.json({ success: false, err})
            res.json({ status: true, payload: location})
        })
    })
}

// exports.showPost = (req, res) => {
//     let { location_id, id} = req.params;
//     Location.findById(location_id, (err, showlocation) => {
//         if (err) res.json({ success: false, err});
//         if (location.posts.id(id)){
//             let post = location.posts.id(id)
//             res.json({ success: true, payload: showlocation})
//         }else {
//             res.json({ status: false, payload: "post does not exist"})
//         }
//     })
// }
