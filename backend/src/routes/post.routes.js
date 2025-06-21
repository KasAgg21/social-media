const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const { getAllPosts, createPost, likePost } = require('../controllers/post.controller');

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getAllPosts);

// @route   POST api/posts
// @desc    Create a new post
// @access  Private
router.post('/', auth, upload.single('postImage'), createPost);

// @route   POST api/posts/like/:id
// @desc    Like a post
// @access  Private
router.post('/like/:id', auth, likePost);

module.exports = router; 