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

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NotificationContextProvider } from './NotificationContext';

import App from './App';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>,
);