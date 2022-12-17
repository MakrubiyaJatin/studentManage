const { GENDER } = require("../const");
const { Subject } = require("../models/subject");

const addSubject = async (req, res) => {
    const {
        studentRollNumber,
        studentId,
        subjectName,
        subjectCode,
        marks } = req.body;
    try {
        const subject = await new Subject({
            studentRollNumber,
            studentId,
            subjectName,
            subjectCode,
            marks
        }).save();
        return res.status(200).json({ message: "Added Subjects and Mark !", data: subject });
    } catch (error) {
        console.error('error  ', error);
        return res.status(500).json({ message: "Server Error!" })
    }
}

const getSubjectMarks = async (req, res) => {
    const studentId = req.params.student_id;
    try {
        const subject = await Subject.find({ deletedAt: null, studentId: studentId });
        return res.status(200).json({ message: "get Subject!", data: subject })
    } catch (error) {
        console.log('error ', error);
        return res.status(500).json({ message: "Server Error!" })
    }
}
const getSubjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await Subject.findById(id);
        if (!subject || subject?.deletedAt != null) {
            return res.status(404).json({ message: "Not found!" });
        }
        return res.status(200).json({ message: "get Subject!", data: subject })
    } catch (error) {
        console.log('error ', error);
        return res.status(500).json({ message: "Server Error!" })
    }
}

const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const { studentRollNumber,
            studentId,
            subjectName,
            subjectCode,
            marks } = req.body;
        const subject = await Subject.findById(id);
        if (!subject || subject?.deletedAt != null) {
            return res.status(404).json({ message: "Student Not found!" });
        }
        await Subject.findByIdAndUpdate(id, {
            studentRollNumber,
            studentId,
            subjectName,
            subjectCode,
            marks
        })
        return res.status(200).json({ message: "updated Subject!" })
    } catch (error) {
        console.log('error ', error);
        return res.status(500).json({ message: "Server Error!" })
    }
}


const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await Subject.findById(id);
        if (!subject || subject?.deletedAt != null) {
            return res.status(404).json({ message: "Not found!" });
        }
        await Subject.findByIdAndUpdate(id, { deletedAt: new Date().toISOString() })
        return res.status(200).json({ message: "Deleted Subject!" })
    } catch (error) {
        console.log('error ', error);
        return res.status(500).json({ message: "Server Error!" })
    }
}

const permanentDeleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await Subject.findById(id);
        if (!subject || subject?.deletedAt != null) {
            return res.status(404).json({ message: "Not found!" });
        }
        await Subject.findByIdAndDelete(id)
        return res.status(200).json({ message: "Deleted Student!" })
    } catch (error) {
        console.log('error ', error);
        return res.status(500).json({ message: "Server Error!" })
    }
}



module.exports = {
    addSubject,
getSubjectMarks,
getSubjectById,
updateSubject,
deleteSubject,
permanentDeleteSubject
}