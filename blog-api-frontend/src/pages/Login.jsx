import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { IoMailOpen } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            )

            localStorage.setItem("token", res.data.token)

            setMessage("Connexion réussie ")
            setIsSuccess(true)

            setTimeout(() => {
                navigate("/Home")
            }, 1500)

        } catch (error) {
            setMessage("Email ou mot de passe incorrect ")
            setIsSuccess(false)

            // disparaît après 3s
            setTimeout(() => {
                setMessage("")
            }, 3000)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">

            <div className="bg-white shadow-2xl rounded-2xl p-8 w-[370px] border border-blue-100">

                <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
                    Connexion
                </h2>

                {/* MESSAGE */}
                {message && (
                    <div
                        className={`p-3 mb-4 text-center rounded-lg font-medium ${isSuccess
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                    >
                        {message}
                    </div>
                )}

                <div className="mb-4 flex items-center gap-3 border border-blue-200 rounded-lg px-3 py-2 focus-within:ring-2 ring-blue-500 transition">
                    <IoMailOpen className="text-blue-500" />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="outline-none text-black w-full placeholder-gray-400"
                    />
                </div>

                <div className="mb-5 flex items-center gap-3 border border-blue-200 rounded-lg px-3 py-2 focus-within:ring-2 ring-blue-500 transition">
                    <TbLockPassword className="text-blue-500" />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="outline-none text-black w-full placeholder-gray-400"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-md"
                >
                    Se connecter
                </button>

                <p className="text-center text-sm mt-5 text-gray-600">
                    Pas de compte ?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-blue-600 font-medium cursor-pointer hover:underline"
                    >
                        S'inscrire
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login