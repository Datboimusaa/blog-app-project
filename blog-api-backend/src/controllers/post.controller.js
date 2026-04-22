const postService = require('../services/post.service');

exports.create = async (req, res) => {
  try {
    const post = await postService.createPost(req.body, req.user.id);

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);

    res.json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const post = await postService.updatePost(
      req.params.id,
      req.body,
      req.user.id
    );

    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await postService.deletePost(
      req.params.id,
      req.user.id
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};