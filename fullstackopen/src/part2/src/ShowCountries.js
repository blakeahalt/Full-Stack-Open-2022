import React from 'react'
import Weather from './Weather.js'
import './country.css'

const ShowCountries = ({ filteredCountry, setNewFilter }) => {
	if (filteredCountry.length === 1) {
		const country = filteredCountry[0]
		const pop = country.population;
		const formattedPop = pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		console.log('country', country)

		const currencyKeys = Object.keys(country.currencies)
		return (
		<>
			<div>
				<h1 className="container" style={{maxWidth: 600, textAlign: 'center'}}>{country.name.official}</h1>
				
					{country.coatOfArms.svg ? (
						<div style={{display: 'flex'}}>
							<div>
								<img src={country.flags.svg} alt={country.name.official} height='175' style={{display: 'inline-block', marginRight: 10}} border='1px'/> 
								<p style={{textAlign: 'center'}}>National Flag</p>
							</div>
							<div>
								<img src={country.coatOfArms.svg} alt={'Coat of Arms'} style={{height: 175, display: 'inline-block'}} border='1px'/>
								<p style={{textAlign: 'center'}}>Coat of Arms</p>
							</div>
						</div>
						) : 
							<div style={{textAlign: 'center'}}>
								<img src={country.flags.svg} alt={country.name.official} height='175' style={{display: 'inline-block', marginRight: 10}} border='1px'/> 
								<p style={{textAlign: 'center'}}>National Flag</p>
							</div>}
				<div style={{ textAlign: 'center' }}>
    				<div style={{display: 'inline-block', textAlign: 'left'}}>
						<li className="item"><strong>Commonly Known As: </strong>{country.name.common}</li>
						<li className="item"><strong>Capital: </strong>{Object.values(country.capital).join(', ')}</li>
						<li className="item"><strong>Population: </strong>{formattedPop}</li>
						<li className="item"><strong>Languages: </strong>
						{Object.values(country.languages).join(', ')}</li>
						<li className="item"><strong>Currencies: </strong>
						{country.currencies[currencyKeys[0]].name} ({country.currencies[currencyKeys[0]].symbol})</li>
					</div>
				</div>
					{/* <div><strong>Languages:</strong>{country.languages[1] ? 
						Object.values(country.languages).join(', ') : 
						country.languages
					}</div> */}
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
				<button style={{marginRight: 10}} value={country.name.official} onClick={(e) => setNewFilter(e.target.value)}>show</button> {country.name.official} 
			</div>
			</>
		)
	  })
	}

export default ShowCountries
