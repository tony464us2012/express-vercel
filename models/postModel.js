const mongoose = require('mongoose')


const PostSchema = mongoose.Schema({
    beerName: {
        type: String, 
        required: true
    },
    beerLogo: {
        type: String
    },
    beerABV: {
        type: Number, 
        required: true
    },
    beerIBU: {
        type: Number, 
        required: true
    },
    beerStyle:{
        type: String, 
        required: true
    },
    brewery: {
        type: String, 
        required: true
    },
    ratingCount: {
        type: Number, 
        required: true
    },
    ratingScore: {
        type: Number, 
        required: true
    },
    description: {
        type: String
    },
    beerLogo2: {
        type: String
    }
   
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post