var express = require('express');
var router = express.Router();

Schema = require('../db/schema.js');

// INDEX route
router.get('/', (request, response) => {
  
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
