const express = require("express");
const router = express.Router();
const Database = require('../models/database');
const Contact = require('../models/contactModel');
const { ensureAuthenticated } = require('../config/auth');

router.get('/admin_contacts', ensureAuthenticated, (req, res) => {
    Contact.find((err, contacts) => {
        if (err) {
            res.send(err);
        }
        res.render('admin_contact.ejs', {contacts: contacts});
    })
});

module.exports = router;