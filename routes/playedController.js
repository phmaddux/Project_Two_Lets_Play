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
                played: played
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
router.get('/:gamesId/edit', (request, respone) => {
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
            response.render('games/edit', {
            game: game,
            playedId: playedId,
        })
    })
    .catch((error) => {
        console.log(error)
    })
})



module.exports = router
