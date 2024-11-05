// navigation/MainNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SearchRideScreen from '../screens/SearchRideScreen';
import ProposeRideScreen from '../screens/ProposeRideScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RidesListScreen from '../screens/RidesListScreen';
import RideDetailsScreen from '../screens/RideDetailsScreen';
import GlobalOverviewScreen from '../screens/GlobalOverviewScreen';
import CitizenEconomyScreen from '../screens/CitizenEconomyScreen';
import CompanyEconomyScreen from '../screens/CompanyEconomyScreen';
import CityEconomyScreen from '../screens/CityEconomyScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Fonction pour la pile Accueil
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

// Fonction pour la pile Global avec des pages pour les économies citoyen, entreprise, et ville
function GlobalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Vue Globale" component={GlobalOverviewScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Économie Citoyen" component={CitizenEconomyScreen} />
      <Stack.Screen name="Économie Entreprise" component={CompanyEconomyScreen} />
      <Stack.Screen name="Économie Ville" component={CityEconomyScreen} />
    </Stack.Navigator>
  );
}

// Fonction pour la pile Liste des trajets
function RidesListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Liste de vos trajets" component={RidesListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Détails du trajet" component={RideDetailsScreen} />
    </Stack.Navigator>
  );
}

// Navigation principale par onglets
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
      <Tab.Screen name="Global" component={GlobalStack} />
      <Tab.Screen name="Liste de vos trajets" component={RidesListStack} />
    </Tab.Navigator>
  );
}
