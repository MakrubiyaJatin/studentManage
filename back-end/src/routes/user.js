const { addUser, getUsers, updateUser, deleteUser } = require('../controller/user');
const { isAuth } = require('../utils/auth');

const userRoutes = require('express').Router();
userRoutes.post('/add-user',isAuth,addUser);
userRoutes.get("/get-user",isAuth,getUsers);
userRoutes.get("/get-user/:id",isAuth,getUsers);
userRoutes.put("/update-user/:id", isAuth,updateUser);
userRoutes.delete("/delete-user/:id", isAuth,deleteUser);

module.exports = userRoutes