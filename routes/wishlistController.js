const express = require('express');
const router = express.Router();

const Schema = require('../db/schema.js');
var WishlistModel = Schema.WishlistModel

//Index 
router.get('/', (request, response) => {

  const wishlistId = request.params.wishlistId
    
    // FIND all of the games in the played database
    WishlistModel.findById(wishlistId)
        .then((wishlist) => {
  
            // THEN once they come back from the database
            // RENDER them in Handlebars
            response.render('wishlist/index', {
                wishlist: wishlist
            })
        })
            .catch((error) => {
                console.log(error)
    })
})

module.exports = router;
