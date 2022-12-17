const { addStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent } = require('../controller/student');
const { isAuth } = require('../utils/auth');

const studentRoutes = require('express').Router();
studentRoutes.post('/add-student',  addStudent);
studentRoutes.get("/get-student", isAuth, getStudents);
studentRoutes.get("/get-student/:id",  getStudentById);
studentRoutes.put("/update-student/:id",  updateStudent);
studentRoutes.delete("/delete-student/:id",  deleteStudent);

module.exports = studentRoutes