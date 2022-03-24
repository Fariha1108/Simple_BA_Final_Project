require('dotenv').config();
const crypto = require('crypto');

// mit crypto randomBytes(64) erstelle ich einen zufälligen Key und speichere es in der .env ab
//console.log('Key mit crypto.randomBytes: ' + crypto.randomBytes(64).toString('hex'));

const { Schema, model } = require('mongoose');
const { addressSchema } = require('./UserAddress');
const { petSchema } = require('./Pet');

const userSchema = new Schema({
    username: String,
    password: String,
    admin: {
        type: Boolean,
        default: false,
    },
    pet: petSchema,
    address: addressSchema
}, { timestamps: true })

// gibt mir direkt nach dem speichern eine nachricht
.post('save', (doc) => {
    console.log("User is created successfully!", doc);
});

// hier erstellen wir einen gehashten passwort und fügen es direkt unsem schema hinzu
userSchema.methods.hashPassword = (password) => {
    // secret key ist in der .env datei
    const myKey = process.env.SECRET_KEY;

    // wir nutzen crypto, mit unserem secret key und dem übergebenen passwort:
    const hash = crypto.createHmac('sha256', myKey).update(password).digest('hex');

    return hash;
};

userSchema.methods.comparePassword = function (loginPassword) {
    if (this.password !== this.hashPassword(loginPassword)) {
        return false;
    }

    return true;
}

const userModel = new model('User', userSchema, 'users');

module.exports = userModel;
