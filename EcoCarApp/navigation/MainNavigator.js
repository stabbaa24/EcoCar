// MainNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HistoryScreen from '../screens/HistoryScreen';
import TripDetailsScreen from '../screens/TripDetailsScreen';
import DashboardScreen from '../screens/DashboardScreen'; // Import de la page Dashboard
import DashboardUserScreen from '../screens/DashboardUserScreen';
import DashboardCityScreen from '../screens/DashboardCityScreen';
import DashboardCompanyScreen from '../screens/DashboardCompanyScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Les onglets de navigation (bas de l'écran)
function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="HomeTab">
      <Tab.Screen
        name="Accueil"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Historique des trajets"
        component={HistoryStackNavigator} // Utilisation de la pile HistoryStackNavigator
        options={{
          tabBarLabel: 'Trajets',
          tabBarIcon: ({ color, size }) => (
            <Icon name="car-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen} // Ajout de l'onglet Dashboard
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Icon name="stats-chart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil utilisateur"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Pile pour HistoryScreen incluant TripDetailsScreen
function HistoryStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="TripDetails" 
        component={TripDetailsScreen} 
        options={{ title: ' ' }} 
      />
    </Stack.Navigator>
  );
}

// Les pages du Drawer avec TabNavigator comme contenu principal
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="HomeDrawer">
      <Drawer.Screen name="HomeDrawer" component={TabNavigator} options={{ title: 'EcoCar' }} />
      <Drawer.Screen name="DashboardUser" component={DashboardUserScreen} options={{ title: 'Dashboard Utilisateur' }} />
      <Drawer.Screen name="DashboardCity" component={DashboardCityScreen} options={{ title: 'Dashboard ProgVille' }} />
      <Drawer.Screen name="DashboardCompany" component={DashboardCompanyScreen} options={{ title: 'Dashboard Entreprise' }} />
    </Drawer.Navigator>
  );
}

// Stack principal pour gérer la transition entre Login et Drawer
function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}

export default MainNavigator;
