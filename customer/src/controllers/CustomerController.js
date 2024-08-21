const express = require('express')
const CustomerService = require('../services/customerServices')
const { signInSchema, signupSchema, addressSchema } = require('../../utils/validations/customerValidations')



class CustomerController {
    constructor() {
        this.service = new CustomerService()
    }
   static async signUp(req,res) {
        try {
              const result = signupSchema.safeParse(req.body)
              const customer = await this.service.SignUp(result)
              res.status(201).json(customer);

        } catch (err) {
            res.status(400).json({ 
                message:"Customer Controller errror:::",
                err
             })
        }
    }
   static async signIn(req,res) {
        try {
            const result = signInSchema.safeParse(req.body)
            const token = await this.service.SignIn(result)
            res.status(200).json({ token })
        } catch (err) {
            res.status(400).json({
                message:"Customer Controller error",
                err
            })
        }
    }
    async addWishlistItem(req, res) {
        try {
            const { customerId } = req.params;
            const wishlistItem  = req.body;

            const updatedCustomer = await this.service.AddWishListItem(customerId, wishlistItem)
            res.status(200).json(updatedCustomer)
        } catch (err) {
        res.status(400).json({ error: err.message  })
        }
    }

    async addAddres(req, res) {
        try {
            const { customerId  } = req.params;
            const validateDate = addressSchema.parse(req.body)

            const updatedCustomer = await this.service.addAddres(customerId, validateDate)
            res.status(200).json({ message:"Addres updated Succesfully", updatedCustomer })
        } catch (err) {
                res.status(400).json({ error:err.message })
        }
    }
    async removeAddress(req, res) {
        try {
            const { customerId, addressId } = req.params;

            const updatedCustomer = await this.service.RemoveAddress(customerId, addressId);
            res.status(200).json(updatedCustomer);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

};





module.exports = CustomerController;
