import React, {useState, useEffect} from 'react'
import axios from 'axios'


// const [ temp, setTemp ] = useState({})
// const [ weatherIcon, setWeatherIcon ] = useState("")
// const [ weatherDesc, setWeatherDesc ] = useState("")
// const [ windSpeed, setWindSpeed ] = useState("")
// const [ windDir, setWindDir ] = useState("")

const Weather = ({ country }) => {
    const access_key = process.env.REACT_APP_API_KEY
    
    const [ weather, setWeather] = useState({})
    console.log(weather)


    useEffect(() => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=imperial&appid=${access_key}`
          )
          .then((response) => {
            setWeather(response.data);
          });
      }, []);

    
      
      return (
        <>
          {weather.main ? (
            <div>
              <h2>Weather in {country.capital}</h2>
              <div>Temperature {weather.main.temp}°F</div>
              <img
                alt="weather icon"
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                />
              {Object.keys(weather.weather).map((entries) => <div key={weather.weather[entries]}> Currently: {(weather.weather[entries].description)}</div>)}
              <div>Wind {weather.wind.speed} m/s</div>
            </div>
          ) : null}
        </>
      );
    };


    
    // useEffect(() => {
    //     axios
	// 	.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=imperial&appid=${access_key}`)
	// 	.then(response => {
    //         setWeather(response.data.current)
    //         // setWeatherIcon(response.data['current']['icons'][0]),
    //         // setWeatherDesc(response.data['current']['descriptions'][0]),
    //         // windSpeed(response.data['weather.wind.speed'])
    //         // windDir(response.data['current']['wind.dir'])
    //     }) 
	// }, [])
    
    // return (
    //         <>
            
	// 		<div>
	// 			<h1>Weather in {country.capital}</h1>
    //         </div>
    //         <div>
	// 			<div><b>temperature:</b> {weather} Fahrenheit</div>
	// 			{/* <img src={weatherIcon} alt={weatherDesc}/> */}
	// 			<div><b>wind:</b> {weather} mph direction {weather}</div>
	// 		</div>
    //         </>
	// 	)
	//   }
export default Weather