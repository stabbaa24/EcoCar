export const users = [
  {
    id: '1',
    name: 'Hermione',
    password: 'mdp',
    role: 'conducteur',
    company: 'ProgTech',
    vehicle: { brand: 'Toyota', fuelType: 'Essence', model: 'Prius', fuelConsumption: 4.5 }, // L/100km
  },
  {
    id: '2',
    name: 'Sophie Durand',
    password: 'sophie2023',
    role: 'conducteur',
    company: null,
    vehicle: { brand: 'Tesla', fuelType: 'Électrique', model: 'Model 3', electricityConsumption: 15 }, // kWh/100km
  },
  {
    id: '3',
    name: 'Marie Martin',
    password: 'marie1234',
    role: 'passager',
    company: null,
    vehicle: null,
  },
  {
    id: '4',
    name: 'Paul Simon',
    password: 'paul2023',
    role: 'passager',
    company: null,
    vehicle: null,
  },
  {
    id: '5',
    name: 'ProgVille Administration',
    password: 'adminpass',
    role: 'admin',
    company: 'Ville de ProgVille',
    vehicle: null,
  },
];

// Détails des trajets avec informations supplémentaires pour les calculs
export const trips = [
  {
    userId: '1',
    date: '2023-10-01',
    distance: 15, // km
    co2Saved: 2.5, // kg
    role: 'conducteur',
    startLocation: 'Centre-ville',
    endLocation: 'Quartier des affaires',
    fuelConsumed: 0.675, // L (consommation estimée basée sur 4.5 L/100km)
    passengers: 1, // Nombre de passagers
    vehicle: { brand: 'Toyota', model: 'Prius', fuelType: 'Essence', fuelConsumption: 4.5 }, // Conducteur
  },
  {
    userId: '2',
    date: '2023-10-02',
    distance: 20, // km
    co2Saved: 3, // kg
    role: 'conducteur',
    startLocation: 'Maison',
    endLocation: 'Université',
    electricityConsumed: 3, // kWh (consommation estimée basée sur 15 kWh/100km)
    passengers: 2, // Nombre de passagers
    vehicle: { brand: 'Tesla', model: 'Model 3', fuelType: 'Électrique', electricityConsumption: 15 }, // Conducteur
  },
  {
    userId: '3',
    date: '2023-10-01',
    distance: 15, // km
    co2Saved: 2.5, // kg
    role: 'passager',
    startLocation: 'Station de métro',
    endLocation: 'Université',
    passengers: 1,
    vehicle: { brand: 'Toyota', model: 'Prius', fuelType: 'Essence', fuelConsumption: 4.5 },
  },
  {
    userId: '4',
    date: '2023-10-03',
    distance: 10, // km
    co2Saved: 1.5, // kg
    role: 'passager',
    startLocation: 'Maison',
    endLocation: 'Centre commercial',
    passengers: 1,
    vehicle: { brand: 'Tesla', model: 'Model 3', fuelType: 'Électrique', electricityConsumption: 15 },
  },
];

// Constantes environnementales pour les calculs RSE et Green IT
export const environmentalConstants = {
  co2PerLiterPetrol: 2.31, // kg CO2 par litre d'essence
  co2PerKwhElectricity: 0.1, // kg CO2 par kWh pour électricité en France (moyenne)
  averageFuelCost2023: 1.75, // Prix moyen d'un litre de carburant en euros en 2023
  averageElectricityCost2023: 0.18, // Prix moyen du kWh en euros en 2023
  urbanHeatImpactReductionFactor: 0.005, // Réduction de chaleur estimée par tonne de CO2 évitée
  objectives: {
    progVilleReductionTarget2024: 15, // Objectif de réduction de CO2 de la ville en %
    progTechReductionTarget2024: 10, // Objectif de réduction de CO2 de ProgTech en %
  },
};

// Statistiques agrégées pour la ville, les entreprises, etc.
export const statistics = {
  totalCo2Saved: trips.reduce((total, trip) => total + trip.co2Saved, 0), // kg CO2 total sauvé
  tripsCount: trips.length,
  progVilleAverageCo2Saved: 10, // kg CO2 par utilisateur de la ville
  progTechAverageCo2Saved: 8, // kg CO2 par employé de ProgTech
  rseMetrics: {
    employeesUsingGreenTransport: 0.3, // 30% des employés utilisant des transports verts
    averageDistanceReducedPerEmployee: 12, // km par mois
  },
};

// Données RSE et Green IT
export const rseData = {
  cityEmissionsReduction: (statistics.totalCo2Saved * environmentalConstants.urbanHeatImpactReductionFactor).toFixed(2), // Impact sur la chaleur urbaine en °C
  progTechEmissionsReduced: (statistics.progTechAverageCo2Saved * statistics.tripsCount).toFixed(2), // kg CO2 réduits par ProgTech
  energyCostSavings: trips
    .reduce((acc, trip) => acc + (trip.fuelConsumed || 0) * environmentalConstants.averageFuelCost2023, 0)
    .toFixed(2), // € économisés en carburant
  totalEnergySavings: trips
    .reduce((acc, trip) => acc + (trip.electricityConsumed || 0) * environmentalConstants.averageElectricityCost2023, 0)
    .toFixed(2), // € économisés en électricité
};

// Fonction pour calculer les données RSE par utilisateur
// sampleData.js

export const getUserRseData = (userId) => {
  const userTrips = trips.filter((trip) => trip.userId === userId);
  
  const totalCo2Saved = userTrips.reduce((total, trip) => total + (trip.co2Saved || 0), 0);
  const totalFuelConsumed = userTrips.reduce((total, trip) => total + (trip.fuelConsumed || 0), 0);
  const totalElectricityConsumed = userTrips.reduce((total, trip) => total + (trip.electricityConsumed || 0), 0);

  const tripsAsDriver = userTrips.filter((trip) => trip.role === 'conducteur').length;
  const tripsAsPassenger = userTrips.filter((trip) => trip.role === 'passager').length;
  const totalTrips = userTrips.length;

  // Classement basé sur les économies de CO2
  const sortedUsersByCo2 = users.map((user) => ({
    id: user.id,
    co2Saved: trips
      .filter((trip) => trip.userId === user.id)
      .reduce((total, trip) => total + (trip.co2Saved || 0), 0),
  })).sort((a, b) => b.co2Saved - a.co2Saved);
  const userRanking = sortedUsersByCo2.findIndex((user) => user.id === userId) + 1;

  return {
    totalTrips,
    tripsAsDriver,
    tripsAsPassenger,
    cityEmissionsReduction: (totalCo2Saved * environmentalConstants.urbanHeatImpactReductionFactor).toFixed(2),
    energyCostSavings: (totalFuelConsumed * environmentalConstants.averageFuelCost2023).toFixed(2),
    totalEnergySavings: (totalElectricityConsumed * environmentalConstants.averageElectricityCost2023).toFixed(2),
    co2Saved: totalCo2Saved.toFixed(2),
    userRanking,
    treesSaved: (totalCo2Saved / 21).toFixed(2), // Equivalent arbres sauvés
  };
};
