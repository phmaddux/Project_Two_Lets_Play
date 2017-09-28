require('dotenv').config();

// Database
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connect;
// Logs error if you cannot connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});
// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("Connected to MongoDB!");
});

// Pull in Models from the `schema.js`
var Schema = require("./schema.js");

var GameModel = Schema.GameModel;
var PlayedModel = Schema.PlayedModel;
var WishlistModel = Schema.WishlistModel;

// Delete all things from the data base
GameModel.remove({}, function (err) {
    console.log(err);
});
PlayedModel.remove({}, function (err) {
    console.log(err);
});
WishlistModel.remove({}, function (err) {
    console.log(err);
});


