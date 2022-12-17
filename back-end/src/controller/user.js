// const {User} = require("../models/user")
const {  GENDER } = require('../const');
const { User } = require('../models/user')
const bcrypt = require("bcrypt")
const addUser = async (req, res) => {
    
    const { name, email, password, mobile, gender } = req.body
    try {

        const isExist = await User.findOne({ email, deletedAt: null });
        if (isExist) {
            return res.status(403).json({ message: "User Alerdy Exist!" })
        }
        const hasPass = await bcrypt.hash(password, 10);
        const user = await new User({ name, email, mobile, password: hasPass, gender:GENDER[gender.toUpperCase()] }).save();
        return res.status(201).json({ message: "User Created", data: user })
    } catch (error) {
        console.error("error ", error)
        return res.status(500).json({ message: "Internal Error!" })
    }
}
const getUsers = async (req, res) => {
    try {
        const user = await User.find({ deletedAt: null })
        if (user.length < 1) {
            return res.status(404).json({ message: "User Not Found!" });
        }
        return res.status(200).json({ message: "Get User Data!", data: user });

    } catch (error) {
        console.error('error ', error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user || user != null) {
            return res.status(404).json({ message: "User Not Found!" });
        }
        return res.status(200).json({ message: "Get User Data", data: user });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" })
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, email, password, gender } = req.body;
        const { id } = req.params;
        const existUser = await User.findById(id);
        if (!existUser || existUser != null) {
            return res.status(404).json({ message: "User Not Found!" });
        }
        let updateValue = { name, email, gender:GENDER[gender.toUpperCase()] }
        //checked when get role to update role
        if (password) {
            const hasPass = await bcrypt.hash(password, 10);
            updateValue = { ...updateValue, password: hasPass };
        }
        const user = await User.findByIdAndUpdate(id, updateValue);
        return res.status(200).json({ message: "User Updated", data: user });
    } catch (error) {
        console.error("error ", error);
        return res.status(500).json({ message: "Internal Server error!" })
    }
}

const deleteUser = async (req,res) => {
    try {
        const { id } = req.params;
        const existUser = await User.findById(id);
        console.log(existUser)
        if (!existUser || existUser != null) {
            return res.status(404).json({ message: "User Not Found!" });
        }
        
        await User.findByIdAndUpdate(id, { deletedAt: new Date().toISOString() })
        return res.status(200).json({ message: "Deleted User!" })
    } catch (error) {
        console.error("error ", error);
        return res.status(500).json({ message: "Internal Server error!" })
    }
}
module.exports = { addUser, getUsers, getUserById, updateUser, deleteUser }