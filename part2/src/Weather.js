import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({ filteredCountry }) => {
  
  
  if (filteredCountry.length === 1) {
    const [ weather, setWeather] = useState({})
    const apiKey = '7103d3e9355c15bc232acd9442b53344'
    let country = filteredCountry[0]

    useEffect(() => {
      async function fetchData() {
        try {
          const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${country.capital}&units=imperial&&appid=${apiKey}`;
          const response = await axios.get(apiUrl);
          setWeather(response.data);
          // console.log('response', response)
        } catch (error) {
          // Handle the error here
        }
      }
      fetchData();
    }, []);
    // console.log('weather', weather)
return (
<>
    <div>
      <h1 className='container' style={{textAlign: 'center', marginBottom: -5}}>Weather in {country?.capital ? country?.capital[0] : country?.capital}</h1>

        <div className="responsive-images" style={{ display: 'flex', width: 'auto', textAlign: 'center', justifyContent: 'center' }}>
        <div style={{ margin: 15, padding: 10, backgroundColor: '#e5e5e5'}}>
                <h3>Today</h3>
                <img
                  alt="weather icon"
                  src={`http://openweathermap.org/img/wn/${weather.list ? weather.list[0].weather[0].icon : null}@2x.png`}
                  style={{ width: 125 }} />
                  <div>
                    {weather.list ? weather.list[0].weather[0].description : null} 
                  </div>
                  <div>
                    {weather.list ? weather.list[0].main.temp : null}°F 
                  </div>
          </div>
          <div style={{ margin: 15, padding: 10, backgroundColor: '#e5e5e5'}}>
                <h3>Tomorrow</h3>
                <img
                  alt="weather icon"
                  src={`http://openweathermap.org/img/wn/${weather.list ? weather.list[8].weather[0].icon : null}@2x.png`}
                  style={{ width: 125 }} />
                  <div>
                    {weather.list ? weather.list[8].weather[0].description : null}
                  </div>
                  <div>
                    {weather.list ? weather.list[8].main.temp : null}°F 
                  </div>
          </div>
          <div style={{ margin: 15, padding: 10, backgroundColor: '#e5e5e5'}}>
                <h3>Next day</h3>
                <img
                  alt="weather icon"
                  src={`http://openweathermap.org/img/wn/${weather.list ? weather.list[16].weather[0].icon : null}@2x.png`}
                  style={{ width: 125 }} />
                  <div>
                    {weather.list ? weather.list[16].weather[0].description : null}
                  </div>
                  <div>
                    {weather.list ? weather.list[16].main.temp : null}°F
                  </div>
          </div>
        </div>
        </div>
  </>
      );
}
  };

export default Weather