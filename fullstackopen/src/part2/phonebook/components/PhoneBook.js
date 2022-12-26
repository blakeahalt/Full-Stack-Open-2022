import React from 'react';
import Person from './Person.js';

const PhoneBook = ({ persons, remove, update }) => (
    <div>
        <h2>Phone Book</h2>
		<div key={persons.id} style={{ margin: '5px', padding: '5px' }}></div>
			{persons.map(person => {
				return (
					<Person 
						person={person}
						key={person.id}
						remove={remove}
						update={update}
					/>
                )
            })}
    </div>
);

export default PhoneBook;
