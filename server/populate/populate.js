const mongoose = require("mongoose");
const hospitals = require("./hospitals.json");
const HospitalModel = require("../db /hospital.model");

const populate = async () => {
    await HospitalModel.deleteMany();
    await HospitalModel.create(hospitals);
}

const main = async () => {
    await mongoose.connect("mongodb://127.0.0.1");

    await populate();

    await mongoose.disconnect();
};

main();