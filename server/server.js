const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Hospitals = require("./db /hospital.model");
const Users = require("./db /user.model");
const Stock = require("./db /stock.model");
const Orders = require("./db /orders.model");

mongoose.connect("mongodb://127.0.0.1");
app.use(express.json());

//list all hospitals
app.get("/api/hospitals", async (req, res) => {
    const data = await Hospitals.find();
    res.json(data);
})

//add a new hospital
app.post("/api/hospitals", async (req, res) => {
    const hospital = await Hospitals.create(req.body);
    res.json(hospital);
})

//list all hospitals for one user with query parameter
app.get("/api/hospitals/user/", async (req, res) => {
    const name = req.query.name;
    const data = await Hospitals.find({ users: { $in: name } });
    res.json(data)
})

//list all users
app.get("/api/users", async (req, res) => {
    const data = await Users.find();
    res.json(data);
})

//list the stock
app.get("/api/stock", async (req, res) => {
    const data = await Stock.find();
    res.json(data);
})

//list all orders
app.get("/api/orders", async (req, res) => {
    const data = await Orders.find();
    res.json(data);
})

//add an order to the orders and update stock amount
app.post("/api/orders", async (req, res) => {
    const order = await Orders.create(req.body);
    const stock = await Stock.findOne({ name: "FFP2/KN95 mask" });
    const updateStock = await Stock.findOneAndUpdate({ name: "FFP2/KN95 mask" }, { $set: { amount: stock.amount - req.body.amount } });
    res.json(order);
})


app.listen(8080);
