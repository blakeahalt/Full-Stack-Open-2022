import React, { useState } from 'react';
import Cancel from './Cancel.js';

const Edit = ({ person, updatePerson, handleCancel, setMessage }) => {
  const [newName, setNewName] = useState(person.name);
  const [newNumber, setNewNumber] = useState(person.number);

  const handleSubmit = (event) => {
    event.preventDefault();
    updatePerson(person.id, newName, newNumber);

      setMessage({
        message: `Successfully updated ${newName}!`,
        type: 'success',
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
  };

  return (
    <td>
      <form
        className="edit-form"
        onSubmit={handleSubmit}
        style={{ alignItems: 'center' }}
      >
        <td className="edit-name">
          <input
            type="text"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </td>
        <td className="edit-number">
          <input
            type="text"
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </td>
        <td className="edit-action">
          <div style={{ display: 'flex' }}>
            <button style={{marginRight: 5}} type="submit">
              Save
            </button>
            <Cancel handleCancel={handleCancel} />
          </div>
        </td>
      </form>
    </td>
  );
};

export default Edit;
