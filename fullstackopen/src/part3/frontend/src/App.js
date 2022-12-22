import React from 'react'
import { useState, useEffect } from 'react';
import Filter from './components/Filter.js'
import noteService from './services/Persons.js'
import AddPerson from './components/AddPerson.js';
import PhoneBook from './components/PhoneBook.js';
import Notification from './components/Notification.js';
import './index.css'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([
    {"name": "Blake", "number": "508-299-9373"},
    {"name": "Joshua", "number": "508-339-9392"}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [messageDetails, setMessage] = useState({})

  // useEffect(() => {
  //   noteService
  //       .getAll()
  //       .then(response => {
  //           setPersons(response)
  //       })
  //    }, [])
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])
  
  const resetNotification = () => {
  setTimeout(() => {
    setMessage({})
  }, 3000)
};


  const filteredPerson = !newFilter
  ? persons
  : persons.filter((person) =>
  person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
const addName = (event) => {
  event.preventDefault()
  
  const newPerson = {
    name: newName,
    number: newNumber
  }
  
  const isFound = (persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) 
  
  if (isFound){
    let res = window.confirm(`${newName} already exists. To update a new number, click to confirm.`)
    if (res) {
      noteService
        .update(isFound.id, newPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id ? person : updatedPerson))
          setMessage(
            {message:`Successfully updated ${newName}'s number!`,
            type: "success"})
          })
          resetNotification()
          setNewNumber('')
          setNewName('')
    } else {
      setPersons(persons)
    }
    resetNotification()
    setNewName('')
    setNewNumber('')
  } else {
    noteService
      .create(newPerson)
      .then(newbie => {
        setPersons(persons.concat(newbie))
        setMessage({
          message:`Successfully added ${newName} to the PhoneBook!`,
          type: "success"})
        })
        resetNotification()
        setNewName('')
        setNewNumber('')
  }
}

const updateNumber = (id, newObject) => {
  noteService
    .update(id, newObject)
    .then(updatedPerson => {
      setPersons(persons.map(person => person.id ? person : updatedPerson))
      setNewNumber('')
      setNewName('')
      })
  }
  
const removePerson = id => {
  noteService
    .remove(id)
    .then(removedPerson => {
      setPersons(persons);
      setMessage(
        {message:`Successfully REMOVED!`,
        type: "success"})
        resetNotification()
        setNewNumber('')
        setNewName('')
    })
    .catch(event => {
      setMessage(
        {message:`the person was already deleted from server`,
        type: "error"})
        resetNotification()
        setNewNumber('')
        setNewName('')
    })
}
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };
  
  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  };

  
  return (
    <>
      <h2>Phonebook</h2>
        <div>
          <Filter newFilter={newFilter} handleFilter={handleFilter} />
        </div>

      <h2>Add a new</h2>
        <AddPerson 
          addName={addName} 
          newName={newName} 
          newNumber={newNumber}
          handleNameChange={handleNameChange} 
          handleNumberChange={handleNumberChange} 
          persons={persons} 
        />
      <br></br>
        <Notification 
          message={messageDetails.message}
          type={messageDetails.type}/>
        <PhoneBook 
          persons={filteredPerson}
          remove={removePerson}
          update={updateNumber} />
    </>
  );
};
export default App
