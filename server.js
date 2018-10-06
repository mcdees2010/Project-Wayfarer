
const express = require('express'),
      app = express(),
	  ejsLayouts = require('express-ejs-layouts'),
	  mongoose = require('mongoose'),
	  flash = require('connect-flash'),
	  logging = require('morgan'),
	  cookieParser = require('cookie-parser'),
	  session = require('express-session'),
	  MongoDBStore = require('connect-mongodb-session')(session),
	  passport = require('passport'),
	  passportConfig = require('./config/passport'),
	  methodOverride = require('method-override'),
    //   usersRouter = require('./routes/users.js'),
      PORT = 3000;


// mongoose.connect(process.env.MONGODB_URI, (err) => {
//     console.log(err || "Connected to MongoDB")
// })

// MIDDLEWARE:
app.use(logging('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(flash());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.listen(PORT, (err) => {
    console.log(err || `listening on port ${PORT}....`)
})