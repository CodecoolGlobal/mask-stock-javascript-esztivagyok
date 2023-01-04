const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    name: String,
    hospital: {
        type: mongoose.Schema.Types.ObjectId, ref: "hospitals"
    },
    item: String,
    amount: Number
})

module.exports = mongoose.model("orders", OrderSchema);