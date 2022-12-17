const mongoose = require("mongoose");
const { ROLE_TYPE, GENDER } = require("../const");


const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    gender:{type:String, enum:Object.values(GENDER)},
    mobile: { type: String },
    deletedAt: { type: String, require: false, default: null }
})

const User = mongoose.model('Users', userSchema);

module.exports = { User }