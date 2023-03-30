// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createStore } from "redux";
// import reducer from "./reducer";

// const store = createStore(reducer);

// const App = () => {
//   const handleClick = (type) => {
//     store.dispatch({ type });
//   };

//   return (
//     <div>
//       <button onClick={() => handleClick("GOOD")}>good</button>
//       <button onClick={() => handleClick("OK")}>ok</button>
//       <button onClick={() => handleClick("BAD")}>bad</button>
//       <button onClick={() => handleClick("ZERO")}>reset stats</button>
//       <div>good {store.getState().good}</div>
//       <div>ok {store.getState().ok}</div>
//       <div>bad {store.getState().bad}</div>
//     </div>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById("root"));
// const renderApp = () => {
//   root.render(<App />);
// };

// renderApp();
// store.subscribe(renderApp);


import React from 'react'
import ReactDOM from 'react-dom/client'

// import { createStore, combineReducers } from 'redux'   //don't need when we use configureStore
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'

import noteService from './services/notes'
import noteReducer, { setNotes } from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

noteService.getAll().then(notes =>
    store.dispatch(setNotes(notes))
  )

console.log(store.getState())

store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange('IMPORTANT'))
// store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <div />
//   </Provider>
// )