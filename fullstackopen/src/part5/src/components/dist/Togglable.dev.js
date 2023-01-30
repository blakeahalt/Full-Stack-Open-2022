// import { useState, forwardRef, useImperativeHandle } from 'react'
// import PropTypes from 'prop-types'
// const Togglable = forwardRef((props, refs) => {
//   const [visible, setVisible] = useState(false)
//   const hideWhenVisible = { display: visible ? 'none' : '' }
//   const showWhenVisible = { display: visible ? '' : 'none' }
//   const toggleVisibility = () => {
//     setVisible(!visible)
//   }
//   useImperativeHandle(refs, () => {
//     return {
//       toggleVisibility
//     }
//   })
//   Togglable.propTypes = {
//     buttonLabel: PropTypes.string.isRequired
//   }
//   Togglable.displayName = 'Togglable'
//   return (
//     <div>
//       <div style={hideWhenVisible}>
//         <button onClick={toggleVisibility}>{props.buttonLabel}</button>
//       </div>
//       <div style={showWhenVisible} className='togglableContent'>
//         {props.children}
//         <button onClick={toggleVisibility}>cancel</button>
//       </div>
//     </div>
//   )
// })
// export default Togglable
// // import { useState } from 'react'
// // const Togglable = (props) => {
// //   const [visible, setVisible] = useState(false)
// //   const hideWhenVisible = { display: visible ? 'none' : '' }
// //   const showWhenVisible = { display: visible ? '' : 'none' }
// //   const toggleVisibility = () => {
// //     setVisible(!visible)
// //   }
// //   return (
// //     <div>
// //       <div style={hideWhenVisible}>
// //         <button onClick={toggleVisibility}>{props.buttonLabel}</button>
// //       </div>
// //       <div style={showWhenVisible}>
// //         {props.children}
// //         <button onClick={toggleVisibility}>cancel</button>
// //       </div>
// //     </div>
// //   )
// // }
// // export default Togglable
"use strict";