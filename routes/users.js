const express = require('express'),
      usersRouter = new express.Router(),
      passport = require('passport');

usersRouter.get('/login', (req, res) => {
    res.render('login', {message: req.flash('loginMessage')});
})

module.exports = usersRouter;