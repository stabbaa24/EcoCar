import AsyncStorage from '@react-native-async-storage/async-storage';

// Fonction pour sauvegarder des données
export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données', error);
  }
};

// Fonction pour récupérer des données
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    return null;
  }
};

// Fonction pour supprimer des données
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Erreur lors de la suppression des données', error);
  }
};
