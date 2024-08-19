const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT
const proxy = require('express-http-proxy')
const app = express()

const customerEP = process.env.customerEP
const shoppingEP = process.env.shoppingEP
const productEP = process.env.productEP

console.log("customer::", customerEP)
console.log("shopping::", shoppingEP)
console.log("product::", productEP)

app.use('/customer', proxy(`${customerEP}`))
app.use('/shopping', proxy(`${shoppingEP}`))
app.use('/', proxy(`${productEP}`))






app.listen(PORT, () => {
    console.log(`gateway Server started at port: ${PORT}`)
})