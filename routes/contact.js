const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');
const PWD = require('../env').PWD;
require('dotenv');

// Importation de Nodemailer:
const mailer = require('nodemailer');

let smtpTransport = require('nodemailer-smtp-transport');

// Création du chemin vers ma page contact:

router.post('/', (req, res) => {
    let data = new Contact(req.body);
    data.name = req.body.name;
    data.email = req.body.email;
    data.message = req.body.message;

    data.save(function (err) {
        if (err) {
            res.send(err);
        }

        // Préparation de notre mail.
        // On commence par authentifier notre expéditeur qui est notre serveur:
        let transporter = mailer.createTransport(smtpTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'nadia.aksouh@gmail.com', // generated ethereal user
                pass: PWD // protection du pwd
            }
        }));

        let mail = {
            from: req.body.name + req.body.email,
            to: 'nadia.aksouh@gmail.com',
            subject: 'New message from contact form',
            text: `${req.body.name}, (${req.body.email}), says: ${req.body.message}`
        }

        transporter.sendMail(mail, function (error, response) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Mail envoyé avec succès');
            }
            transporter.close();
        });

        res.redirect('/index');
    })
});

module.exports = router;