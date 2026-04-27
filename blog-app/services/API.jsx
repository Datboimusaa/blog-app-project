import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔧 Change this to your computer's local IP when using Expo Go on a physical device
// e.g. http://192.168.1.42:5000
const BASE_URL = "https://blog-app-project-i9a0.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Automatically attach JWT token to every request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Auth ────────────────────────────────────────────────────────
export const registerUser = (data) => api.post("/api/auth/register", data);
export const loginUser    = (data) => api.post("/api/auth/login", data);

// ─── Posts ───────────────────────────────────────────────────────
export const getAllPosts  = ()           => api.get("/api/posts");
export const getPostById = (id)         => api.get(`/api/posts/${id}`);
export const createPost  = (data)       => api.post("/api/posts", data);
export const updatePost  = (id, data)   => api.put(`/api/posts/${id}`, data);
export const deletePost  = (id)         => api.delete(`/api/posts/${id}`);

// ─── Likes ───────────────────────────────────────────────────────
// Returns { likesCount, liked }
export const toggleLike = (postId) => api.post(`/api/likes/${postId}`);

// ─── Comments ────────────────────────────────────────────────────
// GET comments for a post
export const getComments = (postId) => api.get(`/api/comments/post/${postId}`);
// POST a new comment — must include postId in the body
export const addComment  = (postId, content) =>
  api.post("/api/comments", { content, post: postId });
// DELETE a comment by its own id
export const deleteComment = (commentId) => api.delete(`/api/comments/${commentId}`);

export default api;