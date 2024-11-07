import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getUserSession } from '../utils/storage';
import { environmentalConstants } from '../utils/sampleData';

const TripDetailsScreen = ({ route }) => {
    const { trip } = route.params;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const sessionUser = await getUserSession();
            setUser(sessionUser);
        };
        fetchUser();
    }, []);

    // Calcul des économies en carburant et en électricité
    const fuelEconomy = trip.fuelConsumed || 0;
    const electricityEconomy = trip.electricityConsumed || 0;
    const co2AvoidedByDriver = fuelEconomy * environmentalConstants.co2PerLiterPetrol +
        electricityEconomy * environmentalConstants.co2PerKwhElectricity;

    // Calcul des économies supplémentaires pour le passager
    let additionalCo2Avoided = 0;
    let additionalFuelSaved = 0;
    let additionalElectricitySaved = 0;

    if (trip.role === 'passager' && user && user.vehicle) {
        const distanceInKm = trip.distance || 0;

        if (user.vehicle.fuelType === 'Essence' && user.vehicle.fuelConsumption) {
            additionalFuelSaved = (distanceInKm * user.vehicle.fuelConsumption) / 100; // Litres
            additionalCo2Avoided = additionalFuelSaved * environmentalConstants.co2PerLiterPetrol;
        } else if (user.vehicle.fuelType === 'Électrique' && user.vehicle.electricityConsumption) {
            additionalElectricitySaved = (distanceInKm * user.vehicle.electricityConsumption) / 100; // kWh
            additionalCo2Avoided = additionalElectricitySaved * environmentalConstants.co2PerKwhElectricity;
        }
    }

    // Calcul des économies même pour le conducteur grâce au covoiturage (réduction du besoin global de trajets)
    const driverCo2Reduction = co2AvoidedByDriver * 0.5; // Considérons 50% de réduction pour un trajet partagé
    const totalCo2Avoided = co2AvoidedByDriver + additionalCo2Avoided + driverCo2Reduction;
    const totalFuelSaved = fuelEconomy + additionalFuelSaved;
    const totalElectricitySaved = electricityEconomy + additionalElectricitySaved;
    const treesSaved = (totalCo2Avoided / 21).toFixed(2); // kg de CO2 absorbé/an par arbre
    const fuelCostSavings = (totalFuelSaved * environmentalConstants.averageFuelCost2023).toFixed(2);
    const electricityCostSavings = (totalElectricitySaved * environmentalConstants.averageElectricityCost2023).toFixed(2);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Détails du Trajet</Text>

                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Lieu de départ :</Text>
                    <Text style={styles.infoValue}>{trip.startLocation || 'Non spécifié'}</Text>
                </View>
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Lieu d'arrivée :</Text>
                    <Text style={styles.infoValue}>{trip.endLocation || 'Non spécifié'}</Text>
                </View>
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Durée estimée :</Text>
                    <Text style={styles.infoValue}>{((trip.distance || 0) / 50 * 60).toFixed(0)} min</Text>
                </View>
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Distance :</Text>
                    <Text style={styles.infoValue}>{trip.distance || '0'} km</Text>
                </View>
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Nombre de passagers :</Text>
                    <Text style={styles.infoValue}>{trip.passengers || 1}</Text>
                </View>

                {/* Comparaison des véhicules */}
                <Text style={styles.sectionTitle}>Détails des véhicules</Text>
                <View style={styles.vehicleSection}>
                    <View style={styles.vehicleCard}>
                        <Text style={styles.vehicleTitle}>Voiture du Conducteur</Text>
                        <Text>Marque : {trip.vehicle?.brand || 'N/A'}</Text>
                        <Text>Modèle : {trip.vehicle?.model || 'N/A'}</Text>
                        <Text>Carburant : {trip.vehicle?.fuelType || 'N/A'}</Text>
                        {trip.vehicle?.fuelConsumption && (
                            <Text>Consommation : {trip.vehicle.fuelConsumption} L/100km</Text>
                        )}
                        {trip.vehicle?.electricityConsumption && (
                            <Text>Consommation : {trip.vehicle.electricityConsumption} kWh/100km</Text>
                        )}
                    </View>

                    {trip.role === 'passager' && user && user.vehicle && (
                        <View style={styles.vehicleCard}>
                            <Text style={styles.vehicleTitle}>Votre Véhicule</Text>
                            <Text>Marque : {user.vehicle.brand}</Text>
                            <Text>Modèle : {user.vehicle.model}</Text>
                            <Text>Carburant : {user.vehicle.fuelType}</Text>
                            {user.vehicle.fuelConsumption && (
                                <Text>Consommation : {user.vehicle.fuelConsumption} L/100km</Text>
                            )}
                            {user.vehicle.electricityConsumption && (
                                <Text>Consommation : {user.vehicle.electricityConsumption} kWh/100km</Text>
                            )}
                        </View>
                    )}
                </View>

                {/* Informations écologiques */}
                <Text style={styles.sectionTitle}>Économies Réalisées</Text>
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>CO₂ évité :</Text>
                    <Text style={styles.infoValue}>{totalCo2Avoided.toFixed(2)} kg</Text>
                </View>
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Carburant économisé :</Text>
                    <Text style={styles.infoValue}>{totalFuelSaved.toFixed(2)} L</Text>
                </View>
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Électricité économisée :</Text>
                    <Text style={styles.infoValue}>{totalElectricitySaved.toFixed(2)} kWh</Text>
                </View>
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Équivalent arbres sauvés :</Text>
                    <Text style={styles.infoValue}>{treesSaved} arbres</Text>
                </View>
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Coût carburant évité :</Text>
                    <Text style={styles.infoValue}>{fuelCostSavings} €</Text>
                </View>
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Coût électricité évité :</Text>
                    <Text style={styles.infoValue}>{electricityCostSavings} €</Text>
                </View>
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Impact chaleur urbaine réduit :</Text>
                    <Text style={styles.infoValue}>{(totalCo2Avoided * environmentalConstants.urbanHeatImpactReductionFactor).toFixed(2)} °C</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 100, // Espace pour éviter le chevauchement avec les onglets de navigation
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 20,
        textAlign: 'center',
    },
    infoSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    infoLabel: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    infoValue: {
        fontSize: 16,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginVertical: 15,
    },
    vehicleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    vehicleCard: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
        marginHorizontal: 5,
    },
    vehicleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
});

export default TripDetailsScreen;
