import React from 'react'
import Weather from './Weather.js'
import './country.css'

const ShowCountries = ({ filteredCountry, newFilter, setNewFilter }) => {
	if (filteredCountry.length === 1) {
		const country = filteredCountry[0]
		const pop = country.population;
		const formattedPop = pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		// console.log('country', country)

		const currencyKeys = Object.keys(country.currencies)
		return (
		<>
			<div>
				<h1 className="container" style={{maxWidth: 625, marginBottom: -10, marginTop: -10, textAlign: 'center'}}>{country.name.official}</h1>
				
					<div style={{ display: 'flex', flexDirection: 'column'}}>	
					{country.coatOfArms.svg ? (
						<div className="responsive-images" style={{ display: 'flex', width: 'auto', textAlign: 'center', justifyContent: 'center' }}>
							<div style={{margin:5}}>
								<img
								src={country.flags.svg}
								alt={country.name.official}
								style={{height: 150}}
								border="1px"
								/>
								<p style={{ textAlign: 'center' }}>National Flag</p>
							</div>
							<div style={{margin:5}}>
								<img
								src={country.coatOfArms.svg}
								alt={"Coat of Arms"}
								style={{height: 150, textAlign: 'center' }}
								border="1px"
								/>
								<p style={{ textAlign: 'center' }}>Coat of Arms</p>
							</div>
						</div>
					) : (
						<div style={{ textAlign: 'center' }}>
						<img
							src={country.flags.svg}
							alt={country.name.official}
							height="150"
							style={{ display: 'inline-block', marginRight: 10 }}
							border="1px"
						/>
						<p style={{ textAlign: 'center' }}>National Flag</p>
						</div>
					)}
					</div>

				<div style={{ textAlign: 'center', marginBottom: -20, marginTop: -15 }}>
    				<div style={{display: 'inline-block', textAlign: 'left'}}>
						<li className="item"><strong>Commonly Known As: </strong>{country.name.common}</li>
						<li className="item"><strong>Capital: </strong>{Object.values(country.capital).join(', ')}</li>
						<li className="item"><strong>Population: </strong>{formattedPop}</li>
						<li className="item"><strong>Languages: </strong>
						{Object.values(country.languages).join(', ')}</li>
						<li className="item" style={{display: 'flex'}}><strong>Currencies:&nbsp;</strong>{country.currencies[currencyKeys[0]].name} ({country.currencies[currencyKeys[0]].symbol})</li>
					</div>
				</div>
					{/* <div><strong>Languages:</strong>{country.languages[1] ? 
						Object.values(country.languages).join(', ') : 
						country.languages
					}</div> */}
			</div>
		  </>
		)
	  }

	  else if (newFilter.length === 0) return <div>Please enter a country name</div>
	  else if (filteredCountry.length > 10) return <div>Too many matches, specify another filter</div>
	  return filteredCountry.map(country => {
		return (
			// <div style={{display: 'flex'}}>
			<div style={{display: 'flex',textAlign: 'left'}}>
				<button style={{marginRight: 10, height: 40}} value={country.name.common || country.name.official} onClick={(e) => setNewFilter(e.target.value)}>show</button>
				<li style={{marginRight: 10, height: 15}}>{country.name.common || country.name.official} </li>
			</div>
			// </div>
		)
	  })
	}

export default ShowCountries
