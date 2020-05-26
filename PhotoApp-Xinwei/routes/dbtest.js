const express = require('express');
const router  = express.Router();
const db      = require('../conf/database.js');
const successPrint = require('../helpers/debug/debughelpers').successPrint;
const errorPrint = require('../helpers/debug/debughelpers').errorPrint;
const UserError = require('../helpers/errors/UserError');

// # test router: curl -X GET localhost:3000/dbtest/getAllUsers
// router.get('/getAllUsers', (req, res, next) =>{
//     res.send('get all posts, ivy')
// });

// router.get('/getAllUsers', (req, res, next) => {
//     db.query('SELECT * from users;', (err, results, fields) =>
//     {
//         if(err){
//             next(err);
//         }
//         console.log(results);
//         res.send(results);
//     })
// });   

// # curl -X GET localhost:3000/dbtest/getAllPosts
// router.get('/getAllPosts', (req, res, next) => {
//     db.query('SELECT * from posts;', (err, results, fileds)=>
//     {
//         if(err){
//             next(err);
//         }
//         console.log(results);
//         res.send(results);
//     })    
// });

// router.get('/getAllPostsP', (req, res, next) => {
//     console.log("Here is req: ", fields);
//     db.query('SELECT * from posts;')
//     .then(([results, fields]) => {
//         console.log(results);
//         res.send(results);
//     //     return db.query('SELECT * FROM posts WHERE id=2');
//     // })
//     // .then(([results, fields]) =>{
//     //     console.log(results);
//     //     res.send(results);
//     })

//     //catch error
//     .catch((err) => {next(err);
//     })
//     .then((null, (err => {}))); 
// });

// <form action="dbtest/createUser" method="POST"
// encType="x-www-form-urlencoded">
//     <input id="password" name="password" />
//     <input id="username" name="username" />
//     <input id="email" name="email" />
//     <input id="button" type="submit" />
// </form>

// router.post('/createUser', (req, res, next) => {
//     // "username" is the name in the html
//     let username = req.body.username;
//     let email = req.body.email;
//     let password = req.body.password;
//     console.log(username, email, password)


        /**
     * validate from data
     * check username
     * check email
     * check password: at least 8 charactors
     * 
     * */


//     let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES(?, ?, ?, now())';
//     db.query(baseSQL, [username, email, password])
//     .then(([results, fields]) => {
//         if(results && results.affectedRows){
//             // res.send('user was made');
//             res.redirect('/login');
//         }
//         else{
//             res.send('user was not made for some reasons');
//         }
//     })
//     .catch((err) => {
//         next(err);
//     })    
// });


// My Code: register --> db 
// router.post('/authUser', function (req, res) {
//     let username = req.body.username;
//     let email = req.body.email;
//     let password = req.body.password;

//     let baseSQL = 'SELECT * FROM `csc317db`.`users` WHERE username = ?';
//     db.query(baseSQL, [username])                               // give me every row of username, which becomes the results in the next row
//         .then(([results, fields]) => {
//             if (results.length > 0) {
//                 let obj = results[0];                
//                 let db_email = Object.values(obj)[2];      
//                 let db_password = Object.values(obj)[3];
//                 if(db_email !== email){
//                     console.log('emails are not same');
//                     res.send('Sorry, dont match!');
//                 }
//                 if(db_password !== password){
//                     console.log('passwords are not same');
//                     res.send('Sorry, dont match!');
//                 }else{
//                     res.redirect('/');           // verify successfully
//                 } 
//             }else{
//                 res.send('user not find');
//             };
//         })
//     .catch((err) => {
//         next(err);
//     })    
// });

/** 
* Logic system:
* step1: make sure the username dosen't exist
* step2: make sure email doesn't exist
*        -> if OK. redirect to login
*        -> if failed, redirect to register
* // catch any errors
*        -> if UserError
*        - > set status and message and redirect 
*/



  
// module.exports = router;
