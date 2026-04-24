import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaCog } from "react-icons/fa";

function AdminMobileSidebar() {
  return (
    <aside className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="flex justify-around items-center py-2">
        <NavLink
          to="/"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600"
        >
          <FaHome size={20} />
          <span className="text-xs">Dashboard</span>
        </NavLink>
        <NavLink
          to="/users"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600"
        >
          <FaUsers size={20} />
          <span className="text-xs">Users</span>
        </NavLink>
        <NavLink
          to="/settings"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600"
        >
          <FaCog size={20} />
          <span className="text-xs">Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default AdminMobileSidebar;
