const { login, getProfile, register } = require('../controller/auth');
const { isAuth } = require('../utils/auth');

const authRoutes = require('express').Router();
authRoutes.post('/login', login);
authRoutes.post('/register', register);
authRoutes.get("/get-profile", isAuth,getProfile);

module.exports = authRoutes