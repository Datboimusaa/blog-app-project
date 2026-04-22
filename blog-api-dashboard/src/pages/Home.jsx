import { useState, useEffect } from "react"
import Card from "../components/ui/Card";
import { FcGlobe } from "react-icons/fc";

function Home() {

    const API_URL = 'https://restcountries.com/v3.1/all?fields=name,capital,languages,flags,region,population';
    const [countries, setCountries] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                setCountries(data);
                setDataLoaded(true)
            })
            .catch(error => {
                console.error(error)
                setError(true)
            })
    }, [])


    if (!dataLoaded) {
        return (
            <div className="flex items-center justify-center h-screen flex-col">
                <FcGlobe size={50} className="animate-spin"/>
                <span>Chargement des pays...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                Erreur lors du chargement des données
            </div>
        )
    }

    return (
        <section className="bg-slate-50 px-5 py-5">
            <div className="grid grid-cols-4 gap-4">
                {countries.map(country => {
                    return (
                    <Card image={country.flags.png} name={country.name.common} capital={country.capital} population={country.population.toLocaleString()} region={country.region}/>
                )
                })}
            </div>

        </section>
    )
}

export default Home