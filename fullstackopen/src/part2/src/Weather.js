import React, {useState, useEffect} from 'react'
import axios from 'axios'
// import dotenv from 'dotenv'
// dotenv.config()

const Weather = ({ filteredCountry, weatherCountry }) => {
  
  
  if (filteredCountry.length === 1) {
    const [ weather, setWeather] = useState({})
    // const [ country, setCountry] = useState()
    const apiKey = '7103d3e9355c15bc232acd9442b53344'
    let country = filteredCountry[0]

    // if (filteredCountry[0] === 'georgia') {
    //   // setCountry('georgia')
    //   return country = filteredCountry[0]
    // }
    // else if (filteredCountry[0] === "South Georgia") {
    //   // setCountry('south georgia')
    //   return country = filteredCountry[0]
    // }
    // else {
    //   // setCountry(filteredCountry[0])
    //   return country = filteredCountry[0]
    // }
console.log('country', country)
console.log('filteredCountry[0]', filteredCountry[0])

    useEffect(() => {
      console.log('weatherAPI')
      async function fetchData() {
        try {
          const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${country.capital}&units=imperial&&appid=${apiKey}`;
          const response = await axios.get(apiUrl);
          setWeather(response.data);
          console.log('response', response)
        } catch (error) {
          // Handle the error here
        }
      }
      fetchData();
    }, []);
    console.log('weather', weather)
return (
<>
    <div>
      <h1 className='container' style={{textAlign: 'center'}}>Weather in {country?.capital ? country?.capital[0] : country?.capital}</h1>

      {/* <div style={{ display: 'flex', flexDirection: 'column'}}>	 */}
          {/* <div style={{ textAlign: 'center' }}> */}
        <div className="responsive-images" style={{ display: 'flex', width: 'auto', textAlign: 'center', justifyContent: 'center' }}>
        <div style={{ margin: 15, padding: 10, backgroundColor: '#e5e5e5'}}>
                <h3>Today</h3>
                <img
                  alt="weather icon"
                  src={`http://openweathermap.org/img/wn/${weather.list ? weather.list[0].weather[0].icon : null}@2x.png`}
                  style={{ width: 185 }} />
                  <div>
                    {weather.list ? weather.list[0].weather[0].description : null} | {weather.list ? weather.list[0].main.temp : null}°F 
                  </div>
          </div>
          <div style={{ margin: 15, padding: 10, backgroundColor: '#e5e5e5'}}>
                <h3>Tomorrow</h3>
                <img
                  alt="weather icon"
                  src={`http://openweathermap.org/img/wn/${weather.list ? weather.list[8].weather[0].icon : null}@2x.png`}
                  style={{ width: 185 }} />
                  <div>
                    {weather.list ? weather.list[8].weather[0].description : null} | {weather.list ? weather.list[8].main.temp : null}°F 
                  </div>
          </div>
          <div style={{ margin: 15, padding: 10, backgroundColor: '#e5e5e5'}}>
                <h3>Next day</h3>
                <img
                  alt="weather icon"
                  src={`http://openweathermap.org/img/wn/${weather.list ? weather.list[16].weather[0].icon : null}@2x.png`}
                  style={{ width: 185 }} />
                  <div>
                    {weather.list ? weather.list[16].weather[0].description : null} | {weather.list ? weather.list[16].main.temp : null}°F
                  </div>
          </div>
        </div>
        </div>
        {/* </div> */}
        {/* </div> */}
  </>
      );
}
  };

export default Weather







// const WeatherData = ({ capital }) => {
//   const [weather, setWeather] = useState([]);

//   useEffect(() => {
//     axios
//       .get(
//         `https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&units=metric&appid=7103d3e9355c15bc232acd9442b53344`
//         // `https://api.openweathermap.org/data/2.5/forecast?&appid=7103d3e9355c15bc232acd9442b53344`
//       )
//       .then((response) => {
//         setWeather(response.data);
//       });
//   }, []);

//   return (
//     <>
//       {weather.main ? (
//         <div>
//           <h2>Weather in {city}</h2>
//           <div>Temperature {weather.main.temp}°C</div>
//           <img
//             alt="weather icon"
//             src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//           />
//           <div>Wind {weather.wind.speed} m/s</div>
//         </div>
//       ) : null}
//     </>
//   );
// };

// export default WeatherData;