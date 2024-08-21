const CustomerService = require('../services/customerServices')
const { signInSchema, signupSchema, addressSchema } = require('../../utils/validations/customerValidations')
const { ZodError } = require('zod')



class CustomerController {
    constructor() {
        this.service = new CustomerService()
        
    }
    async signUp(req,res) {
        try {
              const result = signupSchema.safeParse(req.body)
              const customer = await this.service.signUp(result.data)
             if(!result.success) {
                    if(result.error instanceof ZodError) {
                        return res.status(422).json({
                            message:"Zod validation erro",
                            error:err.message
                        })
                    }
             }         
              
                res.status(201).json(customer);

        } catch (err) {
            if(err instanceof ZodError) {
                return res.status(422).json({
                    error:err.ZodError,
                    message:"zod errorr",
                    err
                })
            }
            res.status(400).json({ 
                message:"Customer Controller errror:::",
                error: err.message
             })
        }
    }
    async signIn(req,res) {
        try {
            const result = signInSchema.safeParse(req.body)
            const token = await this.service.signIn(result.data)
            if(!result.success) {
                if(result.error instanceof ZodError) {
                    return res.status(422).json({
                        message:"Zod validation erro",
                        error:err.message
                    })
                }
         }     
         const payload = await this.service.signIn(result.data)
         res.status(200).json({ token: payload.token, customer: payload.customer })
        } catch (err) {
            res.status(400).json({
                message:"Customer Controller error",
                error: err.message
            })
        }
    }
    async addWishlistItem(req, res) {
        try {
            const { customerId } = req.params;
            const wishlistItem  = req.body;

            const updatedCustomer = await this.service.AddWishlistItem(customerId, wishlistItem)
            res.status(200).json(updatedCustomer)
        } catch (err) {
        res.status(400).json({ error: err.message  })
        }
    }

    async addAddres(req, res) {
        try {
            const { customerId  } = req.params;
            const validateDate = addressSchema.parse(req.body)

            const updatedCustomer = await this.service.AddAddres(customerId, validateDate)
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

const customerService = new CustomerService()
const customerController = new CustomerController(customerService)



module.exports = {CustomerController, customerController};
