const likeService = require('../services/like.service');

exports.toggle = async (req, res) => {
  try {
    const result = await likeService.toggleLike(
      req.params.postId,
      req.user.id
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};