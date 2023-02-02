import React from 'react';
import Person from './Person.js';
import Filter from './Filter.js'

const PhoneBook = ({ persons, setPersons, remove, onSave, update, newFilter, handleFilter, updatePerson, messageDetails, setMessage }) => (
    <div className="phoneBookList">
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5, marginBottom: -10 }} >
            <h2 style={{marginTop: 10}}>Contacts</h2>
            <Filter newFilter={newFilter} handleFilter={handleFilter} style={{ justifyContent: 'right' }} />
        </div>
		<div key={persons.id} >
            <Person 
                persons={persons}
                updatePerson={updatePerson}
                remove={remove}
                messageDetails={messageDetails}
                setMessage={setMessage}
                setPersons={setPersons}
                onSave={onSave}
            />
    </div>
    </div>
);

export default PhoneBook;