import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HistoryScreen from '../screens/HistoryScreen';
import DashboardUserScreen from '../screens/DashboardUserScreen';
import DashboardCityScreen from '../screens/DashboardCityScreen';
import DashboardCompanyScreen from '../screens/DashboardCompanyScreen';
import LoginScreen from '../screens/LoginScreen';
import Icon from 'react-native-vector-icons/Ionicons'; // Assure d'installer react-native-vector-icons pour les icônes

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'Trajets',
          tabBarIcon: ({ color, size }) => (
            <Icon name="car-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
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

function MainNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Tabs">
      <Drawer.Screen name="Tabs" component={TabNavigator} options={{ title: 'EcoCar' }} />
      <Drawer.Screen name="DashboardUser" component={DashboardUserScreen} options={{ title: 'Dashboard Utilisateur' }} />
      <Drawer.Screen name="DashboardCity" component={DashboardCityScreen} options={{ title: 'Dashboard ProgVille' }} />
      <Drawer.Screen name="DashboardCompany" component={DashboardCompanyScreen} options={{ title: 'Dashboard Entreprise' }} />
    </Drawer.Navigator>
  );
}

export default MainNavigator;
