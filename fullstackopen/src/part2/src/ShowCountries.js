import React from 'react'
import Weather from './Weather.js'

const ShowCountries = ({ filteredCountry, setNewFilter }) => {
	if (filteredCountry.length === 1) {
		const country = filteredCountry[0]
		const pop = country.population;
		const formattedPop = pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		console.log('country', country)
		return (
		<>
			<div>
				<h1>{country.name.official}</h1>
					<div><strong>Commonly Known As: </strong>{country.name.common}</div>
					<div><strong>Capital: </strong>{Object.values(country.capital).join(', ')}</div>
					<div><strong>Population: </strong>{formattedPop}</div>
					<div><strong>Languages: </strong>
					{Object.values(country.languages).join(', ')}</div>
					{/* <div><strong>Languages:</strong>{country.languages[1] ? 
						Object.values(country.languages).join(', ') : 
						country.languages
					}</div> */}
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
