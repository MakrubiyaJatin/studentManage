const mongoose = require("mongoose");
const { GENDER } = require("../const");


const studentSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    roleNumber: { type: Number },
    age: { type: String },
    city: { type: String },
    gender: { type: String, enum: Object.values(GENDER) },
    deletedAt: { type: String, require: false, default: null }
})

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student }