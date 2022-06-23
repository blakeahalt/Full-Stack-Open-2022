import React from 'react'

const Filter = ({ newFilter, handleFilter }) => {
	return(
		<div>
			Filter persons:{" "}
			<input type="text" value={newFilter} onChange={handleFilter} />
		</div>
	)
}

export default Filter 