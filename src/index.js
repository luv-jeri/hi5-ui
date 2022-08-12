import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { NavigationProgress } from '@mantine/nprogress';
import App from './App';

import { AuthContextProvider } from './context/Auth.context';

import { BrowserRouter as Router } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Theme } from './components/wrappers/config/Theme';
import axios from 'axios';
import { ProfileModalProvider } from './components/wrappers/modals/profile/Profile';
import { CustomizationModalProvider } from './components/wrappers/modals/customization/Customization';

import { AddFriendModalProvider } from './components/wrappers/modals/AddFriends';
axios.defaults.baseURL = 'http://localhost:8000/api/v1/';

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Theme>
        <NavigationProgress size={5} exitTransitionDuration={1000} />
        <NotificationsProvider>
          <Router>
            <CustomizationModalProvider>
              <ProfileModalProvider>
                <AddFriendModalProvider>
                  <App />
                </AddFriendModalProvider>
              </ProfileModalProvider>
            </CustomizationModalProvider>
          </Router>
        </NotificationsProvider>
      </Theme>
    </AuthContextProvider>
  </React.StrictMode>
);
