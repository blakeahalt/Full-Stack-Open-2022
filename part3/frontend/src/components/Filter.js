import React from 'react'

const Filter = ({ newFilter, handleFilter }) => {
	return(
		<div className='filter'>
			<input 
			placeholder='Search'
			type="text" 
			value={newFilter} 
			onChange={handleFilter} />
		</div>
	)
}

export default Filter