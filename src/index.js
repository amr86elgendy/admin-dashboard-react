import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/auth';
import { GlobalProvider } from './context/global';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL + '/api';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <App />
          </Router>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </GlobalProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
