require('dotenv').config();

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
	  path = require('path'),
	  passportConfig = require('./config/passport'),
	  methodOverride = require('method-override'),
	  usersRouter = require('./routes/users.js'),
	  locationRouter = require('./routes/locationRouter');


// const mongoConnectionString = `mongodb://localhost/Project_Wayfarer`;
// process.env.${MONGOD_URI}

mongoose.connect(process.env.MONGODB_URI, (err) => {
	console.log(err || "Connected to MongoDB (passport-authentication)")
})

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});

// MIDDLEWARE:
app.use('/static', express.static(path.join(__dirname, 'public')))
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


app.use((req, res, next) => {
	app.locals.currentUser = req.user;
	app.locals.loggedIn = !!req.user;

	next();
})

app.get('/', (req,res) => {
	res.render('index')
})

app.use('/users', usersRouter)

app.use('/locations', locationRouter);



app.listen(process.env.PORT, (err) => {
    console.log(err || `listening on port ${process.env.PORT}....`)
})