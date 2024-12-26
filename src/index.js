const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const collection = require("./config")
const pizza = require("./pizza")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "../public"))) // Adjust path for public folder

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html")) // Serve login HTML
})

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/signup.html")) // Serve signup HTML
})

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/home.html")) // Serve Home HTML
})

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const existinguser = await collection.findOne({ name: data.name })

    if (existinguser) {
        res.send("User already exists")
    } else {
        const saltrounds = 10
        const hashedPassword = await bcrypt.hash(data.password, saltrounds)
        data.password = hashedPassword
        const userdata = await collection.insertMany(data)
        console.log(userdata)
        res.redirect("/") // Redirect to login after signup
    }
})

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username })
        if (!check) {
            res.send("Username not found")
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)
        if (isPasswordMatch) {
            res.sendFile(path.join(__dirname, "../public/home.html")) // Serve home HTML on successful login
        } else {
            res.send("Wrong password")
        }
    } catch {
        res.send("Incorrect details")
    }
})

app.post("/addPizza", async (req, res) => {
    const Pizza = {
        username: req.body.username,
        name: req.body.name,
        category: req.body.category,
        size: req.body.size,
        cost: req.body.cost
    }
    const pizzadata = await pizza.insertMany(Pizza)
    console.log(pizzadata)
    res.sendFile(path.join(__dirname, "../public/home.html"))
})

app.get("/getOrders", async (req, res) => {
    const orders = await pizza.find({});
    res.json(orders);
});

app.get("/delete/:id", async (req, res) => {
    let users = await pizza.findOneAndDelete({_id: req.params.id})
    res.sendFile(path.join(__dirname, "../public/home.html")) // Serve Home HTML
})

const port = 3000
app.listen(port, () => {
    console.log(`Server running on Port: http://localhost:${port}`)
})
