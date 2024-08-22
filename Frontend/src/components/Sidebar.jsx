import React, { useState, useEffect } from 'react';

const Sidebar = ({ onCountrySelect }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/countries');
                if (!response.ok) {
                    throw new Error('Failed to fetch countries');
                }
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error(error);
                // Handle errors (e.g., display an error message)
            }
        };
        fetchCountries();
    }, []); // Empty dependency array ensures this runs once on mount

    return (
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {countries.map((country) => (
                                country['country name'] ? ( // Ternary operator for undefined check
                                <li key={country._id} >
                                   <button onClick={() => onCountrySelect(country["country name"])} href={country["country name"]} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <span className="ms-3">{country["country name"]}</span>
                                </button>
                                </li>
                            ) : null // Render nothing if undefined
                        ))}
                    </ul>
                </div>
            </aside>
    )

}

export default Sidebar