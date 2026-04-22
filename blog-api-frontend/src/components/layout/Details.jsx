import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegHeart, FaRegComment } from "react-icons/fa";

function Details() {

    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState({});
    const [showMenu, setShowMenu] = useState(false);
    const getPost=async ()=> {
        try {
            const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
            const { title, content, author } = response.data;
            setTitle(title);
            setContent(content);
            setAuthor(author);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPost();
    }, []);



    return (
        <div className="p-4 cursor-pointer w-[95%] hover:bg-gray-100 rounded-xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="User Profile picture" className="w-10 rounded-full" />
                    <span className="font-bold">{author.name}</span>
                </div>
                <button className="cursor-pointer relative" onClick={() => setShowMenu(!showMenu)}>
                    <HiDotsVertical />
                    <div className={`absolute bg-white rounded border border-gray-200 p-2 left-[-35px] bottom-[-68px] ${showMenu ? 'block' : 'hidden'}`}>
                        <div className="flex items-center gap-2 text-gray-500 hover:text-blue-500 cursor-pointer" onClick={handleEdit}>
                            <FiEdit2 />
                            <span>Modifier</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 hover:text-red-500 cursor-pointer" onClick={handleDelete}>
                            <MdOutlineDelete />
                            <span>Supprimmer</span>
                        </div>
                    </div>
                </button>
            </div>

            <h4 className="font-bold text-lg py-2">{title}</h4>
            <p className="py-4">{content}</p>
            <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 cursor-pointer">
                    <FaRegHeart />
                    <span>Like</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 cursor-pointer">
                    <FaRegComment />
                    <span>Comment</span>
                </button>
            </div>
        </div>
    )
}

export default Details