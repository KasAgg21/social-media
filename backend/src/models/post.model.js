const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: { type: String, required: false },
  image: { type: String, required: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post; 