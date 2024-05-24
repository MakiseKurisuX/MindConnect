import React, { useState } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InfobankScreen from './infobank';  
import Chat from './chat';  
import Consult from './consult';  
import StoryScreen from './story';  
import MainScreen from './main';

const Tab = createBottomTabNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconSource;

            if (route.name === 'Home') {
              iconSource = focused
                ? require('../assets/images/AppIcon.png')        // focused
                : require('../assets/images/AppIcon.png');
            } else if (route.name === 'InfoBank') {
              iconSource = focused
                ? require('../assets/images/Info_Bank.png')    // focused
                : require('../assets/images/Info_Bank.png');
            } else if (route.name === 'Chat') {
              iconSource = focused
                ? require('../assets/images/Chat.png')       // focused
                : require('../assets/images/Chat.png');
            } else if (route.name === 'Consult') {
              iconSource = focused
                ? require('../assets/images/Video_Consult.png')       // focused
                : require('../assets/images/Video_Consult.png');
            } else if (route.name === 'Story') {
              iconSource = focused
                ? require('../assets/images/Story.png')       // focused
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
        <Tab.Screen name="Home" component={MainScreen} />
        <Tab.Screen name="InfoBank" component={InfobankScreen} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Consult" component={Consult} />
        <Tab.Screen name="Story" component={StoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}