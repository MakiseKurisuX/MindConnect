import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginPage from '../components/login/loginPage';

export default function Login() {
  return (
    <PaperProvider>
      <LoginPage />
    </PaperProvider>
  );
}
