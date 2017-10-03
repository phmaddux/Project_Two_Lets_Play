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
var UserModel = Schema.UserModel;

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
UserModel.remove({}, function (err) {
    console.log(err);
})

// Creating games and lists
const played = new PlayedModel({})
const wishlist = new WishlistModel({})
const users = new UserModel({})

const user1 = new UserModel({ name: "Jerry", location: "The Moon"})
const user2 = new UserModel({ name: "Anna", location: "Purgatory"})
const user3 = new UserModel({ name: "Hunter", location: "Atlanta"})

const cardsAgainstHumanity = new GameModel({ name: 'Cards Against Humanity', rating: 9.5, genre: "Party Game", gameType: "Card Game", players: "Unlimited", picture: 'https://i.imgur.com/sgD9JQw.png', timesPlayed: 12, averagePlayTime: 120, thoughts: "This game is hilariously awful. A wonderful game for horrible people.", theHype: "A wonderful game for horrible people."});
const splendor = new GameModel({ name: 'Splendor', rating: 9, genre: "Party Game", gameType: "Card Game", players: "2 - 5", picture: "https://i.imgur.com/TXMCfWg.png", timesPlayed: "3", averagePlayTime: 45, thoughts: "Taking over the gem trade through card games. An odd idea behind the game but it is certainly fun.", theHype: "",});
const smallWorld = new GameModel({ name: 'Small World', rating: 8.7, genre: "Fantasy, Territory Builder", gameType: "Strategy", players: "2 - 5", picture: "https://i.imgur.com/usTXnIA.jpg", timesPlayed: "2", averagePlayTime: 75, thoughts: "This is basically risk with more rules, roleplaying, and a lot less territories to fight over. It's a pretty good time.", theHype: "Its a small world with too many people, conquer the world so your people have neough resources."});
const arkhamHorror = new GameModel({ name: 'Arkham Horror', rating: 8, genre: "Horror, Adventure, Roleplaying", gameType: "Co-op", players: "1 - 8", picture: "https://i.imgur.com/tkWNa1K.png", timesPlayed: "0", averagePlayTime: 150, thoughts: "Madcap fun if everyone works together. Otherwise you all get murdered by fish cultists.", theHype: "Work togetehr to defeat the monsters in time or an Elder God will consume your reality, or you all get murdered by fish cultists."});
const catan = new GameModel({ name: 'Catan', rating: 7.5, genre: "Family", gameType: "Strategy", players: "3 - 4", picture: "https://i.imgur.com/UDkJWBB.jpg?1", timesPlayed: "0", averagePlayTime: 150, thoughts: "", theHype: "I hear it's like monopoly to the nth power, but with less dice, and more politics with other players."});
const scythe = new GameModel({ name: 'Scythe', rating: 8.9, genre: "Alternate history", gameType: "Strategy", players: "2 - 5", picture: "https://i.imgur.com/iMHuq0n.png", timesPlayed: "0", averagePlayTime: 150, thoughts: "", theHype: "It's steampunk style Risk with other ways to win besides conquoring everything."});

// making the arrays to terate
var lists = [played, wishlist]
var games = [cardsAgainstHumanity, arkhamHorror, splendor, smallWorld, catan, scythe,]

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

user1.played.push(games[0])
    user1.save()
    console.log(user1)
user2.played.push(games[1])
    user2.save()
    console.log(user2)
user3.wishlist.push(games[2])
    user3.save()
    console.log(user3)
// Disconnect from database
db.close();