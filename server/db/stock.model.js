const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    item: String,
    amount: Number
})

module.exports = mongoose.model("stock", StockSchema);