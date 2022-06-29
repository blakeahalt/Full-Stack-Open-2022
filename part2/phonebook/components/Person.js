import React from 'react'
import Remove from './Remove.js';

const Person = ({ person, remove, update }) => {
    return (
            <div key={person.id} accessor="name" style={{ margin: '5px', padding: '5px' }}>
                <table>
                    <tbody>
                        <tr key={person.name}>
                            <td>{person.name}</td>
                            <td>{person.number}</td>
                            <td><Remove
                                person={person}
                                remove={remove}
                                update={update}
                                id={person.id}/>
                            </td>
                        </tr>
                    </tbody>

                </table>

            </div>
    )
};

export default Person;