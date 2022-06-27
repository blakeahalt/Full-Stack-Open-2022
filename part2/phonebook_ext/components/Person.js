// import React from 'react'

// const Person = ({ persons }) => {
// 	return (
// 	<div>
// 		{persons.map((person) => <li key={person.name}>{person.name} {person.number} </li>)}
// 	</div>
// 	)
// }

// export default Person

// import React from 'react'
// import Remove from './Remove.js';

// const Person = ({ person, remove, update,filteredPerson, persons }) => {
//     return (
// 	person.map(person_ => {
// 		return (
// 		<>
// 		<div key={person_.id} style={{ margin: '10px', padding: '5px' }}>	
// 			<li>{person_.name} {person_.number} {""}  
// 				<Remove
// 				person={person}
// 				remove={remove}
// 				update={update}
// 				id={person.id} />
// 			 </li>
// 		</div>
// 		  </>
// 		)}
//    	))
// };

// export default Person;


import React from 'react'
import Remove from './Remove.js';

const Person = ({ person, remove, update }) => {
    return (
            <div key={person.id} style={{ margin: '5px', padding: '5px' }}>
                <span>{person.name}: {person.number} {" "} 
		  <Remove
                    person={person}
                    remove={remove}
                    update={update}
                    id={person.id}
                /> </span>
            </div>
    )
};

export default Person;