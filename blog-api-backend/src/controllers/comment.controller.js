const commentService = require('../services/comment.service');

exports.create = async (req, res) => {
  try {
    const comment = await commentService.createComment(
      req.body,
      req.user.id
    );

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getByPost = async (req, res) => {
  try {
    const comments = await commentService.getCommentsByPost(
      req.params.postId
    );

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await commentService.deleteComment(
      req.params.id,
      req.user.id
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};