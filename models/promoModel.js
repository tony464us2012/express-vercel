const mongoose = require('mongoose')

const promoSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    code: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true,
    }
  
})

const Promo = mongoose.model('Promo', promoSchema)

module.exports = Promo