import React from 'react'

const Remove = ({ person, remove }) => {
    return (
        <button onClick={() => {
            let res = window.confirm`Are you sure you want to remove this person?`
            if (res) {
                remove(person.id)
            } else {
                return false
            }
        }}>Remove</button>
    )
}

export default Remove;