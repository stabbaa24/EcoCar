// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserSession = async (user) => {
  try {
    await AsyncStorage.setItem('userSession', JSON.stringify(user));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la session utilisateur', error);
  }
};

export const getUserSession = async () => {
  try {
    const user = await AsyncStorage.getItem('userSession');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Erreur lors de la récupération de la session utilisateur', error);
    return null;
  }
};

export const clearUserSession = async () => {
  try {
    await AsyncStorage.removeItem('userSession');
  } catch (error) {
    console.error('Erreur lors de la suppression de la session utilisateur', error);
  }
};