import { useState } from 'react';
import Form from './components/Form.js';
import Person from './components/Person.js'
import Filter from './components/Filter.js'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Blake', number: '5082999373', id: '0'},
    {name: 'Steve', number: '2342004234', id: '1'},
    {name: 'Mary', number: '3234242525', id: '2'}
  ])
  
  const [newName, setNewName] = useState()
  console.log(newName)
  
  const [newNumber, setNewNumber] = useState()
  console.log(newNumber)
  
  const [newFilter, setNewFilter] = useState()
  console.log(newFilter)



  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };
  
  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  };
  
  const addName = (event) => {
    event.preventDefault()
    
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length
    };
    
    const isFound = (persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) 
    
    if (isFound){
      window.alert(`${newName} already exists!`);
      
    } else {
      setPersons((persons.concat(newPerson)))
    }
    
    console.log("persons", persons)
    console.log("newName", newName)
    setNewName('')
    setNewNumber('')
  }
  
  const filteredPerson = !newFilter
      ? persons
      : persons.filter((persons) =>
        persons.name.toLowerCase().includes(newFilter.toLowerCase())
      );
  
  return (
    <>
      <h2>Phonebook</h2>
      <div>
        <Filter newFilter={newFilter} handleFilter={handleFilter} />
      </div>

      <h2>Add a new</h2>

      <Form 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
        persons={persons} 
      />

      <h2>Numbers</h2>
      
      <Person filteredPerson={filteredPerson}/>
    </>
  );
};

export default App
