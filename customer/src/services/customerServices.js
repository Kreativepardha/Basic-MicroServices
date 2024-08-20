const CustomerRepository = require("../database/repository/customerRepository");
const bcrypt = require('bcrypt')

class CustomerService{
        constructor() {
            this.repository  = new CustomerRepository();
        }

        async SignUp(userInputs) {
        const { email, password, phone } = userInputs;
        let salt = await bcrypt.genSalt();

        let userPassword = await bcrypt.hash(password, salt)

        const existingCustomer = await this.repository.CreateCustomer({ email, password: userPassword, phone, salt})
        }
}