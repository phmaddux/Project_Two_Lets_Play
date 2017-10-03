const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// Schema constructors, defined by mongoose
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required:false
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
    theHype: {
        type: String,
        required: false
    },
});

const PlayedSchema = new Schema({
    games: [GameSchema]
});

const WishlistSchema = new Schema({
    games: [GameSchema]    
});

const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    location: {
        type: string,
        required: false
    },
    played: [],
    wishlist: [],
})

// Creating the models for each schema
const GameModel = mongoose.model('Game', GameSchema)
const PlayedModel = mongoose.model('Played', PlayedSchema)
const WishlistModel = mongoose.model('Wishlist', WishlistSchema)
const UserModel = mongoose.model('User', userSchema)

// export the models so they are able to be required in other parts
module.exports = {
    GameModel: GameModel,
    PlayedModel: PlayedModel,
    WishlistModel: WishlistModel,
    UserModel: UserModel,
}