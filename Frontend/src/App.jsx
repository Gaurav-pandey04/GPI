import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Main from './components/Main';

const App = () => {
  // const [allCountriesData, setAllCountriesData] = useState([]);
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
          <Main selectedCountry={selectedCountry}/>
        </div>
      </section>
    </div>
  )
}

export default App