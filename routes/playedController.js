var express = require('express');
var router = express.Router();

const Schema = require('../db/schema.js');
var PlayedModel = Schema.PlayedModel
var GameModel = Schema.GameModel

// INDEX route
router.get('/', (request, response) => {
  
    const playedId = request.params.playedId
    
    // FIND all of the games in the played database
    PlayedModel.find({})
        .then((played) => {
            console.log(played)
            // THEN once they come back from the database
            // RENDER them in Handlebars
            response.render('played/index', {
                playedGame: played[0]
            })
        })
            .catch((error) => {
                console.log(error)
    })
})

// New game
router.get('/new', (request, response) => {
    response.render('played/new')
})

// create route
router.post('/', (request, response) => {
    const playedId  = request.params.playedId
    // get new game info
    const newGame = request.body
    // create new game
    PlayedModel.create(newGame)
        .then((played) => {
            played.games.push(newGame)
            return played.save()
        })
        .then((played) => {
            // after saving model, redirect to index
            response.redirect('/played')
        })
        .catch((error) => {
            console.log(error)
        })
})

// Edit route
router.get('/:playedId/games/:gamesId/edit', (request, response) => {
    // get played Id
    const playedId = request.params.playedId
    // get game Id
    const gamesId = request.params.gamesId
    // use played Id to find the played list
    PlayedModel.findById(playedId)
        .then((played) => {
            // after played is returned
            // then find game by id
            const game = played.games.id(gamesId)

            // render prefilled form
            // and pass played Id
            response.render('played/edit', {
            game: game,
            playedId: playedId,
        })
    })
    .catch((error) => {
        console.log(error)
    })
})

// Update route
router.put('/:gamesId', (request, response) => {
    // get played Id from parameters
    const playedId = request.params.playedId
    // get game Id fromt the parameters
    const gamesId = request.params.gamesId
    // get updated game from request body
    const updatedGame = request.body

    PlayedModel.findById(playedId)
        .then((played) => {
            // after played has been returned
            // find the game by id from the played list
            const game = played.games.id(gameId)

            game.name = updatedGame.name,
            game.picture = updatedPicture.picture,
            game.genre = updatedGenre.genre,
            game.gameType = updatedGameType.gameType,
            game.players = updatedPlayers.players,
            game.timesPlayed = updatedTimesPlayed.timesPlayed,
            game.averagePlayTime = updatedAveragePlayTime.averagePlayTime,
            game.thoughts = updatedthoughts.thoughts,
            game.theHype = updatedTheHype.theHype
            
            return played.save()
        })
        .then(() => {
        // save and redirect
        response.redirect(`/played/${playedId}/games/${gamesId}`)
        })

})

// Show route
router.get('/:gamesId', (request, response) => {
    // Get company ID from the paramaters
    const playedId = request.params.playedId
    // Get the Game Id from the paramaters
    const gamesId = request.params.gamesId
    PlayedModel.findById(playedId)
        .then((played) => {

            const game = played.games.id(gamesId)

            response.render('games/show', {
                game: game,
                played: played
            })
        })
        .catch((error) => {
            console.log(error)
        })
})


module.exports = router
