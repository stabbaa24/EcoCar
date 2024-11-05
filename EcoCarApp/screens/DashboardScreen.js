// screens/DashboardScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BarChart, PieChart, ProgressChart } from 'react-native-chart-kit';

// Données fictives pour deux utilisateurs
const userData = {
  user1: {
    name: "Alice",
    monthlyTrips: [10, 15, 18, 20, 25, 30, 28, 27, 26, 30, 35, 40],
    carbonSavings: 250,
    fuelSavings: 100,
    energySavings: 150,
    treesSaved: 11.4,
    trafficHoursReduced: 20,
    financialSavings: 200,
  },
  user2: {
    name: "Bob",
    monthlyTrips: [8, 12, 15, 18, 22, 25, 26, 24, 25, 28, 30, 33],
    carbonSavings: 200,
    fuelSavings: 80,
    energySavings: 120,
    treesSaved: 9.1,
    trafficHoursReduced: 15,
    financialSavings: 150,
  },
};

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  const [selectedUser, setSelectedUser] = useState("user1");
  const data = userData[selectedUser];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tableau de Bord - {data.name}</Text>

      {/* Sélecteur d'utilisateur */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Sélectionnez un utilisateur:</Text>
        <Picker
          selectedValue={selectedUser}
          onValueChange={(itemValue) => setSelectedUser(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Alice" value="user1" />
          <Picker.Item label="Bob" value="user2" />
        </Picker>
      </View>

      {/* Section KPI RSE */}
      <View style={styles.kpiContainer}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Émissions de CO₂ évitées</Text>
          <Text style={styles.kpiValue}>{data.carbonSavings} kg</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Énergie économisée</Text>
          <Text style={styles.kpiValue}>{data.energySavings} kWh</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Carburant économisé</Text>
          <Text style={styles.kpiValue}>{data.fuelSavings} litres</Text>
        </View>
      </View>

      <View style={styles.kpiContainer}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Économies financières</Text>
          <Text style={styles.kpiValue}>{data.financialSavings} €</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Nombre d'arbres "sauvés"</Text>
          <Text style={styles.kpiValue}>{data.treesSaved.toFixed(1)}</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Heures de trafic réduites</Text>
          <Text style={styles.kpiValue}>{data.trafficHoursReduced} h</Text>
        </View>
      </View>

      {/* Graphique des trajets mensuels */}
      <Text style={styles.chartTitle}>Trajets par Mois</Text>
      <BarChart
        data={{
          labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
          datasets: [{ data: data.monthlyTrips }]
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        yAxisSuffix=" trajets"
        chartConfig={chartConfig}
        style={styles.chart}
      />

      {/* Graphique pour le Score RSE */}
      <Text style={styles.chartTitle}>Score RSE Global</Text>
      <ProgressChart
        data={{
          labels: ["CO₂", "Énergie", "Carburant"],
          data: [
            data.carbonSavings / 500,     // 500 kg comme objectif
            data.energySavings / 300,     // 300 kWh comme objectif
            data.fuelSavings / 150,       // 150 litres comme objectif
          ]
        }}
        width={screenWidth - 40}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#f0f0f0",
  backgroundGradientTo: "#f0f0f0",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  pickerContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
  },
  kpiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  kpiCard: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: screenWidth / 3.5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  kpiLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 20,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
    alignSelf: 'center',
  },
});
