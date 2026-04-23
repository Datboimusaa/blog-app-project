import { NavLink } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";


function MobileMenu() {
    return (
        <aside className="border-t-[2px] border-gray-200 flex md:hidden fixed bottom-0 left-0 w-full bg-white">
            <div className="flex items-center justify-around w-full py-2">
                <NavLink to="/home" className="px-4 py-2 flex gap-2 items-center rounded-xl  font-bold">
                    <FaHome size={24} />
                    <span className="text-lg hidden lg:inline">Home</span>
                </NavLink>
                <NavLink to="/create" className="px-4 py-2 flex gap-2 items-center rounded-xl  font-bold">
                    <FaPlus size={24} />
                    <span className="text-lg hidden lg:inline">Créer Post</span>
                </NavLink>
            </div>
        </aside>
    )
}

export default MobileMenu