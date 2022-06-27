import React from 'react'

const Remove = ({ person, remove }) => {
    return (
        <button onClick={() => {
            remove(person.id)
        }}>
            remove
        </button>
    )
}

export default Remove;