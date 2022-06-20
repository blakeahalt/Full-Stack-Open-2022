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
      <li>{person.name} {person.number}</li> 
    </div>
  );
};


const App = () => {
  const [persons, setPersons] = useState([{
    name: 'Arto Hellas',
    number: '040-123456',
    id: []
    }]) 
  
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length
      }
      
      // if ({persons} === {newName}) {
      //     alert(`${newName} already exists!`)
      // } else {
        // newPerson.name: newName;
        // if (persons.map(person => person.name === newName)) {
        //     alert(`message`)
        // } else {
        //   const newPerson = { name: newName }
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

// window.alert("Warning!!");
  
return (
  <div>
      <h1>Phonebook</h1>
      <div>filter: <input value={''} onChange={handleFilterChange} /></div>
      
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


const Person = ({ persons }) => {
  return (
    <div key={persons.name}>
      {persons.map((person) =>
        <li>{person.name} {person.number} </li>)}
    </div>
  )
}

// const PersonList = ({persons, newName}) => {
//   <div key={persons.name}>
//   {persons += persons.concat(newName)}
//   </div>
// }

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState()
  const [newNumber, setNewNumber] = useState('')
  // if(persons.includes(newName)) {
  //     alert(`${newName} already exists`)
  // }
  // const filtered = persons.filter(obj => {
  //   if (obj.persons === newName) {
  //     return(
  //       alert(`${newName} already exists`)
  //     )
  //   } else {
  //     return persons.name === newName;
  //   }
  // });
  const [filter, setNewFilter] = useState('')


  const addName = (event) => {
    event.preventDefault()

    console.log("newPerson", newPerson)
    console.log("persons", persons)
    console.log("newName", newName)
    setNewName('')
    setNewNumber('')
  }
  const newPerson = {
    name: newName,
    number: newNumber,
    id: persons.length + 1
  }
  // const includes = persons.filter(objName => {
  //   objName.name = newPerson 
  //   console.log(objName.name)
  // })
  // console.log("includes", includes)

  // if (includes) {
  //   alert(`${newName} already exists`)
  // } else { 
  //   // persons.name = newName
  //   newPerson.name = newName

  // if ({persons} === {newName}) {
  //     alert(`${newName} already exists!`)
  // } else {
  // newPerson.name: newName;
  // if (persons.map(person => person.name === newName)) {
  //     alert(`message`)
  // } else {
  //   const newPerson = { name: newName }
  // setPersons()

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  };

  // const includes = persons.filter(obj => {
  //   obj.persons = newName
  // })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

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

  // window.alert("Warning!!");

  return (
    <div>
      <h1>Phonebook</h1>
      {/* {personsList} */}
      <div>filter: <input value={''} onChange={handleFilterChange} /></div>

      {/* <div>
        <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all' }
        </button>
      </div> */}
      <h1>add a new</h1>
      {/* {includes} */}
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <button type="submit" onClick={() => setPersons((persons.concat(newPerson)))}>add</button>
      </form>

      <h1>Numbers</h1>
      <div key={persons.name}>
        <Person persons={persons} />
      </div>
      <div>
        {/* <PersonList persons={persons} newName={newName}>{persons}</PersonList> */}
      </div>

      {/* <div key={persons.id}>
        {persons.map((copy => {
          return(
            <><div>{copy.name} {copy.number} {copy.id}</div> 
            <div>{copy.every}</div></>
            );
          }))}
      </div> */}
    </div>
  )
  console.log("persons", persons)

}

export default App
