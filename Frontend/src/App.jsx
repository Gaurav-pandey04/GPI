import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Charts from './components/Charts';
import World from './components/World';
import Compare from './components/Compare';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null); 
  const [comparisonCountries, setComparisonCountries] = useState([]);
  const [isCopmarison, setIsCopmarison] = useState(false)

  const handleCountryChange = (countryName) => {
    setSelectedCountry(countryName);
    setIsCopmarison(false);
  };

  const handleComparisonSubmit = (country1, country2) => {
    setComparisonCountries([country1, country2]);
    // console.log(comparisonCountries[0][0]);
    setIsCopmarison(true); 
  };

  return (
    <div>
      <Navbar onComparisonSubmit={handleComparisonSubmit}/>
        <Sidebar onCountrySelect={handleCountryChange}/>

      <section className='container'>
        <div className= 'centered-element'>
        {isCopmarison ? ( 
            <Compare countries={comparisonCountries} /> 
          ) : selectedCountry ? ( 
            <Charts selectedCountry={selectedCountry} />
          ) : (
            <World />
          )}
        </div>
      </section>
    </div>
  )
}

export default App