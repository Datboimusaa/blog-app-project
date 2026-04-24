import { FaChartBar } from "react-icons/fa";

function AdminHeader() {
    return (
        <header className="col-span-full">
            <nav className="flex items-center justify-between px-5 py-4 border-b border-gray-200 shadow-md bg-white">
                <div className="flex items-center gap-3">
                    <FaChartBar className="text-blue-500" size={28}/>
                    <a href="/" className="text-2xl text-primary font-bold flex items-center">
                        Blog Dashboard
                        <span className="ml-3 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                            Admin
                        </span>
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default AdminHeader