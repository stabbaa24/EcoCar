// screens/RidesListScreen.js

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const sampleRides = [
  {
    id: '1',
    startLocation: 'Place de la République, ProgVille',
    endLocation: 'Centre Commercial, ProgVille',
    departureTime: '09:00',
    distance: 12.5,
    carType: 'Renault Zoe',
    fuelType: 'Électrique',
    passengers: 3,
  },
  {
    id: '2',
    startLocation: 'Gare de ProgVille',
    endLocation: 'Parc des expositions, ProgVille',
    departureTime: '15:30',
    distance: 8.2,
    carType: 'Peugeot 208',
    fuelType: 'Diesel',
    passengers: 4,
  },
  // Ajoutez plus de trajets ici pour le test
];

export default function RidesListScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.rideCard}
      onPress={() => navigation.navigate('Détails du trajet', { ride: item })}
    >
      <Text style={styles.rideTitle}>{`${item.startLocation} → ${item.endLocation}`}</Text>
      <Text>Heure de départ : {item.departureTime}</Text>
      <Text>Distance : {item.distance} km</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sampleRides}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  rideCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  rideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
});
