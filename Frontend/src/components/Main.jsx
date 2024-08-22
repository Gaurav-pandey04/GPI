import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const Main = ({ selectedCountry, data }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const data = filterChartData(selectedCountry);
        setChartData(data);
      }, [selectedCountry, data]); 

      const filterChartData = (countryName) => {
        const selectedCountryData = allCountriesData.find(
          (country) => country['country name'] === countryName
        );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/countries');
        const countries = await response.json();
        setAllCountriesData(countries);

        // Set the first country as default if available
        if (countries.length > 0) {
          setSelectedCountry(countries[0]['country name']);
        } 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to filter chart data by country
 

    if (selectedCountryData) {
      return [
        ['Indicator', 'Value'],
        ['Ladder score', selectedCountryData['Ladder score']],
        ['Standard error of ladder score', selectedCountryData['Standard error of ladder score']],
        ['upperwhisker', selectedCountryData['upperwhisker']],
        ['lowerwhisker', selectedCountryData['lowerwhisker']],
        ['Logged GDP per capita', selectedCountryData['Logged GDP per capita']],
        ['Social support', selectedCountryData['Social support']],
        ['Healthy life expectancy', selectedCountryData['Healthy life expectancy']],
        ['Freedom to make life choices', selectedCountryData['Freedom to make life choices']],
        ['Generosity', selectedCountryData['Generosity']],
        ['Perceptions of corruption', selectedCountryData['Perceptions of corruption']],
        ['Ladder score in Dystopia', selectedCountryData['Ladder score in Dystopia']],
        ['Explained by: Log GDP per capita', selectedCountryData['Explained by: Log GDP per capita']],
        ['Explained by: Social support', selectedCountryData['Explained by: Social support']],
        ['Explained by: Healthy life expectancy', selectedCountryData['Explained by: Healthy life expectancy']],
        ['Explained by: Freedom to make life choices', selectedCountryData['Explained by: Freedom to make life choices']],
        ['Explained by: Generosity', selectedCountryData['Explained by: Generosity']],
        ['Explained by: Perceptions of corruption', selectedCountryData['Explained by: Perceptions of corruption']],
        ['Dystopia + residual', selectedCountryData['Dystopia + residual']]
      ]
    } else {
      return []; // Return empty array if country not found
    }
  };

  return (
    <div>
    <h2>{selectedCountry ? `${selectedCountry} Data` : 'Country Data'}</h2>
    <Chart
      width={'100%'}
      height={'400px'}
      chartType="LineChart" // Changed to LineChart
      loader={<div>Loading Chart...</div>}
      data={chartData}
      options={{
        title: 'Prosperity Indicators',
        chartArea: { width: '80%' },
        hAxis: { title: 'Indicator', textStyle: { fontSize: 10 } }, 
        vAxis: { title: 'Value', minValue: 0 },
        legend: { position: 'none' }, // You might want a legend for a line chart
        pointSize: 5, // Adjust point size as needed
        curveType: 'function' // Optional: Makes lines curved
      }}
    />
  </div>
  );
}

export default Main
