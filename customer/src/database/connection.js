const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config()

const DB_URL = process.env.DB_URL || "";
console.log(DB_URL)

async function connectDB(){
    mongoose.connect(DB_URL).then(() => {
        console.log("customer DB connected ")
    }
)
.catch((err) => {
    console.error('Error ============ ON DB Connection')
    console.log(err);
    throw err;
})
}



module.exports = connectDB;