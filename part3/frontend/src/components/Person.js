import React from 'react'
import { useState } from 'react'
import Remove from './Remove.js';
import Edit from './Edit.js'

const Person = ({ persons, setPersons, onSave, remove, updatePerson, messageDetails, setMessage }) => {
const [selectedPersonId, setSelectedPersonId] = useState(null);

const handleEdit = (personId) => {
    setSelectedPersonId(personId);
};

const handleCancel = () => {
    setSelectedPersonId(null);
  };

return (
    <div style={{ margin: '5px', padding: '5px' }}>
    <table style={{ width: '100%' }}>
        <thead>
            <tr style={{ borderBottom: '1px solid black' }}>
                <th>Name</th>
                <th >Number</th>
                <th style={{textAlign: 'center'}}>Actions</th>
            </tr>
        </thead>
        <tbody>
        {persons.map(person => (
            <tr className="contact-row" key={person.id} style={{ display: 'flex', borderBottom: '1px solid lightgray' }}>
            {selectedPersonId === person.id ? (
                <Edit person={person} updatePerson={updatePerson} handleCancel={handleCancel} messageDetails={messageDetails} setMessage={setMessage} setPersons={setPersons} onSave={onSave}/>
            ) : (
                <>
                <td className="contact-name">{person.name}</td>
                <td className="contact-number">{person.number}</td>
                <td className="contact-action">
                    <div style={{ display: 'flex' }}>
                        <button style={{ marginRight: 3 }} onClick={() => handleEdit(person.id)}>Edit</button>
                        <Remove person={person} remove={remove} updatePerson={updatePerson} _id={person.id} />
                    </div>
                </td>
                </>
            )}
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
};

export default Person;