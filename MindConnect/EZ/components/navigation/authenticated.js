import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Chat from '../../app/register'; 
import Consult from '../../app/login'; 

const Drawer = createDrawerNavigator();

export default function AuthenticatedStack() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Chat" component={Chat} />
      <Drawer.Screen name="Consult" component={Consult} />
    </Drawer.Navigator>
  );
}