import { useState } from 'react'

// const App = () => {
//   const [persons, setPersons] = useState([
//     { name: 'Arto Hellas' }
//   ]) 
  
//   const [newName, setNewName] = useState('')
  
//   const addName = (event) => {
//     event.preventDefault()
//     console.log('clicked addName', event.target)
//     const currentPerson = persons.filter((person) => person.name === newName.name);
    
  
//   const handleNameChange = (event) => {
//     setNewName(event.target.value);
//   }
  
//   function nameAdd() {
//     persons([newName, ...names]);
//     setNewName('');
//   }

//   const Person = ({persons}) => 
//       {persons.map((person => {
//         return(
//         <li key={person.name}>{person}</li>
//       )}
//       ))
//     }  
  

const Person = ({person}) => {
  return(
    <div key={person.id}>
      <li>{person.name} {person.number} {person.id}</li> 
    </div>
  );
};


const App = () => {
  const [persons, setPersons] = useState([{
    name: 'Arto Hellas',
    number: '040-123456',
    id: ['']
    }]) 
  
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: newPersons.id
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }

    const handleFilterChange = (event) => {
      setNewFilter(event.target.value)
    };
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    };

    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    };

    // const handleNumberChange = (event) => {
    //   console.log(event.target.value)
    //   setNewNumber(event.target.value)
    // }

    // const notesToShow = showAll
    // ? notes
    // : notes.filter(note => note.important === true)

    // const result = condition ? val1 : val2
    // notes.filter(note => note.important)

    // show {showAll ? 'important' : 'all'}
    // () => setShowAll(!showAll)
//   persons.map(person =>
//       <li key={person.name}>{person}</li>
// )

  return (
    <div>
      <h1>Phonebook</h1>
      <div>filter: <input value={null} onChange={handleFilterChange} /></div>
      {/* <div>
        <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all' }
        </button>
      </div> */}
      <h1>add a new</h1>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <button type="submit">add</button>
      </form>   

      <h1>Numbers</h1>
      <div key={persons.name}>
        {persons.map((person) =>
          <Person person={person} />
        )}
      </div>
    </div>
  )
}


export default App
