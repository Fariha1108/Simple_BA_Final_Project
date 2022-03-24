const { Schema, model } = require('mongoose');

const petSchema = new Schema({
    petname: String,
    animal: String,
    animalAge: Number
}, { timestamps: true })

// gibt mir direkt nach dem speichern eine nachricht
.post('save', (doc) => {
    console.log("Pet is created successfully!", doc);
});

const petModel = new model('Pet', petSchema, 'pets');

module.exports = { petModel, petSchema };