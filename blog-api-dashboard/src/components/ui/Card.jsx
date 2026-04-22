import { Link } from 'react-router-dom';

function Card({ image, name, capital, population, region, id }) {
    return (
        <Link to={`/details/${id}`} className="bg-white border border-gray-200 hover:border-primary hover:shadow-md rounded-xl overflow-hidden">
            <div className="h-[60%]">
                <img src={image} alt={`${name}`} className="h-full w-full" />
            </div>
            <div className="px-4 h-[40%]">
                <h2 className="text-xl text-primary font-bold py-4 truncate">
                    {name}
                </h2>
                <p className="text-xs">
                    <span className="font-bold">Capital : </span>
                    <span>{capital}</span>
                </p>
                <p className="text-xs">
                    <span className="font-bold">Population : </span>
                    <span>{population}</span>
                </p>
                <p className="text-xs">
                    <span className="font-bold">Continent : </span>
                    <span>{region}</span>
                </p>

            </div>
        </Link>
    )
}

export default Card