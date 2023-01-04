const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
    name: String,
    city: String,
    country: String
})

module.exports = mongoose.model("hospitals", HospitalSchema);