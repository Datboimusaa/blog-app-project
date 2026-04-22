import {RxDotFilled} from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    return (
        <header className="fixed-top col-span-2">
            <nav className="flex items center px-5 justify-between py-4 border-b border-gray-200 shadow">
                <a href="/" className="text-2xl text-black font-bold">My blog</a>
                <div className="flex items-center gap-4">
                    <button className="relative cursor-pointer">
                        <img src="https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
                            alt="User profile picture" className="rounded-full h-[32px] w-[32px] object-contain" />
                        <RxDotFilled size={30} className="bottom-[-4px] right-[-13px] absolute text-green-500" />
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

export default Header