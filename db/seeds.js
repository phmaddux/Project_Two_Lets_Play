require('dotenv').config();

// Database
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
    console.log(db)

// Logs error if you cannot connect to MongoDB
db.on('error', (err) => {
    console.log(err);
});
// Will log "database has been connected" if it successfully connects.
db.once('open', () => {
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

// Creating games and lists
const played = new PlayedModel({timesPlayed: 3, averagePlayTime: 120, thoguhts: "Dang that was fun! trust fund High Life meggings sartorial butcher McSweeney's whatever iPhone drinking vinegar PBR&B Thundercats!!!"})
const wishlist = new WishlistModel({theHype: "Dang that looks fun! trust fund High Life meggings sartorial butcher McSweeney's whatever iPhone drinking vinegar PBR&B Thundercats!!!"})

const cardsAgainstHumanity = new GameModel({ name: 'Cards Against Humanity', genre: "Party Game", gameType: "Card Game", players: "Unlimited", picture: "***"});
const splendor = new GameModel({ name: 'Splendor', genre: "Party Game", gameType: "Card Game", players: "2 - 5", picture: "***"});
const arkhamHorror = new GameModel({ name: 'Arkham Horror', genre: "Horror, Adventure, Roleplaying", gameType: "Co-op", players: "1 - 8", picture: "***"});
const catan = new GameModel({ name: 'Catan', genre: "Family", gameType: "Strategy", players: "3 - 4", picture: "***"});
const scythe = new GameModel({ name: 'Scythe', genre: "Alternate history", gameType: "Strategy", players: "2 - 5", picture: "***"});
const smallWorld = new GameModel({ name: 'Small World', genre: "Fantasy, Territory Builder", gameType: "Strategy", players: "2 - 5", picture: "***"});

// making the arrays to terate
var lists = [played, wishlist]
var games = [cardsAgainstHumanity, arkhamHorror, splendor, catan, scythe, smallWorld]

// putting games in each list
lists.forEach((list, i) => {
    list.games.push(games[i], games[i +1], games[i + 2]);

    list.save((err) => {
        if (err) {
            console.log(err);
            return;
        }
    
        console.log(list);
    });
});

// Disconnect from database
db.close();