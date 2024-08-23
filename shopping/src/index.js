const express = require('express')
const dotenv = require('dotenv')
const ConnectDB = require('./database/connection')
dotenv.config()
const PORT = process.env.PORT

const app = express()
const DB_URL  = process.env.DB_URL;
module.exports = DB_URL


app.get("/", async (req,res) => {
    return res.json({
        message: "shopping"
    })
})

ConnectDB().then(() => {
app.listen(PORT, () => {
    console.log(`shopping Server started at port: ${PORT}`)
})
})
.catch((err) => {
console.error( `Failed to connect to database:: `, err)
})