import axios from "axios";
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { IoMdArrowBack } from "react-icons/io";

function Create() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://blog-app-project-i9a0.onrender.com/api/posts", {
                title,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            if(response.status === 201) {
                alert("Post créé avec succès");
            }
            setTitle("");
            setContent("");
        }
        catch (error) {
            console.error(error)
        }
    }
    return (

        <section>
            <div className="py-2">
               <button className=" cursor-pointer px-4 py-2 -justify-self-start rounded-xl font-bold" onClick={() => window.history.back()}> <IoMdArrowBack className="inline" />Retour</button>
            </div>
            <form className="max-w-2xl p-4 px-8" onSubmit={handleSubmit}>
                <h2 className="font-bold text-xl py-4">
                    Creer un post
                </h2>
                <div className="py-2 flex flex-col">
                    <label htmlFor="title">Titre</label>
                    <input type="text" placeholder="Titre"
                        value={title} name="title" id="title"
                        className="border border-gray-200 rounded-xl ps-4 py-2"
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="py-2 flex flex-col">
                    <label htmlFor="content">Texte</label>
                    <textarea name="content"
                        id="content" value={content}
                        cols="30" rows="10"
                        className="border border-gray-200 rounded-xl ps-4 py-2"
                        onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <div className="flex">
                    <button className="bg-black text-white cursor-pointer px-4 py-2 rounded-xl font-bold" type="submit"> Post </button>
                </div>
            </form>
        </section>
    )
}

export default Create