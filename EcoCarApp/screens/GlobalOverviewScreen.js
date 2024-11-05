// screens/GlobalOverviewScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

export default function GlobalOverviewScreen() {
  const navigation = useNavigation();

  // Données fictives pour les économies d'émissions RSE en kg de CO₂
  const rseSavingsData = {
    citizen: 500,      // Economies réalisées par un citoyen en moyenne
    company: 8000,     // Economies réalisées par l'entreprise ProgTech
    city: 20000,       // Economies réalisées par l'ensemble de la ville
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vue Globale des Économies</Text>

      {/* Graphique des économies RSE */}
      <Text style={styles.chartTitle}>Émissions RSE Économisées (en kg de CO₂)</Text>
      <BarChart
        data={{
          labels: ["Citoyen", "Entreprise", "Ville"],
          datasets: [
            {
              data: [rseSavingsData.citizen, rseSavingsData.company, rseSavingsData.city]
            }
          ]
        }}
        width={screenWidth - 40} // Ajoutez un peu de marge de chaque côté
        height={220}
        yAxisLabel=""
        yAxisSuffix=" kg"
        chartConfig={{
          backgroundGradientFrom: "#f5f5f5",
          backgroundGradientTo: "#f5f5f5",
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          barPercentage: 0.5,
        }}
        style={styles.chart}
      />

      {/* Cartes d'informations pour chaque type d'économie */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Économie Citoyen')}
      >
        <Text style={styles.cardTitle}>Économie pour un Citoyen</Text>
        <Text style={styles.cardDescription}>
          Voir les économies réalisées par une personne en moyenne (conducteur + passager).
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Économie Entreprise')}
      >
        <Text style={styles.cardTitle}>Économie pour l'Entreprise</Text>
        <Text style={styles.cardDescription}>
          Voir les économies réalisées par l'entreprise ProgTech.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Économie Ville')}
      >
        <Text style={styles.cardTitle}>Économie pour la Ville</Text>
        <Text style={styles.cardDescription}>
          Voir les économies réalisées à l'échelle de la ville, incluant tous les citoyens.
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginVertical: 10,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
});
