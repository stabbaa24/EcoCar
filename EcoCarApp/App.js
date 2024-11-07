// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import LoginScreen from './screens/LoginScreen';
import { initializeData } from './utils/initializeData';
import { getUserSession } from './utils/storage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      await initializeData();
      const user = await getUserSession();
      setIsLoggedIn(!!user);
    };
    checkSession();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true); // Met à jour l'état de connexion
  };

  return (
    <NavigationContainer theme={DefaultTheme}>
      {isLoggedIn ? (
        <MainNavigator />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
}
