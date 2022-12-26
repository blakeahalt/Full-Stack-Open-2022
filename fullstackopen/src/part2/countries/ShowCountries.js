import React from 'react'
import Weather from './Weather.js'

const ShowCountries = ({ filteredCountry, setNewFilter }) => {
	if (filteredCountry.length === 1) {
		const country = filteredCountry[0]
		console.log('country', country)
		return (
		<>
			<div>
				<h1>{country.name.official}</h1>
					<div>Commonly Known As: {country.name.common}</div>
					<div>Capital: {country.capital}</div>
					<div>Population: {country.population}</div>
				<h3>Languages:</h3>
					{Object.keys(country.languages).map((entries) => <li key={country.languages[entries]}> {(country.languages[entries])}</li>)}
				<br></br>
				<img src={country.flags.svg} alt={country.name.official} width='200px' border='1px'/>			
			</div>
		  <Weather country={country} />
		  </>
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

export default ShowCountries
