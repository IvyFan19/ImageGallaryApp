const express = require('express');
const router  = express.Router();
const db      = require('../conf/database.js');

const successPrint = require('../helpers/debug/debughelpers').successPrint;
const errorPrint = require('../helpers/debug/debughelpers').errorPrint;
const UserError = require('../helpers/errors/UserError'); 

const multer  = require('multer');
const sharp   = require('sharp');
const crypto  = require('crypto');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/images/uploads");
    },
    filename: function(req, file, cb){
        let fileExt = file.mimetype.split("/")[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }

})

var uploader = multer({storage: storage})

router.post('/createPost', uploader.single('uploadImage'), (req, resp, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbail = `thumbnail-${req.file.filename}`;
    let destOfThumbnail = req.file.destination+"/"+fileAsThumbail;
    let title = req.body.title;
    let desc = req.body.description;
    let fk_userid = req.session.userID;

    sharp(fileUploaded)
        .resize(200)
        .toFile(destOfThumbnail)
        .then(() => {
            let baseSQ = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?, ?, ?, ?, now(), ?);'
            return db.execute(baseSQ, [title, desc, fileUploaded, destOfThumbnail, fk_userid]);
        })
        .then(([results, fields]) => {
            if(results && results.affectedRows) {
                successPrint('new post created');
                resp.json({status:"OK", message: "Your post was created.", redirect: "/"});
            }else{
                resp.json({status:"OK", message:"Your post was not created.", redirect: "/postimage"});
                // next(Error('post was not create'));
            }
        })
        .catch((err) => {next(err)});
    });
//post/search/searchTern
router.get("/search/:searchTerm",(req,resp,next) => {
    let searchTerm = req.params.searchTerm;
    let _sql = 
        'SELECT p.id, p.title, p.description,p.photopath, u.username \
        FROM posts p \
        JOIN users u on p.fk_userid=u.id \
        WHERE title LIKE ?;';
    searchTerm = "%" + searchTerm + "%";
    db.query(_sql, [searchTerm])
    .then(([results, fields]) => {
        resp.json(results);
    })
    .catch((err) => next(err));
});


router.get("/getRecentPosts",(req,resp,next) => {
    let _sql = 
        'SELECT p.id, p.title, p.description, p.photopath, u.username, p.created \
        FROM posts p \
        JOIN users u on p.fk_userid=u.id\
        ORDER BY p.created DESC';

    db.query(_sql,)
    .then(([results, fields]) => {
        resp.json(results);
    })
    .catch((err) => next(err));
});


router.get("/imagePost/:id", (req, resp, next) => {
    resp.sendFile("viewpost.html", {root:"public/"});
})

router.get("/getPostById/:id", (req, resp, next) => {
    let _id = req.params.id;
    let _sql = 
    "SELECT p.id, p.title, p.description, p.photopath, u.username, p.created \
        FROM posts p \
        JOIN users u on p.fk_userid=u.id \
        WHERE p.id=?";

    db.query(_sql, _id)
    .then(([results, fields]) => {
        resp.json(results[0]);
    })
    .catch((err) => next(err));
  
})

module.exports = router;