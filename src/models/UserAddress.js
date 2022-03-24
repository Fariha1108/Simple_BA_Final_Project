const { Schema } = require('mongoose');

const addressSchema = new Schema({
    streetAndNumber: { type: String, trim: true },
    postcode: { type: String, trim: true },
    city: { type: String, trim: true }
}, { timestamps: false, _id: false });


module.exports = { addressSchema };