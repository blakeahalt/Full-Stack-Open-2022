const Notification = ({ errorMessage, successMessage }) => {

    // if (errorMessage && successMessage === null) {
    //   return null
    // } else if (errorMessage) {
    if (errorMessage) {
      return (
        <div style={{marginBottom: 20}} className="error">
          {errorMessage}
        </div>
      )
    } else if (successMessage) {
      return (
        <div style={{marginBottom: 20}} className="success">
          {successMessage}
        </div>
    )
  }
}
  
  export default Notification