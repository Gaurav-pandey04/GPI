import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const Compare = (comparisonCountries) => {
    const country1 =comparisonCountries.countries[0][0];
    const country2 =comparisonCountries.countries[0][1];
    console.log(country1, country2);

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const encodedCountry1 = encodeURIComponent(country1);
      const encodedCountry2 = encodeURIComponent(country2);

            // Fetch data for both countries
            const response1 = await fetch(`http://localhost:3001/api/countries?name=${encodedCountry1}`);
            const response2 = await fetch(`http://localhost:3001/api/countries?name=${encodedCountry2}`);
    
            const [data1, data2] = await Promise.all([response1.json(), response2.json()]);
    
            // Assuming your API returns an array with a single country object
            const countryData1 = data1[0];
            const countryData2 = data2[0];

            
            
            // Prepare data for the chart (add more indicators as needed)
            const chartData = [
                ['Indicator', country1, country2], 
                ['Ladder score', countryData1['Ladder score'], countryData2['Ladder score']],
                ['Standard error of ladder score', countryData1['Standard error of ladder score'], countryData2['Standard error of ladder score']],
                ['upperwhisker', countryData1['upperwhisker'], countryData2['upperwhisker']],
                ['lowerwhisker', countryData1['lowerwhisker'], countryData2['lowerwhisker']],
                ['Logged GDP per capita', countryData1['Logged GDP per capita'], countryData2['Logged GDP per capita']],
                ['Social support', countryData1['Social support'], countryData2['Social support']],
                ['Healthy life expectancy', countryData1['Healthy life expectancy'], countryData2['Healthy life expectancy']],
                ['Freedom to make life choices', countryData1['Freedom to make life choices'], countryData2['Freedom to make life choices']],
                ['Generosity', countryData1['Generosity'], countryData2['Generosity']],
                ['Perceptions of corruption', countryData1['Perceptions of corruption'], countryData2['Perceptions of corruption']],
                ['Ladder score in Dystopia', countryData1['Ladder score in Dystopia'], countryData2['Ladder score in Dystopia']],
                ['Explained by: Log GDP per capita', countryData1['Explained by: Log GDP per capita'], countryData2['Explained by: Log GDP per capita']],
                ['Explained by: Social support', countryData1['Explained by: Social support'], countryData2['Explained by: Social support']],
                ['Explained by: Healthy life expectancy', countryData1['Healthy life expectancy'], countryData2['Healthy life expectancy']],
                ['Explained by: Freedom to make life choices', countryData1['Freedom to make life choices'], countryData2['Freedom to make life choices']],
                ['Explained by: Generosity', countryData1['Generosity'], countryData2['Generosity']],
                ['Perceptions of corruption', countryData1['Perceptions of corruption'], countryData2['Perceptions of corruption']],
                ['Dystopia + residual', countryData1['Dystopia + residual'], countryData2['Dystopia + residual']]
              ];
            setChartData(chartData);
            console.log(chartData);
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        if (country1 && country2) {
          fetchData();
        }
      }, [country1, country2]); 
    
      return (
        <div className='adjust-width' >
          <h2 className='text-center text-2xl'>Comparing {country1} and {country2}</h2>
          {chartData.length > 0 ? (
            <Chart
              width={'100%'}
              height={'400px'}
              chartType="ColumnChart"
              loader={<div>Loading Chart...</div>}
              data={chartData}
              options={{
                title: 'Comparison of Prosperity Indicators',
                chartArea: { width: '80%' },
                hAxis: { title: 'Indicator', textStyle: { fontSize: 15 } },
                vAxis: { title: 'Value', minValue: 0 },
                legend: { position: 'right' }, // Show legend for comparison
                pointSize: 5, 
                curveType: 'function',
                animation: { 
                  startup: true,       
                  duration: 1000,      
                  easing: 'inAndOut',    
                },
              }}
            />
          ) : (
            <div>Loading comparison data...</div>
          )}
        </div>
      );
}

export default Compare