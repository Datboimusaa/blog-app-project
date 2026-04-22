import { FaHome } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <aside className="border-r-[2px] border-gray-200 flex flex-col">
            <div className="flex flex-col items-center py-4 gap-4">
                <NavLink to="/home" className="w-[90%]  px-4 py-2 flex gap-2 items-center rounded-xl  font-bold">
                    <FaHome size={24} />
                    <span className="text-lg hidden lg:inline">Home</span>
                </NavLink>
                <NavLink to="/create" className="w-[90%]  px-4 py-2 flex gap-2 items-center rounded-xl  font-bold">
                    <FaPlus size={24} />
                    <span className="text-lg hidden lg:inline">Créer Post</span>
                </NavLink>
            </div>
        </aside>
    )
}

export default Sidebar