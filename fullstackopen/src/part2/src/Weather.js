import React, {useState, useEffect} from 'react'
import axios from 'axios'
// import dotenv from 'dotenv'
// dotenv.config()

const Weather = ( country ) => {
  
  const [ weather, setWeather] = useState({})
  // const apiKey = process.env.REACT_APP_API_KEY
  const apiKey = '7103d3e9355c15bc232acd9442b53344'
  // console.log(country)

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${country.country.capital}&units=imperial&&appid=${apiKey}`;
        const response = await axios.get(apiUrl);
        setWeather(response.data);
      } catch (error) {
        // Handle the error here
      }
    }
    fetchData();
  }, []);
  
//   useEffect(() => {
//     axios
//     .get(
//       `https://api.openweathermap.org/data/2.5/forecast?q=${country.country.capital}&units=metric&appid=${apiKey}`
//     )
//     .then((response) => {
//       setWeather(response.data);
//     });
// }, []);

    // console.log('weatherData', weather)
      
      return (
        <>
          {/* {weather ? ( */}
            <div>
              <h1 className='container'>Weather in {country.country.capital ? country.country.capital[0] : country.country.capital}</h1>
              <div style={{ textAlign: 'center' }}>
    				    <div style={{display: 'inline-block', textAlign: 'left'}}>
              <div><strong>Today: </strong> {weather.list ? weather.list[0].weather[0].description : null} | {weather.list ? weather.list[0].main.temp : null}°F</div>
              <img
                alt="weather icon"
                src={`http://openweathermap.org/img/wn/${weather.list ? weather.list[0].weather[0].icon : null}@2x.png`}
                style={{backgroundColor: '#aeaeae', width: 125}}
                />
              <div><strong>Tomorrow: </strong>{weather.list ? weather.list[8].weather[0].description : null} | {weather.list ? weather.list[8].main.temp : null}°F </div>
              <img
                alt="weather icon"
                src={`http://openweathermap.org/img/wn/${weather.list ? weather.list[8].weather[0].icon : null}@2x.png`}
                style={{backgroundColor: '#aeaeae', width: 125}}
                />
              <div><strong>Next day: </strong>{weather.list ? weather.list[16].weather[0].description : null} | {weather.list ? weather.list[16].main.temp : null}°F</div>
              <img
                alt="weather icon"
                src={`http://openweathermap.org/img/wn/${weather.list ? weather.list[16].weather[0].icon : null}@2x.png`}
                style={{backgroundColor: '#aeaeae', width: 125}}
                />
                </div>
                </div>
              {/* {Object.keys(weather.weather).map((entries) => <div key={weather.weather[entries]}> Currently: {(weather.weather[entries].description)}</div>)} */}
              {/* <div>Wind {weather.wind.speed} m/s</div> */}
            </div>
          {/* ) : null} */}
        </>
      );
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