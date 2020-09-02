const mongoose = require('mongoose')
const moment = require('moment')
mongoose.set('useFindAndModify', false)

function getDate(){
    return mo
}
const Schame = mongoose.Schema
const Picturechema = new Schame({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    address: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Picture = mongoose.model('pictures', Picturechema)