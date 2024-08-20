const mongoose = require('mongoose')

const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL).then(() => {
    console.log("customer DB connected ")
}
)
.catch((err) => {
    console.error('Error ============ ON DB Connection')
    console.log(err);
})
