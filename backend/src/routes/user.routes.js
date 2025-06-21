const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const { getUserProfile, updateUserProfile } = require('../controllers/user.controller');

// @route   GET api/users/:id
// @desc    Get user profile
// @access  Public
router.get('/:id', getUserProfile);

// @route   PUT api/users/:id
// @desc    Update user profile
// @access  Private
router.put('/:id', auth, upload.single('profilePicture'), updateUserProfile);

module.exports = router; 