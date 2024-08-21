const mongoose = require('mongoose')
const CustomerModel = require('../models/customerModel')
const AddressModel = require('../models/addressModel')


class CustomerRepository {

        async CreateCustomer( {email, password, phone, salt }  ) {

            const customer = new CustomerModel({
                email,password,salt,phone,address: []
            })
            
            const customerResult = await customer.save()
            return customerResult;
        }
        async FindCustomerByEmail(email) {
            return await CustomerModel.findOne({ email })
        }
        async FindCustomerById(customerId) {
            return await CustomerModel.findById(customerId).populate('address')
        }

}


module.exports = CustomerRepository