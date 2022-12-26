import React from 'react'

const Filter = ({ newFilter, handleFilter }) => {
	return(
		<div>
			Filter People:{" "}
			<input 
				type="text" 
				value={newFilter} 
				onChange={handleFilter} />
		</div>
	)
}

export default Filter
