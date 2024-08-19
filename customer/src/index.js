const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT

const app = express()

app.get("/", async (req,res) => {

    return res.json({
        message: "customer"
    })
})

app.listen(PORT, () => {
    console.log(`Customer Server started at port: ${PORT}`)
})