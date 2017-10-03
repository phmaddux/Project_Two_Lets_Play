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
    const playedId = request.params.playedId
    PlayedModel.find({})
        .then((played) => {
            console.log(played)
            response.render('played/new', {
                playGame: played[0]
            })
        })
            .catch((error) => {
                console.log(error)
        })
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
router.put('/:playedId/games/:gamesId/', (request, response) => {
    // req.body has info about the new game
    const playedId = request.params.playedId
    const gamesId = request.params.gamesId
    const updatedGame = request.body
    PlayedModel.findById(playedId)
    // find specific played, add new game to games array
        .then((played) => {
            const game = played.games.id(gamesId)
            console.log(updatedGame)
            game.name = updatedGame.name,
            game.picture = updatedGame.picture,
            game.genre = updatedGame.genre,
            game.gameType = updatedGame.gameType,
            game.players = updatedGame.players,
            game.timesPlayed = updatedGame.timesPlayed,
            game.averagePlayTime = updatedGame.averagePlayTime,
            game.thoughts = updatedGame.thoughts,
            game.theHype = updatedGame.theHype
    // save played
            return played.save()
        })
        .then(() => {
        // reirect to specific saved route    
        response.redirect(`/played`)
        })
        .catch((error) => {
            console.log(error)
        })    

})
    


    // // get played Id from parameters
    // const playedId = request.params.playedId
    // // get game Id fromt the parameters
    // const gamesId = request.params.gamesId
    // // get updated game from request body
    // const updatedGame = request.body

    // PlayedModel.findById(playedId)
    //     .then((played) => {
    //         // after played has been returned
    //         // find the game by id from the played list
    //         const game = played.games.id(gameId)
            
        // })
        // save and redirect

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