//Create web server
const express = require('express');
const router = express.Router();
//create database connection
const db = require('../db');
//create random string for comment id
const randomstring = require("randomstring");

//create comment
router.post('/create', (req, res) => {
    //create comment id
    const comment_id = randomstring.generate();
    //create comment
    const comment = {
        comment_id: comment_id,
        post_id: req.body.post_id,
        user_id: req.body.user_id,
        comment: req.body.comment,
        date: req.body.date
    }
    //insert comment into database
    db.query('INSERT INTO comments SET ?', comment, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Comment created...');
    });
});

//get comment by id
router.get('/:id', (req, res) => {
    //get comment by id
    db.query('SELECT * FROM comments WHERE comment_id = ?', [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//get comments by post id
router.get('/post/:id', (req, res) => {
    //get comments by post id
    db.query('SELECT * FROM comments WHERE post_id = ?', [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//get comments by user id
router.get('/user/:id', (req, res) => {
    //get comments by user id
    db.query('SELECT * FROM comments WHERE user_id = ?', [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//update comment
router.put('/update/:id', (req, res) => {
    //update comment
    db.query('UPDATE comments SET comment = ? WHERE comment_id = ?', [req.body.comment, req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Comment updated...');
    });
});

//delete comment
router.delete('/delete/:id', (req, res) => {
    //delete comment
    db.query('DELETE FROM