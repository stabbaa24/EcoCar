// screens/CityEconomyScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

const CityEconomyScreen = () => {
  // Données fictives pour les économies de la ville
  const data = {
    totalTrips: 5000,
    carbonSavings: 100000, // en kg de CO₂
    fuelSavings: 25000, // en litres
    financialSavings: 60000, // en euros économisés
    monthlySavings: [5000, 5200, 5500, 5700, 6000, 6100, 6300, 6500, 6600, 6700, 6900, 7000],
  };

  // Configuration du graphique
  const chartConfig = {
    backgroundGradientFrom: "#f5f5f5",
    backgroundGradientTo: "#f5f5f5",
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Primary green color for bars
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black for labels
    barPercentage: 0.5,
    decimalPlaces: 0, // No decimal places for financial values
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Économies Ville - ProgVille</Text>

      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Nombre total de trajets :</Text>
        <Text style={styles.statValue}>{data.totalTrips}</Text>
      </View>

      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Émissions de CO₂ évitées :</Text>
        <Text style={styles.statValue}>{data.carbonSavings} kg</Text>
      </View>

      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Carburant économisé :</Text>
        <Text style={styles.statValue}>{data.fuelSavings} litres</Text>
      </View>

      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Économies financières :</Text>
        <Text style={styles.statValue}>{data.financialSavings} €</Text>
      </View>

      <Text style={styles.chartTitle}>Économies Mensuelles (en €)</Text>
      <BarChart
        data={{
          labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
          datasets: [{ data: data.monthlySavings }],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </ScrollView>
  );
};

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
  },
  statContainer: {
    marginVertical: 10,
  },
  statLabel: {
    fontSize: 16,
    color: '#333',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginVertical: 10,
  },
  chart: {
    borderRadius: 8,
    alignSelf: 'center',
  },
});

export default CityEconomyScreen;
