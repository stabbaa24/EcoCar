import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import { initializeData } from './utils/initializeData';

export default function App() {
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <NavigationContainer theme={DefaultTheme}>
      <MainNavigator />
    </NavigationContainer>
  );
}
