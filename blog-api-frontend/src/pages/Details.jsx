import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegHeart, FaRegComment } from "react-icons/fa";

function Details() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [postRes, commentsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`http://localhost:5000/api/comments/post/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setPost(postRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handlePostComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/comments",
        { post: id, content: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments((prev) => [res.data, ...prev]);
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <section className="bg-slate-100 min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* POST CARD */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              className="w-10 h-10 rounded-full"
              alt="user"
            />
            <span className="font-semibold">
              {post.author.name || "User"}
            </span>
          </div>

          <h2 className="text-xl font-bold mb-2">{post?.title}</h2>
          <p className="text-gray-600 mb-4">{post?.content}</p>

          <div className="flex gap-6 text-gray-500">
            <button className="flex items-center gap-2 hover:text-red-500">
              <FaRegHeart /> Like
            </button>
            <button className="flex items-center gap-2 hover:text-blue-500">
              <FaRegComment /> {comments.length}
            </button>
          </div>
        </div>

        {/* COMMENTS */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold mb-4">
            Comments ({comments.length})
          </h3>

          {/* INPUT */}
          <div className="flex gap-3 mb-5">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              className="w-9 h-9 rounded-full"
              alt="user"
            />
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                rows="2"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handlePostComment}
                  className="bg-black text-white px-4 py-1.5 rounded-lg text-sm"
                >
                  Post
                </button>
              </div>
            </div>
          </div>

          {/* LIST */}
          <div className="space-y-4">
            {comments.length === 0 && (
              <p className="text-gray-400 text-sm">No comments yet.</p>
            )}

            {comments.map((c) => (
              <div key={c._id} className="flex gap-3">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                  className="w-8 h-8 rounded-full"
                  alt="user"
                />
                <div className="bg-slate-100 rounded-xl px-3 py-2 w-full">
                  <p className="text-sm font-semibold">
                    {c.author?.name || "User"}
                  </p>
                  <p className="text-sm text-gray-700">{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;
