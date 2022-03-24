require('dotenv').config();
const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    try {
        
        const token = req.cookies.access_token;

        // wir verifizieren den token mit hilfe des secrets:
        const decodedData = jwt.verify(token, process.env.SECRET_KEY);

        console.log(decodedData);

        next();
    }
    catch (err) {
        res.status(401).json({ message: 'User is not authorized!' });
    }
};

module.exports = authorize;