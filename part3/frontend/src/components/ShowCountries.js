import React from 'react'
import Weather from './Weather.js'

const ShowCountries = ({ filteredCountry, setNewFilter }) => {
	if (filteredCountry.length === 1) {
		const country = filteredCountry[0]
		return (
		  <div>
			<h1>{country.name.official}</h1>
			<div>Commonly Known As: {country.name.common}</div>
			<div>Capital: {country.capital}</div>
			<div>Population: {country.population}</div>
			<h3>Languages:</h3>
			{/* <ul> */}
			{Object.keys(country.languages).map((entries) => <li key={country.languages[entries]}> {(country.languages[entries])}</li>)}
			{/* {(country.languages).map((language) => <li key={language.index}>{language.name}</li>)} */}
			{/* </ul> */}
			<br></br>
			<img src={country.flags.svg} alt={country.name.official} width='200px' border='1px'/>
			
			<Weather country={country} />
			
		  </div>
		)
	  }
	  if (filteredCountry.length > 10) return <div>Too many matches, specify another filter</div>
	  return filteredCountry.map(country => {
		return (
			<>
			<div key={country.area}>
				{country.name.official} <button value={country.name.official} onClick={(e) => setNewFilter(e.target.value)}>show</button>
			</div>
			</>
		)
	  })
	}
// 	if (filteredCountry.length === 1) {
// 		const country = filteredCountry[0]
// 		return (
// 			<>
// 			<div>
// 				{
// 					React.Children.toArray(
// 						<> 
// 				<h2>{country.name.official} </h2>
// 				<p>Commonly known as: {country.name.common}</p>
// 				<p>Capital: {country.capital}</p>
// 				<p>Population: {country.population}</p>
// 				<img src={country.flags.svg} alt={country.name.official} width='25%'/>
// 				<h3>Languages</h3>
// 				<ul>
// 					{Object.keys(country.languages).map((entries) => <li key={country.name.common}> {country.languages[entries]}</li>)}
// 				</ul>
// 				<Weather capital={country.capital} />
// 				</>
// 					)
// 				}
// 			</div>
// 			</>
// 		)
// 	}

// 	if (filteredCountry.length > 10) 
// 		return
// 		<div>
// 			<p>Too many matches, specify another filter</p>
// 		</div>
// 		return (filteredCountry.map(country => {
// 			return(
// 				<div>
// 					{country.name.official} <button value={country.name.official} onClick={(event) => setNewFilter(event.target.value)}>show</button>
// 				</div>
// 				)
// 			})
// 		)
// }		

export default ShowCountries

// const Countries = ({ ...countries }) => {
	// if (filteredCountry = !newFilter) {
	// 	countries.filter((country) =>
       //   	country.common.toLowerCase().includes(newFilter.toLowerCase())
	// ); 
	// }
// const Countries = ({ countries }) => {
// 	return (
// 		<div>
// 			<ul>
// 				{countries.map((country) => <li key={country.latlng}>{country.name.common} </li>)}
// 			</ul>
// 		</div>
	
	
// 		// // if (countries.length > 10) {
// 		// 	<p>Too many matches, specify another filter</p>
// 		// } else if (countries.length > 1 && countries.length < 10) {
// 		// 	countries.map((country) => (
// 		// 		<p key={country.latlng}>{country.common}</p>
// 		// 			))
// 		// } else if (countries.length === 1) {
// 		// 	<div key={countries.latlng}>
// 		// 	<h2>{countries.common}</h2>
// 		// 	<p>Capital: {countries.capital}</p>
// 		// 	<p>Population: {countries.population}</p>
// 		// 	<h3>languages</h3>
// 		// 	</div>
// 		// } else {
// 		// 	return [];
// 		// } //
// 	)
// }
// export default Countries