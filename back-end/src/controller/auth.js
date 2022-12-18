const { User } = require("../models/user")
const bcrypt = require("bcrypt");
const { createToken } = require("../utils");
const { GENDER } = require("../const");
const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const userExist = await User.findOne({ email, deletedAt:null });
        if (!userExist) {
            return res.status(404).json({ message: "User Not Exist" });
        }
        const passcom = bcrypt.compare(password, userExist.password);
        if (!passcom) {
            return res.status(401).json({ message: 'Invalid Password' });
        }
        console.log("🚀 ~ file: auth.js ~ line 17 ~ login ~ userExist._id", userExist._id.toString())
        const token = createToken({user_id: userExist._id.toString()});
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "None",
        });
        return res.status(200).json({ message: "Login Successfully!", data: userExist, access_token: token });

    } catch (error) {
        console.log('error ', error)
        return res.status(500).json({ message: 'Server Error!', error });
    }
}

const register = async (req, res) => {
    console.log('req.body ', req.body)
    const { name, email, password, mobile, gender } = req.body
    try {

        const isExist = await User.findOne({ email, deletedAt: null });
        if (isExist) {
            return res.status(403).json({ message: "User Alerdy Exist!" })
        }
        console.log('password ', password)
        const hasPass = await bcrypt.hash(password, 10);

        const user = await new User({ name, email, mobile, password: hasPass, gender:GENDER[gender.toUpperCase()] }).save();
        const token = createToken({user_id: user._id.toString()});
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "None",
            // secure: true,
        });
        return res.status(201).json({ message: "User Created", data: user })
    } catch (error) {
        console.error("error ", error)
        return res.status(500).json({ message: "Internal Error!" })
    }
}

const getProfile = async (req,res) =>{
    if(!req?.user)
    {
        return res.status(401).json({message:"Please Login Again"})
    }
    return res.status(200).json({message:"Get Data Successfully", data:req?.user})
}


module.exports = {
    login,
    register,
    getProfile
}