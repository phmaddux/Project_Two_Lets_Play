var express = require('express');
var router = express.Router();

const Schema = require('../db/schema.js');
var PlayedModel = Schema.PlayedModel

// INDEX route
router.get('/', (request, response) => {
  
    const playedId = request.params.playedId
    
    // FIND all of the games in the played database
    PlayedModel.find({})
        .then((played) => {
  
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

module.exports = router;
