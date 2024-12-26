const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb://localhost:27017/pizzadata")

connect.then(()=>{
    console.log("Database connected Ssccessfully")
})
.catch(()=>{
    console.log("Can't Connect to the Database")
})

const PizzaSchema = new mongoose.Schema({
    username: String,
    name: String,
    category: String,
    size: String,
    cost: Number
})

module.exports = new mongoose.model("orders",PizzaSchema)