import React, { useContext } from 'react';
import { Image, Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';

import InfobankScreen from './infobank';
import Chat from './chat';
import Consult from './consult';
import Quotes from './quotes';
import Login from './login';
import Register from './register';
import Main from './main';
import EntryDetail from './EntryDetail';
import ChatPage from './ChatPage';
import SignUpPeer from './SignUpPeer';
import SignUpCounseller from './SignUpCounseller';
import VideoCall from './videoCall';
import WaitPage from './wait';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('../assets/images/AppIcon.png');
          } else if (route.name === 'InfoBank') {
            iconSource = require('../assets/images/Info_Bank.png');
          } else if (route.name === 'Chat') {
            iconSource = require('../assets/images/Chat.png');
          } else if (route.name === 'Consult') {
            iconSource = require('../assets/images/Video_Consult.png');
          } else if (route.name === 'Quotes') {
            iconSource = require('../assets/images/Story.png');
          }

          return <Image source={iconSource} style={{ width: size, height: size }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="InfoBank" component={InfobankScreen} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Consult" component={Consult} />
      <Tab.Screen name="Quotes" component={Quotes} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen 
              name="AppTabs" 
              component={AppTabs} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="EntryDetail"
              component={EntryDetail}
              options={{ title: 'Entry Detail' }}
            />
            <Stack.Screen
              name='ChatPage'
              component={ChatPage}
              options={{ title: 'Chat' }} />
            <Stack.Screen
              name='SignUpPeer'
              component={SignUpPeer}
              options={{ title: 'Sign Up As a Peer' }} />
            <Stack.Screen
              name='SignUpCounseller'
              component={SignUpCounseller}
              options={{ title: 'Sign Up As a Counsellor' }} />
            <Stack.Screen
              name='WaitPage'
              component={WaitPage}
              options={{ title: 'Waiting Room' }} />
            <Stack.Screen
              name='VideoCall'
              component={VideoCall}
              options={{ title: 'Video Consultation' }} />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="Login"
              component={Login}
              options={{ title: 'Login' }}
            />
            <Stack.Screen 
              name="Register"
              component={Register}
              options={{ title: 'Register' }}
            />
          </>
        )}
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}