const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.getStats = async () => {
  try {
    console.log('Fetching stats...');
    
    const userCount = await User.countDocuments();
    console.log('User count:', userCount);
    
    const postCount = await Post.countDocuments();
    console.log('Post count:', postCount);
    
    const commentCount = await Comment.countDocuments();
    console.log('Comment count:', commentCount);
    
    // Compter tous les likes dans tous les posts
    const posts = await Post.find();
    const totalLikes = posts.reduce((sum, post) => sum + post.likes.length, 0);
    console.log('Total likes:', totalLikes);

    return {
      users: userCount,
      posts: postCount,
      comments: commentCount,
      likes: totalLikes
    };
  } catch (error) {
    console.error('Error in stats service:', error);
    throw new Error('Error fetching stats');
  }
};
