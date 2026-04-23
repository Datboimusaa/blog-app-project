import { FaChartBar } from "react-icons/fa";

function Header() {
    return (
        <header className="fixed-top col-span-2">
            <nav className="flex items-center px-5 py-4 border-b border-gray-200 shadow-md bg-white">
                <FaChartBar className="text-blue-500 mr-3" size={28}/>
                <a href="/" className="text-2xl text-primary font-bold flex items-center">
                    Blog Dashboard
                    <span className="ml-3 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                        Admin
                    </span>
                </a>
            </nav>
        </header>
    )
}

export default Header