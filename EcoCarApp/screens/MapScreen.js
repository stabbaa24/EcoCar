// screens/MapScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default function MapScreen() {
  const [location, setLocation] = useState(null); // Position actuelle
  const [destination, setDestination] = useState(null); // Position de destination
  const [locationText, setLocationText] = useState('');
  const [destinationText, setDestinationText] = useState('');
  const [distance, setDistance] = useState(null);

  const fetchCoordinates = async (address, setCoord) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoord({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
      } else {
        alert('Adresse introuvable.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateDistance = () => {
    if (location && destination) {
      const rad = (x) => (x * Math.PI) / 180;
      const R = 6371; // Rayon de la Terre en km
      const dLat = rad(destination.latitude - location.latitude);
      const dLon = rad(destination.longitude - location.longitude);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(location.latitude)) *
          Math.cos(rad(destination.latitude)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      setDistance(R * c);
    } else {
      alert('Veuillez saisir les deux adresses.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {location && <Marker coordinate={location} title="Lieu actuel" />}
        {destination && <Marker coordinate={destination} title="Destination" />}
      </MapView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Lieu actuel"
          value={locationText}
          onChangeText={setLocationText}
        />
        <Button
          title="Rechercher"
          onPress={() => fetchCoordinates(locationText, setLocation)}
        />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Destination"
          value={destinationText}
          onChangeText={setDestinationText}
        />
        <Button
          title="Rechercher"
          onPress={() => fetchCoordinates(destinationText, setDestination)}
        />
      </View>

      <Button title="Calculer la distance" onPress={calculateDistance} />

      {distance && (
        <Text style={styles.distanceText}>
          Distance : {distance.toFixed(2)} km
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
  distanceText: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
});
