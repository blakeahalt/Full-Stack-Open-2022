import React from 'react'

const Form = ({addName, newName, handleNameChange, newNumber, handleNumberChange, persons}) => {
	return (
	<div key={persons.id}>
		<form onSubmit={addName}>
			<div>
				name: <input value={newName} onChange={handleNameChange} />
			</div>
			<div>
				number: <input value={newNumber} onChange={handleNumberChange} />
			</div>
			<button type="submit">add</button>
		</form>
	</div>
	)	
}

export default Form

