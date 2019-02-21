const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require('morgan')
const session = require('express-session');
const userRoutes = require("./routes/API/userAPI");
const sessionRoutes = require("./routes/API/sessionAPI");
const gameRoutes = require('./routes/API/gameAPI');
const teamRoutes = require('./routes/API/teamAPI');
const resultRoutes = require('./routes/API/resultAPI');
const dbConnection = require("./server/database");
const MongoStore = require('connect-mongo')(session)
const passport = require('./server/passport');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client", "build")));
// }

app.use('/mlbpickem/', express.static(path.join(__dirname, "client/build")));

app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(userRoutes, sessionRoutes, gameRoutes, teamRoutes, resultRoutes);

app.use(
  session({
    secret: 'fraggle-rock',
    resave: false,
    saveUninitialized: false
  })
);

//DUPLICATE CODE AS ABOVE W/ ONE ADDITIONAL LINE OF CODE
// app.use(
//   session({
//     secret: 'fraggle-rock',
//     store: new MongoStore({ mongooseConnection: dbConnection }),
//     resave: false,
//     saveUninitialized: false
//   })
// );

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use( (req, res, next) => {
  console.log('req.session', req.session);
  return next();
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mlbpickem");

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});