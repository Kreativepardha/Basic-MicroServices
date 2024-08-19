const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: String,
    postalCode: String,
    city: String,
    country: String,
})


const Address = mongoose.model('Adress', addressSchema)

module.exports =  Address;