const express = require("express");
require("dotenv").config();
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mailer = require('nodemailer');

//const port = 3001;

//Passport config
require('./config/passport')(passport);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//Express-session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

//Passport middware
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(flash());

app.use(express.static('./public'));

app.use('/index', require("./routes/index"));


//utilisation de express basic authentification
/*function auth(req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        next(err);
        return;
    }

    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'pompon' && pass == 'rouxminet') {
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        next(err);
    }
}

app.use('/admin', auth);*/

app.use('/admin', require("./routes/admin"));
app.use('/admin.supp', require("./routes/admin.supp"));
app.use('/edit', require("./routes/admin_edit"));
app.use('/contact', require("./routes/contact"))
app.use('/admin/contact', require("./routes/admin_contacts"))

app.listen(3001, () => console.log(`Allo j'écoute!`));