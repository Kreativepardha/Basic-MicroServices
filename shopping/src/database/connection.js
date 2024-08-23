const mongoose = require('mongoose')


const DB_URL = require('../index')

async function ConnectDB (){
    try {
            await mongoose.connect(DB_URL)
            .then(() => {
                console.log(`Databse connected to :::${DB_URL}::::`)
            })
            .catch((err) => {
            console.error(`DATABSE ERROR IS ${err}`)
            })
    } catch (err) {
        console.log(`internal server error : ${err}`)
    }
}



module.exports = ConnectDB