const express = require("express");
const router = express.Router();
const Project = require('../models/formModel');
const Contact = require('../models/contactModel');

//GET
router.get('/', (req, res) => {
    Project.find((err, project) => {
            if (err) {
                res.send(err);
            }
            res.render('index', { project: project});
        })

    });

//POST
router.post('/creer-post', (req, res) => {
    const contact = new Contact(req.body);
    contact.save(err => {
        if (err) {
            res.send(err);
        }
        res.redirect('/index');
    })
});




module.exports = router;