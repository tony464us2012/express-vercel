const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
    // _id: Schema.Types.ObjectId,
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
 
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    orderItems: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            extraPatty: {type: String},
            pattySwap: {type: String},
            sideSwap: {type: String},
            upgradeSide: {type: String},
            extras: {type: Array},
            large: {type: Boolean},
            sauce: {type: String},
            burger: {type: String},
            fryAddOn: {type: String},
            instructions: {type: String}
        }
    ],
    subtotal: {
        type: Number,
        required: true,
        default: 0.0
    },
    tax: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalprice: {
        type: Number,
        required: true,
        default: 0.0
    },
    refunded: {
        type: Boolean,
        required: true, 
       
    },
    chargeId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    }
},)

const Order = mongoose.model('Order', orderSchema)

module.exports = Order