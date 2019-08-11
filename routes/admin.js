const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const multer = require('multer');
const Database = require('../models/database');
const Project = require('../models/formModel');
const { ensureAuthenticated } = require('../config/auth');
const db = new Database();

//config multer

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/image')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

let upload = multer({ storage: storage });

router.post('/index', /*ensureAuthenticated*/ upload.single('image'), (req, res) => {
    // Nous utilisons le model addProject
    let project = new Project(req.body);
    
    project.image = req.file.filename;   
    
    
    //Nous stockons l'objet en base
    project.save((err) => {
        if (err) {
            res.send(err);
        }
        res.redirect('/index');
    })
});

router.get('/list', ensureAuthenticated, (req, res) => {
    Project.find((err, projects) => {
       
        res.render('admin_list', {projects:projects});
    })
  

});



//GET
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('admin.ejs');
});

//authentification
const passport = require('passport');

//User model
const Admin = require('../models/Admin');

// login page
router.get('/login', (req, res) => res.render('login'));

// register page
router.get('/register', (req, res) => res.render('register'));
//register post
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    //check les champs requis
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'please fill in all field'});
    }
    
    //check password
    if(password !== password2){
        errors.push({ msg: 'Password do not match' });
    }
    // check pass length
    if(password.length < 6){
        errors.push({ msg: 'Password should be at least 6 characters' });
    }
    if(errors.length > 0){
    res.render('register', {
        errors,
        name,
        email,
        password,
        password2
    });
    }else{
        // Validation de l'enregistrement
        Admin.findOne({ email: email })
        .then(user => {
            if(user){
                //User exist
                errors.push({ msg: 'Email is already register'});
                res.render('register', {
                errors,
                name,
                email,
                password,
                password2
                });
            }else{
                const newUser = new Admin({
                    name,
                    email,
                    password
                });
                
                //Hash password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        //Set password to hashed
                        newUser.password = hash;
                        //Save user
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now register and can log in');
                            res.redirect('/admin/login');
                        })
                        .catch(err => console.log(err));
                }))
            }
        })
    }
}); 

//login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: true
    })(req, res, next);
})

//logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/admin/login');
})

module.exports = router;

