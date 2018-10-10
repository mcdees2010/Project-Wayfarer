const
  express = require('express'),
  usersRouter = new express.Router(),
  router = express.Router(),
  passport = require('passport'),
  User = require('../controllers/user'),
  moment = require('moment');


usersRouter.get('/login', (req, res) => {
  res.render('login', {message: req.flash('loginMessage')});
})

usersRouter.post('/login', passport.authenticate('local-login', {
  successRedirect: "/users/profile",
  failureRedirect: "/users/login"
}));


usersRouter.get('/signup', (req, res) => {
  res.render('signup', { message: req.flash('signupMessage')});
})

usersRouter.post('/signup', passport.authenticate('local-signup', {
  successRedirect: "/users/profile",
  failureRedirect: "/users/signup"
}));

usersRouter.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { user: req.user, moment });
});

usersRouter.patch('/profile', isLoggedIn, (req, res) => {
  if(!req.body.password) delete req.body.password;
  Object.assign(req.user, req.body);
  req.user.save((err, updatedUser) => {
    if (err) return console.log(err);
    res.redirect('/users/profile');
  })
})

usersRouter.get('/profile/edit', isLoggedIn, (req, res) => {
  res.render('editProfile');
})

usersRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/users/login');
}

router.get('/profile', User.index);
router.post('/profile', User.create);

module.exports = usersRouter;
module.exports = router;