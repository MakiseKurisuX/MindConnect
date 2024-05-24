import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticatedStack from './authenticated'; 
import UnauthenticatedStack from './unauthenticated'; 

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AuthenticatedStack />
      ) : (
        <UnauthenticatedStack onLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
}