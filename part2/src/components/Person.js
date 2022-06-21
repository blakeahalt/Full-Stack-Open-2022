import React from 'react'

const Person = ({ persons }) => {
       return (
         <div key={persons.id}>
           {persons.map((person) =>
             <li key={person.id}>{person.name} {person.number} </li>)}
         </div>
       )
     }


export default Person