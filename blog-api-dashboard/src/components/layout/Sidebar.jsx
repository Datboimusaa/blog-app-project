import { FaHome } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <aside className="bg-secondary flex flex-col">
            <h2 className="py-4 text-xl self-start text-white ps-4 font-bold mb-4">Menu</h2>
            <div className="flex flex-col items-center gap-4 text-white">
                <NavLink to="/" className="w-[90%]  px-4 py-2 flex gap-2 items-center rounded-xl hover:bg-secondary-lighter font-bold">
                    <FaHome size={20} />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/explorer" className="w-[90%]  px-4 py-2 flex gap-2 items-center rounded-xl hover:bg-secondary-lighter font-bold">
                    <IoMdGlobe size={20} />
                    <span>Explorer</span>
                </NavLink>
                <NavLink to="/settings" className="w-[90%]  px-4 py-2 flex gap-2 items-center rounded-xl hover:bg-secondary-lighter font-bold">
                    <FaGear size={20}/>
                    <span>Parametres</span>
                </NavLink>
            </div>
        </aside>
    )
}

export default Sidebar