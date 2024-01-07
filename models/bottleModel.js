const mongoose = require('mongoose')


const BottleSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: String, 
        required: true
    }
})

const Bottle = mongoose.model('Bottle', BottleSchema)

module.exports = Bottle