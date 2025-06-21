const Post = require('../models/post.model');
const User = require('../models/user.model');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'name profilePicture');
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.createPost = async (req, res) => {
    const { content } = req.body;

    if (!content && !req.file) {
        return res.status(400).json({ msg: 'Post content or image is required' });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            content,
            author: req.user.id,
        });

        if (req.file) {
            newPost.image = `uploads/${req.file.filename}`;
        }

        const post = await newPost.save();

        // Populate author information before sending the response
        const populatedPost = await Post.findById(post._id).populate('author', 'name profilePicture');

        res.json(populatedPost);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        post.likes += 1;

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
}; 