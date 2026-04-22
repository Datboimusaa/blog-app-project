import { useParams } from "react-router-dom";

function Details() {

    const {id} = useParams();
    
    const country = countries.find(country => country.id === parseInt(id))
    
    if (!user) {
        return(
         <h5 className="text-center font-bold">
            User not found
        </h5>
        )
    }

    return(
        <div className="px-4">
            <h1 className="text-xl font-bold">nom: {user.name} </h1>
            <h2>email: {user.email}</h2>
            <p>
                role: {user.role}
            </p>
        </div>
    )
}

export default Details