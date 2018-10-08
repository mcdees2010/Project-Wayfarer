
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
	  usersRouter = require('./routes/users.js'),
	  locationRouter = require('./routes/locationRouter'),
      PORT = 3000;


const mongoConnectionString = 'mongodb://localhost/Project_Wayfarer';
  

mongoose.connect(mongoConnectionString, (err) => {
	console.log(err || "Connected to MongoDB (passport-authentication)")
})

const store = new MongoDBStore({
    uri: mongoConnectionString,
    collection: 'sessions'
});

// MIDDLEWARE:
app.use(logging('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(flash());
app.use(methodOverride('_method'));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(session({
	secret: "orangutan",
	cookie: { maxAge: 600000 },
	resave: true,
	saveUninitialized: false,
	store: store
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/users', usersRouter)


app.use((req, res, next) => {
	app.locals.currentUser = req.user;
	app.locals.loggedIn = !!req.user;

	next();
})

app.get('/', (req,res) => {
	res.render('index')
})

app.use('/locations', locationRouter);



app.listen(PORT, (err) => {
    console.log(err || `listening on port ${PORT}....`)
})