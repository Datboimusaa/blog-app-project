import { useState, useEffect } from "react"
import axios from "axios";
import { FaUsers, FaUser, FaEnvelope, FaCalendarAlt, FaSpinner, FaExclamationTriangle, FaEdit, FaTrash } from "react-icons/fa";

function Users() {

    const [users, setUsers] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users");
                setUsers(response.data);
                setDataLoaded(true);
            } catch (error) {
                console.error(error);
                setError(true);
            }
        };

        fetchUsers();
    }, [])

    const handleEdit = async (user) => {
        const newRole = user.role === 'admin' ? 'user' : 'admin';
        try {
            await axios.put(`http://localhost:5000/api/users/${user._id}`, { role: newRole });
            setUsers(users.map(u => u._id === user._id ? { ...u, role: newRole } : u));
        } catch (error) {
            alert('Erreur lors de la modification du rôle');
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            try {
                await axios.delete(`http://localhost:5000/api/users/${userId}`);
                setUsers(users.filter(user => user._id !== userId));
            } catch (error) {
                alert('Erreur lors de la suppression de l\'utilisateur');
            }
        }
    };

    if (!dataLoaded) {
        return (
            <div className="flex items-center justify-center h-screen flex-col">
                <FaSpinner size={50} className="animate-spin text-blue-500" />
                <span className="mt-4 text-gray-600">Chargement des utilisateurs...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen flex-col">
                <FaExclamationTriangle size={50} className="text-red-500 mb-4" />
                <span className="text-gray-600">Erreur lors du chargement des utilisateurs</span>
            </div>
        )
    }
   


    return (
        <section className="bg-slate-50 px-5 py-5">
            <div className="flex items-center mb-8">
                <FaUsers className="text-blue-500 mr-3" size={32} />
                <h1 className="text-3xl font-bold text-gray-800">Liste des Utilisateurs</h1>
                <span className="ml-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {users.length} utilisateurs
                </span>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        <FaUser className="mr-2" size={14} />
                                        Nom
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        <FaEnvelope className="mr-2" size={14} />
                                        Email
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Rôle
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="mr-2" size={14}/>
                                        Date d'inscription
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-blue-50 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                                                <FaUser className="text-blue-600" size={16} />
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <FaEnvelope className="text-gray-400 mr-2" size={14} />
                                            <div className="text-sm text-gray-600">
                                                {user.email}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            user.role === 'admin' 
                                                ? 'bg-purple-100 text-purple-800' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {user.role || 'user'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <FaCalendarAlt className="text-gray-400 mr-2" size={14} />
                                            <div className="text-sm text-gray-600">
                                                {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="text-blue-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                                                title="Changer le rôle"
                                            >
                                                <FaEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                                                title="Supprimer l'utilisateur"
                                            >
                                                <FaTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </section>
    )
}

export default Users
