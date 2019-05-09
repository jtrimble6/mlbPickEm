const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require('morgan')
const session = require('express-session');
const messageBoardRoutes = require('./routes/API/messageBoardAPI')
const userRoutes = require('./routes/API/userAPI')
const userTestRoutes = require('./routes/API/userTestAPI')
const passwordResetRoutes = require('./routes/API/passwordResetAPI')
const updatePasswordRoutes = require('./routes/API/updatePasswordAPI')
const sessionRoutes = require("./routes/API/sessionAPI");
const mlbGameRoutes = require('./routes/API/mlbGameAPI')
const mlbTeamRoutes = require('./routes/API/mlbTeamAPI')
const nbaGameRoutes = require('./routes/API/nbaGameAPI')
const nbaPlayoffGameRoutes = require('./routes/API/nbaPlayoffGameAPI')
const nbaPlayoffTeamRoutes = require('./routes/API/nbaPlayoffTeamAPI')
const nbaTeamRoutes = require('./routes/API/nbaTeamAPI')
const challengeRoutes = require('./routes/API/challengeAPI')
const mastersRoutes = require('./routes/API/mastersAPI')
// const mlbPickEmUserRoutes = require("./routes/API/mlbPickEmAPI/mlbPickEmUserAPI");
// const mlbPickEmGameRoutes = require('./routes/API/mlbPickEmAPI/mlbPickEmGameAPI');
// const mlbPickEmTeamRoutes = require('./routes/API/mlbPickEmAPI/mlbPickEmTeamAPI');
// const dbConnection = require("./server/database");
// const MongoStore = require('connect-mongo')(session)
const userPassport = require('./server/userPassport');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}

app.use('/mlbpickem/', express.static(path.join(__dirname, "client/build")));

app.use(userPassport.initialize());
app.use(userPassport.session());

// Add routes, both API and view
app.use(messageBoardRoutes, userRoutes, userTestRoutes, passwordResetRoutes, updatePasswordRoutes, sessionRoutes, challengeRoutes, mastersRoutes, mlbGameRoutes, mlbTeamRoutes, nbaGameRoutes, nbaPlayoffGameRoutes, nbaPlayoffTeamRoutes, nbaTeamRoutes);

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

userPassport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
userPassport.deserializeUser(function(id, done) {
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