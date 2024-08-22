import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const World = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/countries'); // Your API endpoint
        const countries = await response.json();

        // Prepare data for GeoChart
        const geoChartData = [
          ['Country', 'Healthy life expectancy'],
          ...countries.map(country => [
            country['country name'], 
            country['Healthy life expectancy'],
          ]),
        ];

        setChartData(geoChartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='adjust-width'>
      {/* <h2 className='text-center'>World Overview</h2> */}
      {chartData.length > 0 && ( // Render only when data is loaded
        <Chart
          width={'100%'}
          height={'600px'}
          chartType="GeoChart"
          loader={<div>Loading Chart...</div>}
          data={chartData}
          options={{
            // Customize chart options here
            title: 'Healthy Life Expectancy by Country',
            colorAxis: { colors: ['#e6f2ff', '#0066cc'] }, // Customize color range 
          }}
        />
      )}
    </div>
  );
};

export default World;