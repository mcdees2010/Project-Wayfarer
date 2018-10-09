const Location = require('../models/location');

exports.index = (req, res) => {
    Location.find({}, (err, locations) => {
        if (err) res.json({ success: false, err});
        res.render("cities/index", {success: true, locations: locations})
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
    Location.findById(req.params.location_id, (err, showlocation) => {
        if (err) res.json({ success: false, err});
        res.render("cities/show", {success: true, location: showlocation})
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
    Location.findById(location_id, (err, post) => {
        if (err) res.json({ success: false, err });
        // console.log("req", req.params);
        // console.log("location", location);
        // location.posts.push({...req.body, author: req.user._id });
        post.posts.push({...req.body});
        post.save((err, post) => {
            if (err) res.json({ success: false, err})
            res.json({ status: true, payload: post})
        })
    })
}

exports.newPost = (req, res) => {
    res.render('posts/new');
}

exports.showPost = (req, res) => {
    let { location_id, id } = req.params;
    Location.findById(location_id, (err, showpost) => {
        if (err) res.json({ success: false, err});
        if (showpost.posts.id(id)) {
            let post = showpost.posts.id(id)
            res.json({ success: true, payload: post})
        }else {
            res.json({ success: false, payload: "location does not exist."})
        }
    })
}

exports.updatePost = (req, res) => {
    let {location_id, id} = req.params;
    let { body } = req;
    Location.findById(location_id, (err, updatedpost) => {
        if (err) res.json({ success: false, err});
        let post = updatedpost.posts.id(id)
        if (post) {
            for (let key in body) { post[key] = body[key]}
            updatedpost.save((err, updatedpost) => {
                if (err) res.json({ success: false, err});
                res.json({ success: true, payload: updatedpost})
            })
        }else {
            res.json({ success: false, payload: "Location does not exist."})
        }
    })
}

exports.deletePost = (req, res) => {
    let { location_id, id} = req.params;
    Location.findById(location_id, (err, deletedpost) => {
        if (err) res.json({ success: false, err});
        let post = deletedpost.posts.id(id);
        if (post) {
            post.remove();
            deletedpost.save((err, deletedpost) => {
                if (err) res.json({ success: false, err});
                res.json({ success: true, payload: deletedpost});
            })
        }else {
            res.json({ success: false, payload: "Post does not exist."})
        }
    })
}