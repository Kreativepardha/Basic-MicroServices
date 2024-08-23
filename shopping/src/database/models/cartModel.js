const mongoose = require('mongoose');
 

const cartSchema = new mongoose.Schema({
    customerId: { type: String },
    items: [
        {   
            product: {
                _id: { type: String, require: true},
                name: { type: String },
                desc: { type: String },
                banner: { type: String },
                type: { type: String },
                unit: { type: Number },
                price: { type: Number },
                suplier: { type: String },
            } ,
            unit: { type: Number, require: true} 
        }
    ]
});

// module.exports =  mongoose.model('cart', CartSchema);/


const CartModel = mongoose.model("CartModel", cartSchema)

module.exports  = CartModel;