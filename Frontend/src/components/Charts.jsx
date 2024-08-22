import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const Charts = ({ selectedCountry }) => { // Use the prop directly
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/countries');
        const allCountriesData = await response.json();
        // Find the selected country's data
        const selectedCountryData = allCountriesData.find(
          (country) => country['country name'] === selectedCountry
        );
        // If country found, prepare data for the chart
        if (selectedCountryData) {
          const chartData = [
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
          ];
          setChartData(chartData);
        } else {
          setChartData([]); // Clear chart data if no country selected yet
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Only fetch data when selectedCountry prop changes
    if (selectedCountry) { // Check if a country is selected
      fetchData();
    }
  }, [selectedCountry]); // Update effect when selectedCountry changes

  // ... rest of your component (Chart rendering logic)

  return (
    <div className='adjust-width'>
      <h1 className='text-center'>{selectedCountry ? `${selectedCountry} ` : 'Country Data'}</h1>
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

export default Charts;