const Pet = require('../models/Pet');
const validator = require('express-validator');

const newPet = (req, res) =>
{
    const { petname, animal, animalAge } = req.body;

    const errors = validator.validationResult(req).errors;
    console.log(errors);  
    
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };
    // ansonsten überspringen

    const createPet = new Pet();
    createPet.petname = petname;
    createPet.animal = animal;
    createPet.animalAge = animalAge;
    
    // in die datenbank speichern
    createPet.save((err, user, ) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Something is wrong...!" });
        }

        return res.status(200).json({ success: true, data: user });
    });
};

module.exports = { newPet };