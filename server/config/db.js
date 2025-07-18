const mongoose = require("mongoose")

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB Connected Successfully")
    } catch (error) {
        console.error("MongoDB Connextion Failed",error)
    }
}
module.exports = connectDB;