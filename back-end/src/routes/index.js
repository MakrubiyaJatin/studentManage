const router = require("express").Router()
const authRoutes = require("./auth");
const studentRoutes = require("./student");
const userRoutes = require("./user")

router.use('/auth',authRoutes)
router.use('/user', userRoutes);
router.use("/student",studentRoutes);
module.exports = router