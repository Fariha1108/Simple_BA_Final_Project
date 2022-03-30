const User = require('../models/User');
const validator = require('express-validator');
const { accessToken } = require('../utils/accessToken');
//const { convertDogAge, convertSeaPigAge, convertCatAge, convertCockatielAge } = require('../middleware/convertPetsAge');

const newUser = (req, res) => {

    let animalAgeInHumanYears;

    const { username, password, admin } = req.body;

    const errors = validator.validationResult(req).errors;
    console.log(errors);

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };
    // ansonsten überspringen

    createUser = new User();
    createUser.username = username;
    createUser.password = createUser.hashPassword(password);
    createUser.admin = admin;

    if (req.body.animal === 'cat') {
        let { animalAge } = req.body;

        if (animalAge <= 15) {


            createUser.pet = {
                petname,
                animal,
                animalAge,
                animalAgeInHumanYears = animalAge * 7
            } = req.body;
        }
        console.error('The age of your pet is not correct!');
    }

    // in die datenbank speichern
    createUser.save((err, user) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Something is wrong...!" });
        }

        return res.status(200).json({ success: true, data: user, animalAgeInHumanYears });
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

const existedUser = (req, res) => {
    const errorMessage = 'Username or Password incorrect!';

    const { username, password } = req.body;

    User.findOne({ username }).then(foundUser => {
        if (foundUser) {
            const token = accessToken({ username: foundUser.username });

            if (foundUser.comparePassword(password)) {
                res.cookie('access_token', token, {
                    // httpOnly: true,
                    maxAge: 24 * 60 * 60
                })
                    .status(200)
                    .json({
                        success: true,
                        message: `User '${foundUser.username}' is logged in!`
                    });
            }
            else {
                res.status(200).json({
                    success: false,
                    errors: [errorMessage]
                });
            }
        }
        else {
            res.status(200).json({
                success: false,
                errors: [errorMessage]
            });
        }
    });
};

const logoutUser = (req, res) => {
    return res
        .clearCookie('access_token')
        .status(200)
        .json({
            success: true,
            message: 'User logged out'
        });
};

module.exports = {
    newUser,
    getUsers,
    existedUser,
    logoutUser
};