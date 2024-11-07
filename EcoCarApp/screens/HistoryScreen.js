// HistoryScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { trips } from '../utils/sampleData'; // Importez les données des trajets pour les tests

const HistoryScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, item.role === 'conducteur' ? styles.driverCard : styles.passengerCard]}
      onPress={() => navigation.navigate('TripDetails', { trip: item })}
    >
      <Text style={styles.cardText}>
        Date : {item.date}
      </Text>
      <Text style={styles.cardText}>
        Distance : {item.distance} km
      </Text>
      <Text style={styles.cardText}>
        Lieu de départ : {item.startLocation}
      </Text>
      <Text style={styles.cardText}>
        Lieu d'arrivée : {item.endLocation}
      </Text>
      <Text style={styles.cardText}>
        Rôle : {item.role === 'conducteur' ? 'Conducteur' : 'Passager'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.date + item.userId}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fond blanc
    padding: 20,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  driverCard: {
    backgroundColor: '#FFD700', // Jaune pour les conducteurs
  },
  passengerCard: {
    backgroundColor: '#D8BFD8', // Violet pour les passagers
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HistoryScreen;
