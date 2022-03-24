const User = require('../models/User');
const validator = require('express-validator');
const { accessToken } = require('../utils/accessToken');

const newUser = (req, res) =>
{
    const { username, password, admin } = req.body;

    const errors = validator.validationResult(req).errors;
    console.log(errors);  
    
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };
    // ansonsten überspringen

    const createUser = new User();
    createUser.username = username;
    createUser.password = createUser.hashPassword(password);
    createUser.admin = admin;
    createUser.pet = {
        petname,
        animal,
        animalAge
    } = req.body;
    createUser.address = {
        streetAndNumber,
        postcode,
        city
    } = req.body;

    // in die datenbank speichern
    createUser.save((err, user, ) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Something is wrong...!" });
        }

        return res.status(200).json({ success: true, data: user });
    });
};

const getUsers = (req, res) => {

    User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Something is wrong...!" });
        }

        return res.status(200).json({ success: true, amount: users.length, data: users });
    });
};

const existedUser = (req, res) =>
{
    const errorMessage = 'Username or Password incorrect!';

    const { username, password } = req.body;
    
    User.findOne({ username }).then(foundUser =>
    {
        if(foundUser)
        {
            const token = accessToken({ username: foundUser.username });

            if(foundUser.comparePassword(password))
            {
                res.cookie('access_token', token, {
                        // httpOnly: true,
                        maxAge: 24 * 60 * 60
                    })
                    .status(200)
                    .json({
                        success: true,
                        message: `User '${ foundUser.username }' is logged in!`
                    });
            }
            else
            {
                res.status(200).json({
                    success: false,
                    errors: [ errorMessage ]
                });
            }
        }
        else
        {
            res.status(200).json({
                success: false,
                errors: [ errorMessage ]
            });
        }
    });
};


module.exports = {
    newUser,
    getUsers,
    existedUser
};