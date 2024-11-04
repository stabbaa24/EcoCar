// screens/ProposeRideScreen.js

import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default function ProposeRideScreen() {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [departureLocation, setDepartureLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);

  const fetchSuggestions = async (query, setSuggestions) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectLocation = (item, setLocation, setText, setSuggestions) => {
    const location = {
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
    };
    setLocation(location);
    setText(item.display_name);
    setSuggestions([]);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: departureLocation ? departureLocation.latitude : 48.8566,
          longitude: departureLocation ? departureLocation.longitude : 2.3522,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {departureLocation && <Marker coordinate={departureLocation} title="Départ" />}
        {destinationLocation && <Marker coordinate={destinationLocation} title="Destination" />}
      </MapView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Lieu de départ"
          value={departure}
          onChangeText={(text) => {
            setDeparture(text);
            fetchSuggestions(text, setDepartureSuggestions);
          }}
        />
        <FlatList
          data={departureSuggestions}
          keyExtractor={(item) => item.place_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectLocation(item, setDepartureLocation, setDeparture, setDepartureSuggestions)}
            >
              <Text style={styles.suggestionText}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Lieu d'arrivée"
          value={destination}
          onChangeText={(text) => {
            setDestination(text);
            fetchSuggestions(text, setDestinationSuggestions);
          }}
        />
        <FlatList
          data={destinationSuggestions}
          keyExtractor={(item) => item.place_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectLocation(item, setDestinationLocation, setDestination, setDestinationSuggestions)}
            >
              <Text style={styles.suggestionText}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
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
  inputContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  suggestionText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
