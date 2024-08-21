 const express = require('express')
const dotenv = require('dotenv')
const CustomerController = require('./controllers/CustomerController')
const DB_URL = require('./database/connection')
const connectDB = require('./database/connection')
const isAuthenticated = require('./middlewares')
dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(express.json())


app.get("/", async (req,res) => {

    return res.json({
        message: "customer"
    })
})

const JWT_SECRET = process.env.JWT_SECRET
module.exports = JWT_SECRET


app.post('/signin', (req,res) => CustomerController.customerController.signIn(req,res))
app.post('/signup',(req,res) => CustomerController.customerController.signUp(req,res))

app.post('/:customerId/wishlist',isAuthenticated ,(req, res) => CustomerController.customerController.addWishlistItem(req, res));
app.delete('/:customerId/wishlist/:wishlistItemId',isAuthenticated ,(req, res) => CustomerController.customerController.removeWishlistItem(req, res));
app.post('/:customerId/address',(req, res) => CustomerController.customerController.addAddres(req, res));
app.delete('/:customerId/address/:addressId', isAuthenticated,(req, res) => CustomerController.customerController.removeAddress(req, res));


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Customer Server started at port: ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database:', err);
});