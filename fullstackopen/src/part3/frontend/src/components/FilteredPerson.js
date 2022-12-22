import React from 'react'
import Remove from './Remove.js'

const FilteredPerson = ({ persons, remove, update }) =>  (
       <div>
          {persons.map(person => {
              return( 
              <div key={person.id} style={{ margin: '5px', padding: '5px' }}>
                <span>skat {person.name}: {person.number} {" "} 
		  <Remove
                     person={person}
                     remove={remove}
                     update={update}
                     id={person.id} /> 
                     </span>
                     </div>
              )}
       )}
       </div>
              )

export default FilteredPerson
