const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async() => {
    const mongoURI = process.env.MONGO_DB
    const dbConn = await mongoose.connect(mongoURI)
}

module.exports = {connectDB}
