const Post = require('../models/Post');

exports.createPost = async (data, userId) => {
  const post = await Post.create({
    ...data,
    author: userId
  });

  return post;
};

exports.getAllPosts = async () => {
  return await Post.find()
    .populate('author', 'name email')
    .sort({ createdAt: -1 });
};

exports.getPostById = async (id) => {
  const post = await Post.findById(id)
    .populate('author', 'name email');

  if (!post) {
    throw new Error('Post not found');
  }

  return post;
};

exports.updatePost = async (id, data, userId) => {
  const post = await Post.findById(id);

  if (!post) {
    throw new Error('Post not found');
  }

  // Vérifier propriétaire
  if (post.author.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  return await Post.findByIdAndUpdate(id, data, { new: true });
};

exports.deletePost = async (id, userId) => {
  const post = await Post.findById(id);

  if (!post) {
    throw new Error('Post not found');
  }

  if (post.author.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  await post.deleteOne();

  return { message: 'Post deleted' };
};