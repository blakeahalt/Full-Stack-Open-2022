import React from 'react'

const Notification = ({ message, type }) => {
	if (message == null) {
		return null;
	}

       return (
              <div style={{ marginRight: '30px' }} className={`message ${type}`}>{message}</div>
       )
};

export default Notification