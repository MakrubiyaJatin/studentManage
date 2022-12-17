const jwt = require('jsonwebtoken');
const { ROLE_TYPE } = require('../const');
const { User } = require('../models/user');
// const { User, Role } = require('../models');

async function authenticate(req, res, next) {
    try {

        const authToken = (req?.cookies?.access_token || req?.headers?.Authorization || req?.headers?.authorization || req?.headers?.access_token || '').replace("Bearer ", "");
        if (!authToken) {
            throw Error("Authentication token not found!")
        }
        const decoded = await jwt.verify(authToken, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded?.user_id)

        // Passing the id to the next routes
        req.user_id = decoded?.user_id;
        req.user = user;
    } catch (err) {
        req.user = null;
        req.user_id = null;
    }

    return next();
}

async function isAuth(req, res, next) {
    // Verifying if the token is in the auth header or else, the user isn't allowed to proceed
    if (!req?.user_id || !req?.user) {
        return res.status(401).json({ message: 'Unauthorized. Please Login' });
    }

    return next();
}

module.exports = {
    authenticate,
    isAuth,
};
