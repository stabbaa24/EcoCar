// screens/HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Message de Bienvenue */}
      <Text style={styles.title}>Bienvenue sur EcoCar - ProgVille</Text>
      <Text style={styles.subtitle}>
        Participez à la mobilité durable en réduisant votre empreinte carbone grâce au covoiturage local.
      </Text>

      {/* Boutons pour les fonctionnalités principales */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Recherche trajet')}
        >
          <Text style={styles.buttonText}>Rechercher un Trajet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Proposer un trajet')}
        >
          <Text style={styles.buttonText}>Proposer un Trajet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.buttonText}>Voir le Tableau de Bord</Text>
        </TouchableOpacity>
      </View>

      {/* Objectifs et Impact Communautaire */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Objectifs Communautaires</Text>
        <Text style={styles.statText}>🌍 Réduction de 20% des émissions de CO₂ d'ici fin d'année</Text>
        <Text style={styles.statText}>🌱 Objectif : 100 arbres sauvés grâce au covoiturage</Text>
      </View>

      {/* Statistiques de la Communauté */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Statistiques de la Communauté</Text>
        <Text style={styles.statText}>🚗 Trajets réalisés ce mois : 850</Text>
        <Text style={styles.statText}>🌍 Émissions de CO₂ évitées : 1,200 kg</Text>
        <Text style={styles.statText}>🌱 Arbres sauvés : 50</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center',
  },
  statText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
});
