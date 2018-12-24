//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//your local database url
//27017 is the default mongoDB port

mongoose.connect("mongodb://localhost/mlbpickem").then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log('Connected to Mongo');
        
    },
    err => {
         /** handle initial connection error */ 
         console.log('we have an error connecting to Mongo: ')
         console.log(err);
         
        }
  );


module.exports = mongoose.connection