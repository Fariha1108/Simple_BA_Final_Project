require('dotenv').config();
const jwt = require('jsonwebtoken');

const accessToken = (data) => {
  
    // erstelln einen token
    return jwt.sign(data, process.env.SECRET_KEY,{ expiresIn: '1800s' });
};

module.exports = { accessToken };