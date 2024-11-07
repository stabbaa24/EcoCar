// initializeData.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { users, trips, co2Statistics } from './sampleData';

export const initializeData = async () => {
  try {
    // Vérifiez si les données existent déjà
    const existingUsers = await AsyncStorage.getItem('users');
    if (!existingUsers) {
      await AsyncStorage.setItem('users', JSON.stringify(users));
      console.log('Données utilisateurs initialisées.');
    }

    const existingTrips = await AsyncStorage.getItem('trips');
    if (!existingTrips) {
      await AsyncStorage.setItem('trips', JSON.stringify(trips));
      console.log('Données de trajets initialisées.');
    }

    const existingStatistics = await AsyncStorage.getItem('co2Statistics');
    if (!existingStatistics) {
      await AsyncStorage.setItem('co2Statistics', JSON.stringify(co2Statistics));
      console.log('Statistiques CO2 initialisées.');
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des données :', error);
  }
};
