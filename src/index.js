import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

import { AuthContextProvider } from './context/Auth.context';

import { BrowserRouter as Router } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api/v1/';

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <Router>
            <App />
          </Router>
        </NotificationsProvider>
      </MantineProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
