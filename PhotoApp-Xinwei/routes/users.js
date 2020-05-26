const express = require('express');
const router  = express.Router();
const db      = require('../conf/database.js');
const bcrypt = require('bcrypt');
const successPrint = require('../helpers/debug/debughelpers').successPrint;
const errorPrint = require('../helpers/debug/debughelpers').errorPrint;
const UserError = require('../helpers/errors/UserError');

router.post('/register', (req, resp, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let baseSQL = 'SELECT * FROM `csc317db`.`users` WHERE username = ?';
    db.execute(baseSQL, [username])                               // give me every row of username, which becomes the results in the next row
        .then(([results, fields]) => {
            if (results && results.length == 0) {                  // the name is unique
                return db.execute('SELECT * FROM `csc317db`.`users` WHERE email = ?', [email])    // if name doesn't exist, check email (results will return next then)
            }else{
                throw new UserError('Username already exists', '/register', 200);
            }
        })
        .then(([results, fields]) => {
            if (results && results.length == 0) {                 // the email is unique
                return bcrypt.hash(password, 10)                  // bcrypt
                // return db.execute('INSERT INTO users (username, email, password, created) VALUES(?, ?, ?, now())', [username, email, password]);
            }else{
                throw new UserError('Email already exists', '/register', 200);
            }
        })
        
        .then((hashedPassword) => {
            let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now());';
            return db.execute(baseSQL, [username, email, hashedPassword]);
        })
        
        .then(([results, fileds]) => {   
            if(results && results.affectedRows){                 // the results generate a newline  
                successPrint('User has been created (¬‿¬)');
                resp.redirect('/login');
            }else{
                // errorPrint('DB ERROR: user was not created');
                throw new UserError('Sever Error, user could not be created', '/register', 500);
            }                         
        })
        .catch((err) => {
            if(err instanceof UserError){
                errorPrint(err.getMessage());
                resp.status(err.getStatus());
                resp.redirect(err.getRedirectURL());
            }
            next(err);

        });
    });


    router.post("/login", (req, resp, next) => {
        let username = req.body.username;
        let password = req.body.password;
        let userID;    //get for keep session

        db.execute("SELECT * FROM `csc317db`.`users` WHERE username=?", [username])
            .then(([results, fields]) => {
                if (results && results.length == 1) {                          // the name is unique
                    let hPassword = results[0].password;                       // compare the password in bcrypt, return true or false
                    userID = results[0].id;
                    return bcrypt.compare(password, hPassword);
                }else{
                    throw new UserError('Username or password is incorrect', '/login', 200);
                }
            })
            .then((dosePasswordMatches) => {
                if(dosePasswordMatches){
                    successPrint('successful Login!');
                    req.session.username = username;
                    req.session.userID = userID;
                    // console.log(req.session);
                    resp.redirect('/');
                }else{
                    throw new UserError('Username or password is incorrect', '/login', 200);
                }                      
            })

            .catch((err) => {
                if(err instanceof UserError) {
                    errorPrint(err.getMessage());
                    resp.status(err.getStatus());
                    resp.redirect(err.getRedirectURL());
                }else{
                    next(err); // javascript haddles asynchronouse error by NEXT
                }
            });
    });

router.post('/logout', (req, resp, next) => {
    req.session.destroy((err) => {
        if(err){
            errorPrint('Faild to destroy session');
            next(err);
        }else{
            successPrint('session was destroyed');
            resp.clearCookie('csid');
            resp.redirect('/login');
        }
    })
});



router.post('/postimage', (req, resp, next) => {
    
    console.log(req);
    resp.send('data send');
    // let title = req.body.title;
    // let description = req.body.description;
    // console.log(title);
    // console.log(description);

});

module.exports = router;