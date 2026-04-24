import { FaHome, FaUsers, FaCog } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

function AdminSidebar() {
    return (
        <aside className="bg-secondary flex flex-col hidden md:flex">
            <div className="py-4 px-4 border-b border-gray-700">
                <h2 className="text-xl text-white font-bold flex items-center">
                    Menu
                </h2>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `w-full px-4 py-3 flex gap-3 items-center rounded-lg hover:bg-secondary-lighter font-medium transition-all duration-200 ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300'
                        }`
                    }
                >
                    <FaHome size={18} />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink
                    to="/users"
                    className={({ isActive }) =>
                        `w-full px-4 py-3 flex gap-3 items-center rounded-lg hover:bg-secondary-lighter font-medium transition-all duration-200 ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300'
                        }`
                    }
                >
                    <FaUsers size={18} />
                    <span>Utilisateurs</span>
                </NavLink>
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `w-full px-4 py-3 flex gap-3 items-center rounded-lg hover:bg-secondary-lighter font-medium transition-all duration-200 ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300'
                        }`
                    }
                >
                    <FaCog size={18} />
                    <span>Paramètres</span>
                </NavLink>
            </div>
        </aside>
    )
}

export default AdminSidebar