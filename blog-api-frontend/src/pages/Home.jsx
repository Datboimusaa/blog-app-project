import axios from "axios";
import Post from "../components/ui/Post.jsx";
import { useState, useEffect } from "react";

function Home() {

    const [posts, setPosts] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
  

    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split(".")[1])).id;


    const handleEditPost = (post) => {
        setEditId(post._id);
        setEditTitle(post.title);
        setEditContent(post.content);


    };

    const getPosts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/posts", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    const handleUpdatePost = async () => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/posts/${editId}`,
                {
                    title: editTitle,
                    content: editContent
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setPosts(posts.map(p =>
                p._id === editId ? res.data : p
            ));

            setEditId(null);

        } catch (error) {
            console.error(error);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setPosts(posts.filter(p => p._id !== id));

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="h-screen px-5">


            {editId && (
                <div className="mb-4 p-4 border rounded bg-gray-50">

                    <input
                        className="border p-2 w-full mb-2"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />

                    <textarea
                        className="border p-2 w-full mb-2"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />

                    <button
                        onClick={handleUpdatePost}
                        className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                    >
                        Modifier
                    </button>

                    <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Annuler
                    </button>

                </div>
            )}

            <div className="flex flex-col py-2">
                {posts.map((post) => (
                    <Post
                        key={post._id}
                        user={post.author.name}
                        title={post.title}
                        content={post.content}

                        handleEdit={
                            post.author._id === userId
                                ? () => handleEditPost(post)
                                : null
                        }
                        handleDelete={() => handleDeletePost(post._id)}
                    />
                ))}
            </div>

        </section>
    );
}

export default Home;