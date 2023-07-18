//create web server
const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req,res) => res.json({msg: "Posts Works"}));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req,res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req,res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404));
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req,res) => {

    //get fields from the form
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        //user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    //check for post owner
                    if(post.user.toString() !== req.user.id){
                        return res.status(401).json({notauthorized: "User not authorized"});
                    }

                    //delete
                    post.remove().then(() => res.json({success: true}));
                })
                .catch(err => res.status(404).json({postnotfound: "No post found"}));
        });
});

// @route   POST api/posts/like/:id
// @desc    Like post by id
// @access  Private
router
