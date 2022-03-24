const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const { newPet } = require('../controllers/pets');
const { convertDogAge, convertSeaPigAge, convertCatAge, convertCockatielAge } = require('../middleware/convertPetsAge');


router.route('/cat')
.post( convertCatAge, newPet )

module.exports = router;
