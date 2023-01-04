const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const Hospitals = require("./db /hospital.model");
const Users = require("./db /user.model");

mongoose.connect("mongodb://127.0.0.1")

app.get("/hospitals", async (req, res) => {
    const data = await Hospitals.find();
    res.json(data);
})

app.get("/users", async (req, res) => {
    const data = await Users.find();
    res.json(data);
})


app.listen(8080);
