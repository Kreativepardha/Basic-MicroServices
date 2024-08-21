const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: String,
    postalCode: String,
    city: String,
    country: String,
})


const AddressModel = mongoose.model('AddressModel', addressSchema)

module.exports =  AddressModel;