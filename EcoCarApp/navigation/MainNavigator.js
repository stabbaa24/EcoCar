// navigation/MainNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SearchRideScreen from '../screens/SearchRideScreen';
import ProposeRideScreen from '../screens/ProposeRideScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Fonction pour la pile Home
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Accueil" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Fonction pour la pile Recherche trajet
function SearchRideStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recherche trajet" component={SearchRideScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Fonction pour la pile Proposer un trajet
function ProposeRideStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Proposer un trajet" component={ProposeRideScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Fonction pour la pile Dashboard
function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Navigation par onglets principale
export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'lightgray',
        tabBarStyle: { backgroundColor: '#4CAF50' },
      }}
    >
      <Tab.Screen name="Accueil" component={HomeStack} />
      <Tab.Screen name="Recherche trajet" component={SearchRideStack} />
      <Tab.Screen name="Proposer un trajet" component={ProposeRideStack} />
      <Tab.Screen name="Dashboard" component={DashboardStack} />
    </Tab.Navigator>
  );
}
