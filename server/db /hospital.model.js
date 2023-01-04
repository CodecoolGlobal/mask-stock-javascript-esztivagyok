const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model("hospitals", HospitalSchema);