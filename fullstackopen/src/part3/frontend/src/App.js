import React from 'react'
import { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import noteService from './services/Persons.js'
import AddPerson from './components/AddPerson.js'
import PhoneBook from './components/PhoneBook.js'
import Notification from './components/Notification.js'
import './index.css'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newNumber10, setNewNumber10] = useState('')
  const [newNumber9, setNewNumber9] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [messageDetails, setMessage] = useState({})

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const resetNotification = () => {
    setTimeout(() => {
      setMessage({})
    }, 3000)
  }

  const filteredPerson = !newFilter
    ? persons
    : persons.filter((person) =>
      person.name.toLowerCase().includes(newFilter.toLowerCase()))
      

  const addName = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber || newNumber9 || newNumber10
    }

    if (!newName && !newNumber) {
      setMessage({
        message:'No name or number',
        type: 'error' })
      resetNotification()
      setNewName('')
      setNewNumber('')
      } else if (newName && newName.length < 3) {
      setMessage({
        message:'Name must have at least 3 letters.',
        type: 'error' })
      resetNotification()
      setNewName('')
      setNewNumber('')
    } else if (newNumber && newNumber.length < 8) {
      setMessage({
        message:'Number must be at least 8 digits.',
        type: 'error' })
      resetNotification()
      setNewName('')
      setNewNumber('')
    } else if (newNumber.length > 12) {
      setMessage({
        message:'Number is too long.',
        type: 'error' })
      resetNotification()
      setNewName('')
      setNewNumber('')
    } else if (newNumber === undefined || !newNumber) {
      setMessage({
        message:'No number',
          type: 'error' })
      resetNotification()
      setNewName('')
      setNewNumber('')
    } else if (newName === undefined || !newName) {
      setMessage({
        message:'No name',
          type: 'error' })
      resetNotification()
      setNewName('')
      setNewNumber('')
    }

    const isFound = (persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase()))

    if (isFound){
      let res = window.confirm(`${newName} already exists. To update a new number, click to confirm.`)
      if (res) {
        updateNumber(isFound.id, newPerson)
        // noteService
        //   .update(isFound.id, newPerson)
        //   .then(updatedPerson => {
        //     setPersons(persons.map(person => person.id ? person : updatedPerson))
        //     setMessage(
        //       { message:`Successfully updated ${newName}'s number!`,
        //         type: 'success' })
        //   })
        // resetNotification()
        // setNewNumber10('') || setNewNumber9('') || setNewNumber('')
        // setNewName('')
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
            type: 'success' })
        })
      resetNotification()
      setNewName('')
      setNewNumber('')
    }
  }

  // const updateNumber = (id, newObject) => {
  //   noteService
  //     .update(id, newObject)
  //     .then(updatedPerson => {
  //       setPersons(persons.map(person => person.id ? person : updatedPerson))
  //       setMessage(
  //             { message:`Successfully updated ${newName}'s number!`,
  //               type: 'success' })
  //         })
  //       resetNotification()
  //       setNewNumber10('') || setNewNumber9('') || setNewNumber('')
  //       setNewName('')
  //       //   setNewNumber('')
  //     //   setNewName('')
  //     // })
  // }

  const updateNumber = (id, newPerson) => {
    noteService
      .update(id, newPerson)
      .then(updatedPerson => {
        // Update the persons state with the updated person object
        setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
        setMessage(
          { message:`Successfully updated ${newName}'s number!`,
            type: 'success' })
      })
    resetNotification()
    setNewNumber10('') || setNewNumber9('') || setNewNumber('')
    setNewName('')
  }

  const removePerson = id => {
    noteService
      .remove(id)
      .then(removedPerson => {
        setPersons(persons.filter(person => person.id !== id))
        // setPersons(persons)
        setMessage(
          { message:'Successfully REMOVED!',
            type: 'success' })
        resetNotification()
        setNewNumber('')
        setNewName('')
      })
      .catch(event => {
        setMessage(
          { message:`${newName} has already deleted from server`,
            type: 'error' })
        resetNotification()
        setNewNumber('')
        setNewName('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    const value = event.target.value
    if (value.length === 10) {
      // 111-111-1111 format
      const formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
      setNewNumber(formattedValue)
      setNewNumber10(formattedValue)
    } else {
      setNewNumber10('')
      setNewNumber9('')
      setNewNumber(event.target.value)
    }
  }
  

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

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
  )
}
export default App
