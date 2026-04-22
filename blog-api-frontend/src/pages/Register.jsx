import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
import { TbLockPassword } from "react-icons/tb";
import { IoMailOpen } from "react-icons/io5";
import { CiUser } from "react-icons/ci";

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isChecked, setIsChecked] = useState(false)
    const [errorName, setErrorName] = useState("")

    const [message, setMessage] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    const navigate = useNavigate()

    const handleRegister = async () => {

        const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/

        if (!nameRegex.test(name)) {
            setErrorName("Nom invalide (lettres uniquement)")
            return
        } else {
            setErrorName("")
        }

        if (!isChecked) {
            setMessage("Tu dois accepter les conditions ")
            setIsSuccess(false)
            return
        }

        try {
            await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    assword
                }
            )

            setMessage("Inscription réussie ")
            setIsSuccess(true)

            setTimeout(() => {
                navigate("/")
            }, 1500)

        } catch (error) {
            setMessage("Erreur lors de l'inscription ")
            setIsSuccess(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">

            <div className="bg-white shadow-2xl rounded-2xl p-8 w-[370px] border border-blue-100">

                <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
                    Inscription
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

                <div className="mb-2 flex items-center gap-3 border border-blue-200 rounded-lg px-3 py-2 focus-within:ring-2 ring-blue-500 transition">
                    <CiUser className="text-blue-500" />
                    <input
                        type="text"
                        placeholder="Nom complet"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="outline-none text-black w-full placeholder-gray-400"
                    />
                </div>

                {errorName && <p className="text-red-500 text-xs mb-3">{errorName}</p>}

                <div className="mb-4 flex items-center gap-3 border border-blue-200 rounded-lg px-3 py-2 focus-within:ring-2 ring-blue-500 transition">
                    <IoMailOpen className="text-blue-500" />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="outline-none w-full text-black placeholder-gray-400"
                    />
                </div>

                <div className="mb-4 flex items-center gap-3 border border-blue-200 rounded-lg px-3 py-2 focus-within:ring-2 ring-blue-500 transition">
                    <TbLockPassword className="text-blue-500" />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="outline-none text-black w-full placeholder-gray-400"
                    />
                </div>

                <div className="flex items-center gap-2 mb-5 text-sm">
                    <input
                        type="checkbox"
                        className="accent-blue-600"
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <label className="text-black">Accepter les conditions</label>
                </div>

                <button
                    onClick={handleRegister}
                    disabled={!isChecked}
                    className={`w-full py-2 rounded-lg text-white font-semibold transition ${isChecked
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400"
                        }`}
                >
                    S'inscrire
                </button>

                <p className="text-center text-sm mt-5 text-gray-600">
                    Déjà un compte ?{" "}
                    <span
                        onClick={() => navigate("/")}
                        className="text-blue-600 font-medium cursor-pointer hover:underline"
                    >
                        Se connecter
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Register;