// screens/RideDetailsScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function RideDetailsScreen({ route }) {
  const { ride } = route.params;

  // Données pour les calculs
  const CO2_PER_KM_PETROL = 0.12; // kg de CO2 par km pour une voiture classique
  const CO2_PER_KM_ELECTRIC = 0.02; // kg de CO2 par km pour une voiture électrique (hypothèse)

  // Comparaison entre la voiture utilisée et la voiture non utilisée
  const co2Savings = ride.fuelType === 'Électrique'
    ? (ride.distance * CO2_PER_KM_PETROL - ride.distance * CO2_PER_KM_ELECTRIC).toFixed(2)
    : (ride.distance * CO2_PER_KM_PETROL).toFixed(2); // Économies de CO2 en kg

  const fuelSavings = (ride.distance * 0.06).toFixed(2); // litres de carburant économisés pour une voiture thermique
  const treeEquivalent = (co2Savings / 22).toFixed(2); // équivalent en arbres sauvés
  const timeSaved = (ride.distance / 30 * 60).toFixed(0); // temps de trajet en minutes (hypothèse de 30 km/h de moyenne)

  return (
    <ScrollView style={styles.container}>

      {/* Carte avec marqueurs pour le point de départ et d'arrivée */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={{ latitude: 48.8566, longitude: 2.3522 }} title="Départ" />
        <Marker coordinate={{ latitude: 48.857, longitude: 2.353 }} title="Destination" />
      </MapView>

      {/* Informations sur le trajet */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Heure de départ : {ride.departureTime}</Text>
        <Text style={styles.infoText}>Distance parcourue : {ride.distance} km</Text>
        <Text style={styles.infoText}>Temps estimé de trajet : {timeSaved} min</Text>
      </View>

      {/* Comparaison des voitures */}
      <Text style={styles.sectionTitle}>Comparaison des Véhicules</Text>
      <View style={styles.comparisonContainer}>
        <View style={styles.vehicleBox}>
          <Text style={styles.vehicleTitle}>Véhicule Utilisé</Text>
          <Text>Type : {ride.carType}</Text>
          <Text>Carburant : {ride.fuelType}</Text>
          <Text>CO₂ émis par km : {ride.fuelType === 'Électrique' ? CO2_PER_KM_ELECTRIC : CO2_PER_KM_PETROL} kg</Text>
        </View>

        <View style={styles.vehicleBox}>
          <Text style={styles.vehicleTitle}>Votre Véhicule (Non Utilisé)</Text>
          <Text>Type : Renault Clio (Exemple)</Text>
          <Text>Carburant : Essence</Text>
          <Text>CO₂ émis par km : {CO2_PER_KM_PETROL} kg</Text>
        </View>
      </View>

      {/* Explications sur les économies réalisées */}
      <Text style={styles.sectionTitle}>Économies réalisées</Text>
      <View style={styles.savingsContainer}>
        <Text style={styles.savingsText}>
          En utilisant le covoiturage et la voiture électrique plutôt qu'une voiture thermique, vous avez économisé :
        </Text>
        <Text style={styles.savingsText}>• CO₂ évité : {co2Savings} kg</Text>
        <Text style={styles.savingsText}>• Carburant économisé : {fuelSavings} litres</Text>
        <Text style={styles.savingsText}>• Temps de trajet estimé : {timeSaved} minutes</Text>
        <Text style={styles.savingsText}>
          Ces économies représentent l'équivalent en absorption de CO₂ de {treeEquivalent} arbres sur un an.
        </Text>
      </View>

      {/* Explications des calculs */}
      <Text style={styles.sectionTitle}>Explications des calculs</Text>
      <View style={styles.explanationContainer}>
        <Text style={styles.explanationText}>
          • <Text style={styles.bold}>CO₂ par km</Text> : Nous avons utilisé une moyenne de 0,12 kg de CO₂/km pour les voitures thermiques
          (essence) et de 0,02 kg de CO₂/km pour les voitures électriques.
        </Text>
        <Text style={styles.explanationText}>
          • <Text style={styles.bold}>Carburant économisé</Text> : Estimé en supposant une consommation de 0,06 litre/km pour les voitures thermiques.
        </Text>
        <Text style={styles.explanationText}>
          • <Text style={styles.bold}>Équivalent en arbres</Text> : Basé sur une absorption de 22 kg de CO₂ par an par arbre.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 10,
  },
  comparisonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  vehicleBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  vehicleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  savingsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  savingsText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  explanationContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  explanationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});
