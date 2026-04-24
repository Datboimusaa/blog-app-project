import { HiDotsVertical } from "react-icons/hi";
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Post({ user, title, content, handleEdit, handleDelete, id, handleLike, post, userId, isLiked }) {

    const [showMenu, setShowMenu] = useState(false);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    const GetPostsByID = async () => {
        const res = await axios.get(`http://localhost:5000/api/comments/post/${id}`);
        return res.data.length;
    }

    useEffect(() => {
        const fetchCount = async () => {
            const count = await GetPostsByID();
            setCount(count);
        };

        fetchCount();
    }, [id]);

    return (
        <div className="p-4 bg-white border border-black cursor-pointer w-[95%] hover:bg-gray-100 shadow-lg rounded-[255px_15px_225px_15px_/_15px_225px_15px_255px]" onClick={() => navigate(`/posts/${id}`)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                        className="w-10 rounded-full"
                    />
                    <span className="font-bold">{user}</span>
                </div>
                <button className="cursor-pointer relative" onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                }}>
                    <HiDotsVertical />

                    <div className={`absolute bg-white rounded border p-2 left-[-35px] bottom-[-68px] ${showMenu ? 'block' : 'hidden'}`}>
                        <div onClick={handleEdit}>
                            Modifier
                        </div>
                        <div onClick={handleDelete}>
                            Supprimer
                        </div>
                    </div>
                </button>
            </div>

            <h4 className="font-bold text-lg py-2">{title}</h4>
            <p className="py-4">{content}</p>


            <div className="flex items-center gap-6" onClick={(e) => e.stopPropagation()}>

                <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 cursor-pointer ${
                        isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                    <span>{post.likes?.length || 0}</span>
                </button>

                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 cursor-pointer">
                    <FaRegComment />
                    <span>
                        {count || 0}
                    </span>
                </button>

            </div>
        </div>
    );
}

export default Post