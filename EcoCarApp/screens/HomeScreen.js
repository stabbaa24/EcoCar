// screens/HomeScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur EcoCar</Text>
      <Button
        title="Voir la Carte et les Trajets"
        onPress={() => navigation.navigate('Map')}
      />
      <Button
        title="Accéder au Tableau de Bord"
        onPress={() => navigation.navigate('Dashboard')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
