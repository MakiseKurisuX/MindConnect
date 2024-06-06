/*import react from 'react';
import { Image, Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, AuthContext } from '../contexts/AuthContext';

// Import your screens
import InfobankScreen from './infobank';
import Chat from './chat';
import Consult from './consult';
import StoryScreen from './story';
import Login from './login';
import Register from './register';
import Main from './main';
import EntryDetail from './EntryDetail';
//import { Main } from 'next/document';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? require('../assets/images/AppIcon.png')
              : require('../assets/images/AppIcon.png');
          } else if (route.name === 'InfoBank') {
            iconSource = focused
              ? require('../assets/images/Info_Bank.png')
              : require('../assets/images/Info_Bank.png');
          } else if (route.name === 'Chat') {
            iconSource = focused
              ? require('../assets/images/Chat.png')
              : require('../assets/images/Chat.png');
          } else if (route.name === 'Consult') {
            iconSource = focused
              ? require('../assets/images/Video_Consult.png')
              : require('../assets/images/Video_Consult.png');
          } else if (route.name === 'Story') {
            iconSource = focused
              ? require('../assets/images/Story.png')
              : require('../assets/images/Story.png');
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
      <Tab.Screen name="Story" component={StoryScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen 
          name="AppTabs" 
          component={AppTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register"
          component={Register} 
          options={{ title: 'Register' }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="EntryDetail"
          component={EntryDetail}
          options={{ title: 'Entry Detail' }}
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});*/

import React, { useContext } from 'react';
import { Image, Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';

import InfobankScreen from './infobank';
import Chat from './chat';
import Consult from './consult';
import StoryScreen from './story';
import Login from './login';
import Register from './register';
import Main from './main';
import EntryDetail from './EntryDetail';
import ChatList from '../components/chat/chatlist';
import ChatPage from '../components/chat/chatpage';

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
          } else if (route.name === 'Story') {
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
      <Tab.Screen name="Story" component={StoryScreen} />
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
            <Stack.Screen name='ChatList' component={ChatList} options={{ title: 'Chats' }} />
            <Stack.Screen name='ChatPage' component={ChatPage} options={{ title: 'Chat' }} />
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