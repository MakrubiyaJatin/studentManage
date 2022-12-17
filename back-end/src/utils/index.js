const jwt = require('jsonwebtoken');

const createToken = ({ user_id }) => {
    return jwt.sign({ user_id }, process.env.JWT_SECRET_KEY)
}

module.exports = {
    createToken,
  }