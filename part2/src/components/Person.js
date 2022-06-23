Import React from 'react'

const Person = ({ filteredPerson }) => {
	return (
	<div>
		{filteredPerson.map((person) => <li key={person.id}>{person.name} {person.number} </li>)}
	</div>
	)
}

export default Person