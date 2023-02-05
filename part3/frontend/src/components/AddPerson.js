import React from 'react'

const AddPerson = ({ addName, newName, handleNameChange, newNumber, handleNumberChange, persons, setMessage }) => (
	<div className="addContactForm" key={persons} >
  <div style={{ justifyContent: 'center'}}>
        <form  onSubmit={addName}>
              <div>
                <input value={newName} placeholder="Name" onChange={handleNameChange} />
              </div>

              <div>
                <input value={newNumber} placeholder="Number" onChange={handleNumberChange} />
              </div>

              <div>
                <button type='submit'>Add Contact</button>
                <div>{setMessage}</div>
              </div>
              <br/>
        </form>
    </div>
    </div>
);


export default AddPerson;