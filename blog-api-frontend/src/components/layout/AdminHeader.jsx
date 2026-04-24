import { FaChartBar } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import {useNavigate} from "react-router-dom";

function AdminHeader() {
    const navigate = useNavigate();

    return (
        <header className="fixed-top col-span-2">
            <nav className="flex items-center justify-between px-5 py-4 border-b border-gray-200 shadow-md bg-white">
                <div className="flex items-center">
                    <FaChartBar className="text-blue-500 mr-3" size={28} />
                    <a href="/" className="text-2xl text-primary font-bold flex items-center">
                        Blog Dashboard
                        <span className="ml-3 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                            Admin
                        </span>
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    <button className="cursor-pointer hover:underline" onClick={() => navigate("/home")}>
                        Aller vers le blog
                    </button>
                    <button className="cursor-pointer" onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/")
                    }}>
                        <MdLogout size={24} />
                    </button>

                </div>


            </nav>
        </header>
    )
}

export default AdminHeader