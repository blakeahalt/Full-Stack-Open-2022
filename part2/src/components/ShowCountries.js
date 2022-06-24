import React from 'react'

const ShowCountries = ({filteredCountry, setNewFilter}) => {
	if (filteredCountry.length === 1) {
		const country = filteredCountry[0]
		return (
			<div key={country.latlng}>
				<React.StrictMode>
				<h2>{country.name.official} </h2>
				<p>Commonly known as: {country.name.common}</p>
				<p>Capital: {country.capital}</p>
				<p>Population: {country.population}</p>
				<img src={country.flags.svg} alt={country.name.official} width='25%'/>
				<h3>Languages</h3>
				<ul key={country.latlng}>
					{Object.keys(country.languages).map((entries) => <li> {country.languages[entries]}</li>)}
				</ul>
				</React.StrictMode>
			</div>
		)
	}
	if (filteredCountry.length > 10) return
	<div>Too many matches, specify another filter</div>
	return filteredCountry.map(country => {
		return(
			<div key={country.latlng}>
				{country.name.official} <button value={country.name.official} onClick={(event) => setNewFilter(event.target.value)}>show</button>
			</div>
		)
	})
}

export default ShowCountries