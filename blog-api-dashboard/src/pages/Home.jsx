import { useState, useEffect } from "react"
import axios from "axios";
import { FaUsers, FaFileAlt, FaComments, FaHeart, FaChartLine, FaSpinner } from "react-icons/fa";

function Home() {

    const [stats, setStats] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/stats");
                setStats(response.data);
                setDataLoaded(true);
            } catch (error) {
                console.error(error);
                setError(true);
            }
        };

        fetchStats();
    }, [])

    if (!dataLoaded) {
        return (
            <div className="flex items-center justify-center h-screen flex-col">
                <FaSpinner size={50} className="animate-spin text-blue-500"/>
                <span className="mt-4 text-gray-600">Chargement des statistiques...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen flex-col">
                <FaChartLine size={50} className="text-red-500 mb-4"/>
                <span className="text-gray-600">Erreur lors du chargement des statistiques</span>
            </div>
        )
    }

    return (
        <section className="bg-slate-50 px-5 py-5">
            <div className="flex items-center mb-8">
                <FaChartLine className="text-blue-500 mr-3" size={32}/>
                <h1 className="text-3xl font-bold text-gray-800">Blog Statistics</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center">
                        <FaUsers className="mr-3" size={24}/>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Utilisateurs</h3>
                            <p className="text-3xl font-bold">{stats.users || 0}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center">
                        <FaFileAlt className="mr-3" size={24}/>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Posts</h3>
                            <p className="text-3xl font-bold">{stats.posts || 0}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center">
                        <FaComments className="mr-3" size={24}/>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Commentaires</h3>
                            <p className="text-3xl font-bold">{stats.comments || 0}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center">
                        <FaHeart className="mr-3" size={24}/>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Likes</h3>
                            <p className="text-3xl font-bold">{stats.likes || 0}</p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Home