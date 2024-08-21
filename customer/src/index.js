 const express = require('express')
const dotenv = require('dotenv')
const CustomerController = require('./controllers/CustomerController')
dotenv.config()
const PORT = process.env.PORT

const app = express()

app.get("/", async (req,res) => {

    return res.json({
        message: "customer"
    })
})

app.post('/signup', CustomerController.signUp)
app.post('/signin', CustomerController.signIn)

router.post('/:customerId/wishlist', (req, res) => customerController.addWishlistItem(req, res));
router.delete('/:customerId/wishlist/:wishlistItemId', (req, res) => customerController.removeWishlistItem(req, res));
router.post('/:customerId/address', (req, res) => customerController.addAddress(req, res));
router.delete('/:customerId/address/:addressId', (req, res) => customerController.removeAddress(req, res));


app.listen(PORT, () => {
    console.log(`Customer Server started at port: ${PORT}`)
})