// BASE SETUP
// =============================================================================

// call the packages we need
require('dotenv').config();
const express    = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app        = express();
const morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console
app.use(cors());
// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port     = process.env.PORT || 8080; // set our port

// DATABASE SETUP
const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

// ROUTES FOR OUR API
// create our router
const router = express.Router();
// middleware to use for all requests
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api/users', require("./app/routes/users"));
app.use('/api/board', require("./app/routes/board"));
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
