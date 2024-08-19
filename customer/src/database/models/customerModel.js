const mongoose = required('mongoose')

const customerSchema = new mongoose.Schema({
    email: String,
    password: String,
    salt: String,
    phone: String,
address: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'Address',
            required: true
          }
    ],
cart: [
            {
                product: {
                _id: { type: String, required:true },
                name: { type: String },
                banner: { type: String  },
                price: {  type: Number  }
                },
                unit: { type: Number, required: true }
            }
    ],
wishlist: [
    {   
        _id: { type: String, required: true },
        name: { type: String },
        description: { type: String },
        banner: {  type: String },
        available: { type: Boolean },
        price: { type: Number }
    }
],
orders: [
    {
        _id: { type: String, required: true },
        amount: { type: String },
        date: { type: Date, default: Date.now() }
    }
]
})


const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer