const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const Hospitals = require("./db /hospital.model")

mongoose.connect("mongodb://127.0.0.1")

app.get("/", async (req, res) => {
    const data = await Hospitals.find();
    res.json(data);
})


app.listen(8080);
