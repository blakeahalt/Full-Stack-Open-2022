import React from 'react'
import { useState, useEffect } from 'react'
import noteService from './services/Persons.js'
import AddPerson from './components/AddPerson.js'
import PhoneBook from './components/PhoneBook.js'
import Notification from './components/Notification.js'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newNumber10, setNewNumber10] = useState('')
  const [newNumber9, setNewNumber9] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [messageDetails, setMessage] = useState({})
  const [refresh, setRefresh] = useState(false)

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch('https://retoolapi.dev/GQNT8a/data')
        .then((response) => response.json())
        .then((apiData) => setApiData(apiData));
  }, []);

// console.log('apiData', apiData)

// const usedIds = new Set();
// const userData = apiData.map(x => {
//   let id = Math.floor(Math.random() * 1000) + 1;
//   while (usedIds.has(id)) {
//     id = Math.floor(Math.random() * 1000) + 1;
//   }
//   usedIds.add(id);

//   return {
//     name: x.fullName, 
//     number: x.isUser.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
//     id: id
//   };
// });

// const addedIds = new Set();
// async function addPersons() {
//   const newPersons = await Promise.all(
//     userData.map(async person => {
//       if (!addedIds.has(person.id)) {
//         const newbie = await noteService.create(person);
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         addedIds.add(person.id);
//         return newbie;
//       }
//     })
//   );
//   setPersons(persons.concat(...newPersons.filter(Boolean)));
// }
// addPersons()

  useEffect(() => {
    if (refresh) {
      window.location.reload(false)
    }
  }, [refresh])
  
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
    }, 2000)
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

  const updatePerson = (id, newName, newNumber) => {
    const newPerson = { name: newName, number: newNumber };
    noteService
      .update(id, newPerson)
      .then(updatedPerson => {
        setPersons(persons.map(person => {
          if (person.id !== id) return person;
  
          return {
            ...person,
            name: newName !== "" ? newName : person.name,
            number: newNumber !== "" ? newNumber : person.number
          };
        }))
        setMessage({
          message:`Successfully updated ${newName}'s information!`,
          type: 'success'
        });
        setTimeout(() => {
          setMessage({ message: '', type: '' });
          window.location.reload();
        }, 10000);
      })
      .catch(error => {
        console.error(error);
        if (newName && newNumber.length < 10) {
          setMessage({
            message: 'Number is too short. Please enter a valid number.',
            type: 'error'
          });
        } else if (newName && newNumber.length > 11) {
          setMessage({
            message: 'Number is too long. Please enter a valid number.',
            type: 'error'
          });
        } else if (newName.length === 0) {
          setMessage({
            message: 'Please enter a valid name.',
            type: 'error'
          });
        } else if (newNumber.length === 0) {
          setMessage({
            message: 'Please enter a valid number.',
            type: 'error'
          });
        } else {
          setMessage({
            message: 'There was an error updating the person information.',
            type: 'error'
          });
        }
      });
    resetNotification();
    setNewNumber('');
    setNewName('');
  };

  const handleSave = () => {
    setRefresh(true)
  }

  const removePerson = (id, newName) => {
    noteService
      .remove(id)
      .then(removedPerson => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage(
          { message:`Successfully removed!`,
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
    <div className="phoneBookApp">
      <div className="container">
        <div className="row">
            <div className="first-column">
            <Togglable buttonLabel={
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi-bi-person-plus-fill" viewBox="0 0 16 16">
                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg> Add Contact
              </>
              }>
                <AddPerson
                  messageDetails={messageDetails}
                  addName={addName}
                  newName={newName}
                  newNumber={newNumber}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}
                  persons={persons}
                />
              </Togglable>
              <br/><br/>
                <Notification className=".first-column-notification" message={messageDetails.message}
                  type={messageDetails.type} />
            </div>
          <div className="second-column">
            <PhoneBook
              messageDetails={messageDetails}
              newFilter={newFilter} 
              handleFilter={handleFilter}
              persons={filteredPerson}
              remove={removePerson}
              update={updateNumber}
              updatePerson={updatePerson}
              setPersons={setPersons}
              onSave={handleSave}
              setMessage={setMessage}
              />
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
