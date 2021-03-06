import React from 'react'

const AddPerson = ({ addName, newName, handleNameChange, newNumber, handleNumberChange, persons, setMessage}) => (
	<div key={persons}>
        <form onSubmit={addName}>
              <div>
                name: <input value={newName} onChange={handleNameChange} />
              </div>

              <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
              </div>

              <div>
                <button type='submit'>Add</button>
                <div>{setMessage}</div>
              </div>
        </form>
    </div>
);


export default AddPerson;