import { createContext, useState, useEffect } from "react";

export const CountryContext = createContext();

export function CountryProvider({ children }) {
    const API_URL = 'https://restcountries.com/v3.1/all?fields=name,capital,languages,flags,region,population,cca3';
    const [countries, setCountries] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setCountries(data);
                setDataLoaded(true);
            })
            .catch(() => {
                setError(true);
                setDataLoaded(true);
            });
    }, []);

    return (
        <CountryContext.Provider value={{ countries, dataLoaded, error }}>
            {children}
        </CountryContext.Provider>
    );
}
