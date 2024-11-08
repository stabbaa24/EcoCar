// DashboardScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getUserSession } from '../utils/storage';
import { getUserRseData } from '../utils/sampleData';
import { BarChart, PieChart } from 'react-native-chart-kit'; // Assurez-vous d'avoir installé ce package

const DashboardScreen = () => {
  const [userData, setUserData] = useState(null);
  const [rseData, setRseData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserSession();
      setUserData(user);
      
      if (user) {
        const userSpecificRseData = getUserRseData(user.id);
        setRseData(userSpecificRseData);
      }
    };

    fetchUserData();
  }, []);

  if (!userData || !rseData) {
    return <Text>Chargement des données...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tableau de bord pour {userData.name}</Text>

      {/* KPI Section */}
      <View style={styles.kpiSection}>
        <Text style={styles.kpiLabel}>Trajets totaux :</Text>
        <Text style={styles.kpiValue}>{rseData.totalTrips}</Text>
      </View>
      <View style={styles.kpiSection}>
        <Text style={styles.kpiLabel}>Trajets en tant que conducteur :</Text>
        <Text style={styles.kpiValue}>{rseData.tripsAsDriver}</Text>
      </View>
      <View style={styles.kpiSection}>
        <Text style={styles.kpiLabel}>Trajets en tant que passager :</Text>
        <Text style={styles.kpiValue}>{rseData.tripsAsPassenger}</Text>
      </View>
      <View style={styles.kpiSection}>
        <Text style={styles.kpiLabel}>Économies de CO₂ :</Text>
        <Text style={styles.kpiValue}>{rseData.co2Saved} kg</Text>
      </View>
      <View style={styles.kpiSection}>
        <Text style={styles.kpiLabel}>Classement CO₂ économisé :</Text>
        <Text style={styles.kpiValue}>{rseData.userRanking}ᵉ position</Text>
      </View>
      <View style={styles.kpiSection}>
        <Text style={styles.kpiLabel}>Équivalent arbres sauvés :</Text>
        <Text style={styles.kpiValue}>{rseData.treesSaved}</Text>
      </View>
      <View style={styles.kpiSection}>
        <Text style={styles.kpiLabel}>Réduction chaleur urbaine :</Text>
        <Text style={styles.kpiValue}>{rseData.cityEmissionsReduction} °C</Text>
      </View>

      {/* Graphiques */}
      <Text style={styles.sectionTitle}>Graphiques</Text>
      
      <Text style={styles.chartTitle}>Répartition Conducteur vs Passager</Text>
      <PieChart
        data={[
          { name: 'Conducteur', population: rseData.tripsAsDriver, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'Passager', population: rseData.tripsAsPassenger, color: 'rgba(34, 139, 34, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        ]}
        width={300} // from react-native
        height={220}
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Text style={styles.chartTitle}>CO₂ économisé par rapport aux trajets</Text>
      <BarChart
        data={{
          labels: ['Total', 'Conducteur', 'Passager'],
          datasets: [
            {
              data: [rseData.co2Saved, rseData.tripsAsDriver * 2, rseData.tripsAsPassenger * 2],
            },
          ],
        }}
        width={300}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        verticalLabelRotation={30}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 20,
    textAlign: 'center',
  },
  kpiSection: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
  },
  kpiLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: 18,
    color: '#2E8B57',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginVertical: 15,
  },
  chartTitle: {
    fontSize: 18,
    color: '#2E8B57',
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default DashboardScreen;
