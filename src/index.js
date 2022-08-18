import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import { BrowserRouter as Router } from 'react-router-dom';

import { AuthContextProvider } from './context/Auth.context';
import { RequestProvider } from './context/Request.context';
import { FriendProvider } from './context/Friends.context';
import { NotificationsProvider } from '@mantine/notifications';

import { Theme } from './components/wrappers/config/Theme';
import { ProfileModalProvider } from './components/wrappers/modals/profile/Profile';
import { CustomizationModalProvider } from './components/wrappers/modals/customization/Customization';
import { AddFriendModalProvider } from './components/wrappers/modals/addFriend/AddFriends';

import { NavigationProgress } from '@mantine/nprogress';

import App from './App';

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
            <RequestProvider>
              <FriendProvider>
                <CustomizationModalProvider>
                  <ProfileModalProvider>
                    <AddFriendModalProvider>
                      <App />
                    </AddFriendModalProvider>
                  </ProfileModalProvider>
                </CustomizationModalProvider>
              </FriendProvider>
            </RequestProvider>
          </Router>
        </NotificationsProvider>
      </Theme>
    </AuthContextProvider>
  </React.StrictMode>
);
