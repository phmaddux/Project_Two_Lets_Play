const mongoose = require('mongoose');

// Schema constructors, defined by mongoose
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: false
    },
    gameType: {
        type: String,
        required: false
    },
    players: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        reuired: false
    },
});

const PlayedSchema = new Schema({
    timesPlayed: {
        type: Number,
        required: false
    },
    averagePlayTime:{
        type: Number,
        required: false
    },
    thoughts: {
        type: String,
        required: false
    },
    games: [GameSchema]
});

const WishlistSchema = new Schema({
    theHype: {
        type: String,
        required: false
    },
    games: [GameSchema]    
});

// Creating the models for each schema
const GameModel = mongoose.model('Game', GameSchema)
const PlayedModel = mongoose.model('Played', PlayedSchema)
const WishlistModel = mongoose.model('Wishlist', WishlistSchema)

// export the models so they are able to be required in other parts
module.exports = {
    GameModel: GameModel,
    PlayedModel: PlayedModel,
    WishlistModel: WishlistModel
}