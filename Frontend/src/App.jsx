import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Charts from './components/Charts';
import World from './components/World';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null); 

  const handleCountryChange = (countryName) => {
    setSelectedCountry(countryName);
    console.log(countryName);
    
  };

  return (
    <div>
      <Navbar />
        <Sidebar 
        onCountrySelect={handleCountryChange}/>

      <section className='container'>
        <div className= 'centered-element'>
          {/* Conditionally render components */}
      {selectedCountry ? ( // If a country is selected, show Main
        <Charts selectedCountry={selectedCountry} /> 
      ) : ( 
        <World /> // Otherwise, show World by default
      )}
        </div>
      </section>
    </div>
  )
}

export default App