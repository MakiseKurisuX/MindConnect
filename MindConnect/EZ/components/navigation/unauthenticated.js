// App.js or navigation.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Page from '../../app/register'; 
import Login from '../../app/login'; 

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Page" component={Page} />
      <Drawer.Screen name="AnotherScreen" component={Login} />
    </Drawer.Navigator>
  );
}