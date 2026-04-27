import { createContext, useContext, useState, useCallback } from "react";
import { getAllPosts, createPost, updatePost, deletePost, toggleLike } from "../services/api";

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllPosts();
      setPosts(res.data.posts ?? res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  const addPost = async (title, content) => {
    const res = await createPost({ title, content });
    const newPost = res.data.post ?? res.data;
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  const editPost = async (id, title, content) => {
    const res = await updatePost(id, { title, content });
    const updated = res.data.post ?? res.data;
    setPosts((prev) => prev.map((p) => (p._id === id ? updated : p)));
    return updated;
  };

  const removePost = async (id) => {
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  // Like response is { likesCount, liked } — update the post in the list manually
  const likePost = async (id, userId) => {
    const res = await toggleLike(id);
    const { likesCount, liked } = res.data;
    setPosts((prev) =>
      prev.map((p) => {
        if (p._id !== id) return p;
        // Rebuild the likes array based on server response
        const newLikes = liked
          ? [...(p.likes ?? []), userId].filter(
              (v, i, arr) => arr.indexOf(v) === i
            )
          : (p.likes ?? []).filter((l) => l !== userId && l !== userId?.toString());
        return { ...p, likes: newLikes };
      })
    );
    return { likesCount, liked };
  };

  return (
    <PostContext.Provider
      value={{ posts, loading, error, fetchPosts, addPost, editPost, removePost, likePost }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);