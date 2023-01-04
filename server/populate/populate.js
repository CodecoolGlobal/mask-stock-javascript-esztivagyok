const mongoose = require("mongoose");
const hospitals = require("./hospitals.json");
const HospitalModel = require("../db /hospital.model");
const UserModel = require("../db /user.model");
const users = require("./users.json");
const StockModel = require("../db /stock.model");
const stock = require("./stock.json");

const populate = async () => {
    await HospitalModel.deleteMany();
    await UserModel.deleteMany();
    await StockModel.deleteMany();
    await HospitalModel.create(hospitals);
    await UserModel.create(users);
    await StockModel.create(stock);
}

const main = async () => {
    await mongoose.connect("mongodb://127.0.0.1");

    await populate();

    await mongoose.disconnect();
};

main();