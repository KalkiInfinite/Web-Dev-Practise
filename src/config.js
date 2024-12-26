const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb://localhost:27017/data")

connect.then(()=>{
    console.log("Database connected Ssccessfully")
})
.catch(()=>{
    console.log("Can't Connect to the Database")
})

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model("users",LoginSchema)
module.exports = collection