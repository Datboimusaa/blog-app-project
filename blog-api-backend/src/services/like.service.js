const Post = require('../models/Post');

exports.toggleLike = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new Error('Post not found');
  }

  const alreadyLiked = post.likes.includes(userId);

  if (alreadyLiked) {
    // Unlike
    post.likes = post.likes.filter(
      (id) => id.toString() !== userId
    );
  } else {
    // Like
    post.likes.push(userId);
  }

  await post.save();

  return {
    likesCount: post.likes.length,
    liked: !alreadyLiked
  };
};