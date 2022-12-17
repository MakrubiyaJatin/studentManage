const { GENDER } = require("../const");
const { Student } = require("../models/student");

const addStudent = async (req, res) => {
    const { firstName,
        lastName,
        roleNumber,
        age,
        city,
        gender } = req.body;
    try {
        const student = await new Student({firstName,
            lastName,
            roleNumber,
            age,
            city,
            gender:GENDER[gender.toUpperCase()] }).save();
        return res.status(200).json({ message: "Added Student !", data: student });
    } catch (error) {
        console.error('error  ', error);
        return res.status(500).json({ message: "Server Error!" })
    }
}

const getStudents = async (req, res) => {
    try {
        const student = await Student.find({ deletedAt: null });
        if (student.length < 1) {
            return res.status(404).json({ message: "Not found!" });
        }
        return res.status(200).json({ message: "get Student!", data: student })
    } catch (error) {
        console.log('error ', error);
        return res.status(500).json({ message: "Server Error!" })
    }
}
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student || student?.deletedAt != null) {
            return res.status(404).json({ message: "Not found!" });
        }
        return res.status(200).json({ message: "get Student!", data: student })
    } catch (error) {
        console.log('error ', error);
        return res.status(500).json({ message: "Server Error!" })
    }
}

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName,
            lastName,
            roleNumber,
            age,
            city,
            gender } = req.body;
        const student = await Student.findById(id);
        if (!student || student?.deletedAt != null) {
            return res.status(404).json({ message: "Student Not found!" });
        }
        await Student.findByIdAndUpdate(id, { firstName,
            lastName,
            roleNumber,
            age,
            city,
            gender:GENDER[gender.toUpperCase()] })
        return res.status(200).json({ message: "updated Student!" })
    } catch (error) {
        console.log('error ', error);
        return res.status(500).json({ message: "Server Error!" })
    }
}


const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student || student?.deletedAt != null) {
            return res.status(404).json({ message: "Not found!" });
        }
        await Student.findByIdAndUpdate(id, { deletedAt: new Date().toISOString() })
        return res.status(200).json({ message: "updated Student!" })
    } catch (error) {
        console.log('error ', error);
        return res.status(500).json({ message: "Server Error!" })
    }
}

const permanentDeleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student || student?.deletedAt != null) {
            return res.status(404).json({ message: "Not found!" });
        }
        await Student.findByIdAndDelete(id)
        return res.status(200).json({ message: "updated Student!" })
    } catch (error) {
        console.log('error ', error);
        return res.status(500).json({ message: "Server Error!" })
    }
}



module.exports = { addStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    permanentDeleteStudent}