const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: String,
    postalCode: String,
    city: String,
    country: String,
})


const AddressModel = mongoose.model('AdressModel', addressSchema)

module.exports =  AddressModel;