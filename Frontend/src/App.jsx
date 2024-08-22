import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Main from './components/Main';

const App = () => {
  const [allCountriesData, setAllCountriesData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  const handleCountryChange = (countryName) => {
    setSelectedCountry(countryName);
  };


  return (
    <div>
      <Navbar />
        <Sidebar 
        countries={allCountriesData} 
        onCountrySelect={handleCountryChange}/>

      <section className='container'>
        <div className= 'centered-element'>
          <Main selectedCountry={selectedCountry} data={allCountriesData}/>
        </div>
      </section>
    </div>
  )
}

export default App