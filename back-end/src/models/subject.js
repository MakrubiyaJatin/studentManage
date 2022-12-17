const mongoose = require("mongoose");


const subjectSchema = new mongoose.Schema({
    studentRollNumber: { type: String },
    studentId: { type: String },
    subjectName:{type:String},
    subjectCode: { type: String },
    marks:{type:String},
    deletedAt: { type: String, require: false, default: null }
})

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = { Subject }