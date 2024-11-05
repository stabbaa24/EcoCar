// screens/ProposeRideScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import axios from 'axios';

export default function ProposeRideScreen() {
  const [startAddress, setStartAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [startCoords, setStartCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const fetchCoordinates = async (address, setCoordCallback) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoordCallback({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
      } else {
        alert('Adresse introuvable.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRoute = async () => {
    if (startCoords && destinationCoords) {
      try {
        const apiKey = '5b3ce3597851110001cf6248dca0cadd757448c0a7c58f8ae090c5fc'; // Remplacez par votre clé API OpenRouteService
        const response = await axios.post(
          `https://api.openrouteservice.org/v2/directions/driving-car`,
          {
            coordinates: [
              [startCoords.longitude, startCoords.latitude],
              [destinationCoords.longitude, destinationCoords.latitude],
            ],
          },
          {
            headers: {
              Authorization: apiKey,
              'Content-Type': 'application/json',
            },
          }
        );

        const route = response.data.features[0];
        const coords = route.geometry.coordinates.map(([lon, lat]) => ({
          latitude: lat,
          longitude: lon,
        }));

        setRouteCoords(coords);
        setDistance((route.properties.segments[0].distance / 1000).toFixed(2)); // en km
        setDuration((route.properties.segments[0].duration / 60).toFixed(0)); // en minutes
      } catch (error) {
        console.error(error);
        alert("Erreur lors du calcul du trajet.");
      }
    } else {
      alert("Veuillez entrer les adresses de départ et de destination.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Proposer un Trajet</Text>

      {/* Recherche de l'adresse de départ */}
      <TextInput
        style={styles.input}
        placeholder="Adresse de départ"
        value={startAddress}
        onChangeText={setStartAddress}
        onBlur={() => fetchCoordinates(startAddress, setStartCoords)}
      />

      {/* Recherche de l'adresse de destination */}
      <TextInput
        style={styles.input}
        placeholder="Adresse de destination"
        value={destinationAddress}
        onChangeText={setDestinationAddress}
        onBlur={() => fetchCoordinates(destinationAddress, setDestinationCoords)}
      />

      {/* Bouton pour calculer le trajet */}
      <Button title="Calculer le Trajet" onPress={fetchRoute} />

      {/* Affichage des informations du trajet */}
      {distance && duration && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Distance : {distance} km</Text>
          <Text style={styles.infoText}>Durée : {duration} min</Text>
        </View>
      )}

      {/* Carte avec le trajet et les marqueurs */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {startCoords && <Marker coordinate={startCoords} title="Départ" />}
        {destinationCoords && <Marker coordinate={destinationCoords} title="Destination" />}
        {routeCoords.length > 0 && <Polyline coordinates={routeCoords} strokeColor="#4CAF50" strokeWidth={4} />}
      </MapView>

      {/* Bouton pour soumettre le trajet */}
      <Button title="Proposer ce Trajet" onPress={() => alert("Trajet proposé avec succès!")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  infoContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginVertical: 20,
  },
});
