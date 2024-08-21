const { custom } = require("zod");
const CustomerRepository = require("../database/repository/customerRepository");
const bcrypt = require('bcrypt')



const JWT_SECRET = process.env.JWT_SECRET
module.exports = JWT_SECRET




class CustomerService{
        constructor() {
            this.repository  = new CustomerRepository();
        }

        async SignUp(userInputs) {
        const { email, password, phone } = userInputs;
        let salt = await bcrypt.genSalt();

        let hashedPassword = await bcrypt.hash(password, salt)

        const existingCustomer = await this.repository.CreateCustomer({ email, password: hashedPassword, phone, salt})
           return existingCustomer 
    }
        async SignIn(userInputs) {
            const {email,password} = userInputs;
            const customer = await this.repository.FindCustomerByEmail(email);

            if(customer){
                const validPassword = await bcrypt.compare(password, customer.password)
                    if (validPassword){
                        const token = jwt.sign({ id: customer._id, email: customer.email }, JWT_SECRET)
                        return token;
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