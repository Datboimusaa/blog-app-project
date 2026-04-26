import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  const createPost = async (formData) => {
    await API.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    getPosts();
  };

  const likePost = async (id) => {
    await API.post(`/likes/${id}`);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostContext.Provider value={{
      posts,
      createPost,
      likePost
    }}>
      {children}
    </PostContext.Provider>
  );
};