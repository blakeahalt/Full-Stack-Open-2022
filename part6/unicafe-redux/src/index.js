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

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'


const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)
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