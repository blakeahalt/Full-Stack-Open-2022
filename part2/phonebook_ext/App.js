import { useState, useEffect } from 'react';
import Filter from './components/Filter.js'
import noteService from './services/Persons.js'
import AddPerson from './components/AddPerson.js';
import PhoneBook from './components/PhoneBook.js';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  noteService
        .getAll()
        .then(response => {
          setPersons(response)
          // setNewName('');
          // setNewNumber('');
	 })
   
  const addName = (event) => {
    event.preventDefault()
    
    const newPerson = {
      name: newName,
      number: newNumber,
      // id: persons.length,
      deleted: false
    }
    
    const isFound = (persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) 
    
    if (isFound){
      let res = window.confirm(`${newName} already exists. To update a new number, click to confirm.`)
      if (res) {
        updateNumber(isFound.id, newPerson)
      } else {
        setPersons(persons);
        setNewName('');
        setNewNumber('');
      };
    } else {
      setPersons((persons.concat(newPerson)))
    }
  }
  const filteredPerson = !newFilter
  ? persons
  : persons.filter((persons) =>
    persons.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  const updateNumber = (id, newObject) => {
    noteService
      .update(id, newObject)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id ? person : updatedPerson))
        setNewNumber('')
        setNewName('');
        })
      
        .catch(event => {
          alert(`the person was already deleted from server`)
      })
  }
  
  const removePerson = id => {
    noteService
      .remove(id)
      .then(removedPerson => {
        setPersons(persons);
      })
      .catch(event => {
        alert(`the person was already deleted from server`)
      })
  }

  // const searchForPerson = e => {
  //   e.preventDefault();
  //   const searchValue = e.target[0].value;
  //   if (searchValue === '' || searchValue === ' ') {
  //     return
  //   } else {
  //     const filteredResult = persons.filter(person => person.name.includes(searchValue))
  //     setResults(filteredResult);
  //   }
  // }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };
  
  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  };

  // const handleSearchChange = e => {
  //   setSearchValue(e.target.value)
  // }

  // const personDelete = id => {
  //   const deletePersons = persons.find(person => person.id === id)
  //   const deletedPerson = {...persons, deleted: !persons.deleted}

  //   noteService
  //   .update(id, deletedPerson).then(returnedPerson => {
  //     setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
  //   })
  //   .catch((error) => {
  //     alert(
  //       `the person '${deletedPerson.id}' was already deleted from server`
  //     )
  //     setPersons(persons.filter(person => person.id !== id))
  //   })
  // }
  
  
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
      {/* <Form 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
        persons={persons} 
      /> */}

        {/* <Person person={persons}/> */}
        <PhoneBook 
          persons={persons}
          remove={removePerson}
          update={updateNumber} />
        {/* // <FilteredPerson filteredPerson={filteredPerson} remove={removePerson} /> */}

      {/* <FailNotification message={errorMessage} /> */}

    </>
  );
};

export default App
