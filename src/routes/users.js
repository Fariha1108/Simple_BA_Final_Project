const express = require('express')
const router = express.Router();
const validator = require('express-validator');
const userAdmin = require('../middleware/admin');
const authorize = require('../middleware/authorize');
const  { newUser, getUsers, existedUser }  = require('../controllers/users');

/*
    routen für user
    POST        /users/signup  => erstelle einen neuen user
    POST        /users/login  => user logt sich ein
*/ 

const userValidation = [
    validator.body('username')
        .isEmail()
        .withMessage('Invalid Username!')
        .trim(),
    validator.body('password')
        .isLength({ min: 8, max: 16 })
        .not()
        .isIn(['password', 'test', '12345678', 'test1234', 'hallo123'])
        .withMessage('Invalid Password!')
        .trim(),
   validator.body('confirmPassword', 'Passwords do not match!')
        .custom((value, {req}) => (value === req.body.password))
];

router.route('/')
.get( userAdmin, authorize, getUsers )

router.route('/signup')
.post( userValidation, newUser )

router.route('/login')
.post( existedUser )

module.exports = router;
