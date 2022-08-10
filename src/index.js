import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { NavigationProgress } from '@mantine/nprogress';
import App from './App';

import { AuthContextProvider } from './context/Auth.context';

import { BrowserRouter as Router } from 'react-router-dom';
import { MantineProvider, Button } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import axios from 'axios';
import { ProfileModalProvider } from './components/modals/profile/Profile';

axios.defaults.baseURL = 'http://localhost:8000/api/v1/';

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MantineProvider
        theme={{
          colorScheme: 'dark',
          fontFamily: 'Poppins, sans-serif',
          fontFamilyMonospace: 'Poppins, Courier, monospace',
          headings: { fontFamily: 'Poppins, sans-serif' },
          colors: {
            'ocean-blue': [
              '#7AD1DD',
              '#5FCCDB',
              '#44CADC',
              '#2AC9DE',
              '#1AC2D9',
              '#11B7CD',
              '#09ADC3',
              '#0E99AC',
              '#128797',
              '#147885',
            ],
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NavigationProgress size={5} exitTransitionDuration={1000}/>
        <NotificationsProvider>
          <Router>
            <ProfileModalProvider>
              <App />
            </ProfileModalProvider>
          </Router>
        </NotificationsProvider>
      </MantineProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
