require('dotenv').config();

// module
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// lokale routen
const users = require('./routes/users');
const pets = require('./routes/pets');

const app = express();
const port = process.env.PORT || 3000;

// datenbank-anbindung
const databaseURL = `${process.env.DB_URL}`;
mongoose.connect(databaseURL)
.then(() => console.log('Database connected! 😍'))
.catch(() => console.log('Database is not connected! ☹️'));

// cors
const { security } = require('./middleware/security');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(security);

// routen mit inhalt
app.use("/user", users);
app.use("/pet", pets);

app.use("/", express.static("public", { index: false }));

app.listen(port, () => console.log('The server is listening on port ' + port));


  



