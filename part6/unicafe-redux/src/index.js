// *index.js for Part6(A-C)
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux'
// import App from './App'
// import store from './store'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )

// ====================================== //

// *index.js for Part6D

import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'


import App from './App6D'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
