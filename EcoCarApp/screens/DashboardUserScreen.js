import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardUserScreen = () => {
  const [userData, setUserData] = useState([]);
  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await AsyncStorage.getItem('users');
      const trips = await AsyncStorage.getItem('trips');
      setUserData(JSON.parse(users) || []);
      setTripData(JSON.parse(trips) || []);
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text>Dashboard Utilisateur</Text>
      {userData.map(user => (
        <Text key={user.id}>{user.name}</Text>
      ))}
      {tripData.map((trip, index) => (
        <Text key={index}>
          Trajet de {trip.distance} km, CO2 économisé : {trip.co2Saved} kg
        </Text>
      ))}
    </View>
  );
};

export default DashboardUserScreen;
