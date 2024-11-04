// navigation/MainNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
      <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Carte et Trajets' }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Tableau de Bord' }} />
    </Stack.Navigator>
  );
}
