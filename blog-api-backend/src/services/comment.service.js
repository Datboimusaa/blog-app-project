const Comment = require('../models/Comment');

exports.createComment = async (data, userId) => {
  return await Comment.create({
    ...data,
    author: userId
  });
};

exports.getCommentsByPost = async (postId) => {
  return await Comment.find({ post: postId })
    .populate('author', 'name')
    .sort({ createdAt: -1 });
};

exports.deleteComment = async (id, userId) => {
  const comment = await Comment.findById(id);

  if (!comment) {
    throw new Error('Comment not found');
  }

  if (comment.author.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  await comment.deleteOne();

  return { message: 'Comment deleted' };
};