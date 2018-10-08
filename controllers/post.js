const Location = require('../models/location');


//For a particular location, create a new post
// exports.create = (req, res) => {
//     let { id } = req.params;
//     Location.findById(id, (err, location) => {
//         if (err) res.json({ success: false, err });
//         console.log("req", req.params);
//         // POST DATA IS COMING IN VIA 
//         location.posts.push({...req.body, author: req.user._id });
//         location.save((err, location) => {
//             if (err) res.json({ success: false, err})
//             //  ERR LOGIN
//             // SUCCESS LOGIC
//             res.json({ status: true, payload: location})
//         })
//     })
// }

