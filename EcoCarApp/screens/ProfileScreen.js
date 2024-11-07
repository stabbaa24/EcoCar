// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getUserSession, clearUserSession } from '../utils/storage';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const sessionUser = await getUserSession();
      setUser(sessionUser);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await clearUserSession();
    navigation.navigate('Login'); // Redirige vers la page de connexion
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E8B57" />
        <Text style={styles.loadingText}>Chargement des informations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Utilisateur</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nom :</Text>
        <Text style={styles.value}>{user.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Rôle :</Text>
        <Text style={styles.value}>{user.role}</Text>
      </View>
      {user.company && (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Entreprise :</Text>
          <Text style={styles.value}>{user.company}</Text>
        </View>
      )}
      {user.vehicle && (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Véhicule :</Text>
            <Text style={styles.value}>{user.vehicle.brand}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Type de carburant :</Text>
            <Text style={styles.value}>{user.vehicle.fuelType}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Modèle :</Text>
            <Text style={styles.value}>{user.vehicle.model}</Text>
          </View>
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFF0', // Vert très clair
    padding: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0FFF0',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555555',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E8B57', // Vert foncé
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2E8B57',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  value: {
    fontSize: 16,
    color: '#333333', // Noir
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#2E8B57', // Vert foncé
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#FFFFFF', // Blanc
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
