// screens/CitizenEconomyScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

const CitizenEconomyScreen = () => {
  // Données fictives pour les économies citoyen
  const data = {
    averageTripsPerMonth: 20,
    carbonSavings: 250, // en kg de CO₂
    fuelSavings: 80, // en litres de carburant
    financialSavings: 120, // en euros économisés
    monthlySavings: [100, 110, 90, 95, 120, 130, 140, 150, 160, 150, 170, 180], // Economies mensuelles
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Économies Citoyen</Text>

      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Nombre moyen de trajets par mois :</Text>
        <Text style={styles.statValue}>{data.averageTripsPerMonth}</Text>
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

const chartConfig = {
  backgroundGradientFrom: "#f0f0f0",
  backgroundGradientTo: "#f0f0f0",
  color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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

export default CitizenEconomyScreen;
