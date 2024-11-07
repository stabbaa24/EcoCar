// sampleData.js

export const users = [
    {
      id: '1',
      name: 'Jean Lefevre',
      role: 'conducteur',
      company: 'ProgTech',
      vehicle: { brand: 'Toyota', fuelType: 'Essence', model: 'Prius' },
    },
    {
      id: '2',
      name: 'Sophie Durand',
      role: 'conducteur',
      company: null,
      vehicle: { brand: 'Tesla', fuelType: 'Électrique', model: 'Model 3' },
    },
    {
      id: '3',
      name: 'Marie Martin',
      role: 'passager',
      company: null,
      vehicle: null,
    },
    {
      id: '4',
      name: 'Paul Simon',
      role: 'passager',
      company: null,
      vehicle: null,
    },
    {
      id: '5',
      name: 'ProgVille Administration',
      role: 'admin',
      company: 'Ville de ProgVille',
      vehicle: null,
    },
  ];
  
  export const trips = [
    {
      userId: '1',
      date: '2023-10-01',
      distance: 15,
      co2Saved: 2.5,
      role: 'conducteur',
    },
    {
      userId: '2',
      date: '2023-10-02',
      distance: 20,
      co2Saved: 3,
      role: 'conducteur',
    },
    {
      userId: '3',
      date: '2023-10-01',
      distance: 15,
      co2Saved: 2.5,
      role: 'passager',
    },
    {
      userId: '4',
      date: '2023-10-03',
      distance: 10,
      co2Saved: 1.5,
      role: 'passager',
    },
  ];
  
  export const co2Statistics = {
    totalCo2Saved: 50,
    tripsCount: trips.length,
    progVilleAverage: 10, // Moyenne d'économie de CO2 par utilisateur dans la ville
    progTechAverage: 8, // Moyenne d'économie de CO2 par employé de ProgTech
  };
  