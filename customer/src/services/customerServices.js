const { custom } = require("zod");
const CustomerRepository = require("../database/repository/customerRepository");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || require('../index');


class CustomerService{
        constructor() {
            this.repository  = new CustomerRepository();
        }

        async signUp(userInputs) {
            try {
                const { email, password, phone } = userInputs;
                console.log(`signUp called with email: ${email}, password: ${password}, phone: ${phone}`);
                let salt = await bcrypt.genSalt();
                console.log(`Generated salt: ${salt}`);
                let hashedPassword = await bcrypt.hash(password, salt)
                console.log(`Generated hash: ${hashedPassword}`);
                const existingCustomer = await this.repository.CreateCustomer({ email, password: hashedPassword, phone, salt})
                console.log("====================service===========================    ")
                return existingCustomer 
            } catch (err) {
                throw new Error(`Service error: ${err.message}`);     
            }
       
    }
        async signIn(userInputs) {
            console.log(`JWT_SECRET:: ${JWT_SECRET}`)
            const {email,password} = userInputs;
            const customer = await this.repository.FindCustomerByEmail(email);

            if(customer){
                const validPassword = await bcrypt.compare(password, customer.password)
                    if (validPassword){
                        const token = jwt.sign({ id: customer._id, email: customer.email }, JWT_SECRET)
                        const payload = {
                            token : `Bearer ${token}`,
                            customer: {
                                id: customer._id,
                                email: customer.email,
                                name: customer.name,
                            }
                        }
                        console.log(`===========${payload.customer.email}====================`)
                        return payload;
                    }
            }
            throw new Error("Invalid email or password")
        }

        async AddWishlistItem(customerId, wishlistItem) {
            const customer = await this.repository.FindCustomerById(customerId)
            customer.wishlist.push(wishlistItem)
            const updatedCustomer = await customer.save()
            return updatedCustomer;
        }

        async AddAddres(customerId, address) {
            const customer = await this.repository.FindCustomerById(customerId)
            customer.address.push(address)
            const updatedCustomer = await customer.save()
            return updatedCustomer;
        }
        async RemoveWishlistItem(customerId, wishlistItemId){
            const customer = await this.repository.FindCustomerById(customerId)
            customer.wishlist = customer.wishlist.filter(item => item._id !== wishlistItemId)
            const updatedCustomer = await customer.save()
            return updatedCustomer;
        }

        async RemoveAddress(customerId, addressId) {
            const customer = await this.repository.FindCustomerById(customerId)
            customer.address = customer.address.filter(addr => addr._id !== addressId)
            const updatedCustomer = await customer.save()
            return updatedCustomer;
        }
}



module.exports =  CustomerService;