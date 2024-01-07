const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel.js')
const User = require('../models/userModel.js')
const Setup = require('../models/setupModel.js')
// const config from 'config'
const secretkey = process.env.STRIPE_SECRET_KEY 
const Stripe = require('stripe')
const nodemailer = require('nodemailer')

const stripe = new Stripe(secretkey)

const addOrderItems = asyncHandler( async(req, res) => {

    const { firstName, lastName, phone, email, id, billingName, orderItems, subtotal, tax, totalprice, token} = req.body
    
    const message = `
    <style>
    td, th {
        border: 1px solid #fff;
        text-align: left;
        padding: 8px;
      }
    </style>
        <p>
            ${firstName}  ${lastName}<br>
            ${phone}<br>
            ${email}
        </p>
        <table>
            <tr>
                <th>Item</th>
                <th>Price</th>
            </tr>
            ${orderItems.map((item) => (
               `<tr style= 'marginBottom: .5rem'>
                    <td>
                        <p>${item.name}</p>
                            ${item.large ? `<i>Large</i>` : ''}
                            ${item.sauce ? `<i> ${item.sauce}</i>` : ''}
                            ${item.burger ? `<i>Burger: ${item.burger}</i>` : ''}
                            ${item.extraPatty ? `<i>${item.extraPatty}</i>` : ''}
                            ${item.pattySwap ? `<i>${item.pattySwap}</i>` : ''}
                            ${item.extras ? `<i>${item.extras.map(extra => `<div>${extra}</div>`)}</i>` : ''}
                            ${item.sideSwap ? `<i>Side: ${item.sideSwap}</i>` : ''}
                            ${item.upgradeSide ? `<i>Side: ${item.upgradeSide}</i>` : ''}
                            ${item.fryAddOn ? `<i>Side Add: ${item.fryAddOn}</i>` : ''}
                            ${item.tacoText ? `<i>Taco Type: ${item.tacoText}</i>` : ''}
                            ${item.taco ? `<i>${item.taco}</i>` : ''}
                            ${item.instructions ? `<i>Instructions: ${item.instructions}</i>` : '' }
                    </td>
                    <td><p>${(item.price).toFixed(2)}</p></td>
                </tr>`
            ))}
            <tr>
                <td>Subtotal</td>
                <td>${subtotal}</td>
            </tr>
            <tr>
                <td>Tax</td>
                <td>${tax}</td>
            </tr>
            <tr>
                <td>Total</td>
                <td>${totalprice}</td>
            </tr>
        </table>
    `

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '109burgerbusiness@gmail.com',
            pass: 'itjbtpnidcrdzmsp'
        }
    });
    const mailOptions = {
        from: '109burgerbusiness@gmail.com',
        to: '109burgerjoint@gmail.com',
        subject: 'New Order',
        html: message,
    }
    const sendEmail = () => {
        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Email sent ' + info.response)
            }
        })
    }
    try{
        const charge = await stripe.charges.create({
        amount: Math.trunc(totalprice * 100),
        currency: 'usd',
        source: token,
        description: 'Take-Out',
        billing_details: billingName,
        receipt_email: email,
    })
        
    const order = new Order({
        firstName,
        lastName,
        phone,
        email,
        orderItems, 
        user: id, 
        subtotal, 
        tax, 
        totalprice,
        refunded: charge.refunded,
        chargeId: charge.id
    })

     await order.save()
     
       sendEmail();
        res.status(200).json(order)
} catch (error) {
    res.status(402).json({msg: error.message})
} 
})
const guestOrder = asyncHandler( async(req, res) => {

    const user = await User.findOne({email: '109burgerbusiness@gmail.com'})

    const { firstName:first, lastName:last, phone, email, guestEmail, billingName, orderItems, subtotal, tax, totalprice, token} = req.body
    
    const message = `
    <style>
    td, th {
        border: 1px solid #fff;
        text-align: left;
        padding: 8px;
      }
    </style>
        <p>
            ${first}  ${last}<br>
            ${phone}<br>
            ${email}
        </p>
        <table>
            <tr>
                <th>Item</th>
                <th>Price</th>
            </tr>
            ${orderItems.map((item) => (
               `<tr style= 'marginBottom: .5rem'>
                    <td>
                        <p>${item.name}</p>
                            ${item.large ? `<i>Large</i>` : ''}
                            ${item.sauce ? `<i> ${item.sauce}</i>` : ''}
                            ${item.burger ? `<i>Burger: ${item.burger}</i>` : ''}
                            ${item.extraPatty ? `<i>${item.extraPatty}</i>` : ''}
                            ${item.pattySwap ? `<i>${item.pattySwap}</i>` : ''}
                            ${item.extras ? `<i>${item.extras.map(extra => `<div>${extra}</div>`)}</i>` : ''}
                            ${item.sideSwap ? `<i>Side: ${item.sideSwap}</i>` : ''}
                            ${item.upgradeSide ? `<i>Side: ${item.upgradeSide}</i>` : ''}
                            ${item.fryAddOn ? `<i>Side Add: ${item.fryAddOn}</i>` : ''}
                            ${item.tacoText ? `<i>Taco Type: ${item.tacoText}</i>` : ''}
                            ${item.taco ? `<i>${item.taco}</i>` : ''}
                            ${item.instructions ? `<i>Instructions: ${item.instructions}</i>` : '' }
                    </td>
                    <td><p>${(item.price).toFixed(2)}</p></td>
                </tr>`
            ))}
            <tr>
                <td>Subtotal</td>
                <td>${subtotal}</td>
            </tr>
            <tr>
                <td>Tax</td>
                <td>${tax}</td>
            </tr>
            <tr>
                <td>Total</td>
                <td>${totalprice}</td>
            </tr>
        </table>
    `

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '109burgerbusiness@gmail.com',
            pass: 'itjbtpnidcrdzmsp'
        }
    });
    const mailOptions = {
        from: '109burgerbusiness@gmail.com',
        to: '109burgerjoint@gmail.com',
        subject: 'New Order',
        html: message,
    }
    const sendEmail = () => {
        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Email sent ' + info.response)
            }
        })
    }
    try{
        const charge = await stripe.charges.create({
        amount: Math.trunc(totalprice * 100),
        currency: 'usd',
        source: token,
        description: 'Take-Out',
        billing_details: billingName,
        receipt_email: guestEmail,
    })
        
    const order = new Order({
        firstName: first,
        lastName: last,
        phone,
        email,
        orderItems, 
        user: user._id, 
        subtotal, 
        tax, 
        totalprice,
        refunded: charge.refunded,
        chargeId: charge.id
    })

     await order.save()

       sendEmail();
        res.status(200).json(order)
} catch (error) {
    res.status(402).json({msg: error.message})
} 
})

    const getOrderById = asyncHandler( async(req, res) => {
        const order = await Order.findById(req.params.id)

        if(order) {
            res.json(order)
        } else {
            res.status(404)
            throw new Error('Order not found')
        }
    })
   
    const getOrders = asyncHandler( async (req, res) => {
        const orders = await Order.find({})

        if (orders) {
            res.json(orders.reverse())
        } else {
            throw new Error('Orders not found')
        }
    })

    const getMyOrders = asyncHandler( async(req, res) => {
        const orders = await Order.find({user: req.params.id}).populate('user', 'firstName email')
        if (orders) {
            res.json(orders.reverse())
        } else {
            res.status(404) 
            throw new Error('Orders not found')
        }
    })
   
    const getSetup = asyncHandler( async(req, res) => {
        const setup = await Setup.findById('6343390c73d2da4f32adc7ad')
        if (setup) {
            res.json(setup)
        } else {
            res.status(404) 
            throw new Error('Setup not found')
        }
    })

    const updateSetup = asyncHandler( async(req, res) => {
    const {cart, minutes, promoCodes } = req.body
    let setup = await Setup.findById('6343390c73d2da4f32adc7ad')
    if(setup) {
        setup.cart = cart
        setup.minutes = minutes
        setup.promoCodes = promoCodes
    } else {
        res.status(404)
        throw new Error('Setup Not Found')
    }
    await setup.save()
    const setups = await Setup.findById('6343390c73d2da4f32adc7ad')
    res.json(setups)
})

    const refundOrder = asyncHandler( async(req, res) => {
        const { orderId, chargeId } = req.body
        try {
            const refund = await stripe.refunds.create({
                charge: chargeId,
              });

              const order = await Order.findById(orderId)

              if(order && refund) {
                order.refunded = true
              }
              const updatedOrder = await order.save()
              res.json(updatedOrder)
        } catch (error) {
            res.status(402).json({msg: error.message})
        }
    })
    module.exports = {
        addOrderItems,
        getOrderById,
        getOrders,
        getMyOrders,
        getSetup,
        updateSetup,
        refundOrder,
        guestOrder
    }