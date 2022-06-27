import React from 'react'
import Remove from './Remove.js'

const FilteredPerson = ({ filteredPerson, person_, remove, update }) => {
	return (
       filteredPerson.map(person => {
              return( 
              <>
              <div key={person.id} style={{ margin: '5px', padding: '5px' }}>
                     <span>{person.name} {person.number} {""}  
                    <Remove
                     person_={person_}
                     remove={remove}
                     update={update}
                     id={person.id} /> 
                     </span>
              </div>
              </>
              )}
       ))
}

export default FilteredPerson


// const FilteredPerson = ({ newFilter, handleFilter }) => {
// 	return(
// 		<div>
// 			Filter persons:{" "}
// 			<input type="text" value={newFilter} onChange={handleFilter} />
// 		</div>
// 	)
// }

// export default FilteredPerson