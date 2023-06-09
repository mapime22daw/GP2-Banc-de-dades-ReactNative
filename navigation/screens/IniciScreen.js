import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
export default function IniciScreen({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            
            <Text style={styles.title}>Benvingut a les dades de pobresa mundial!</Text>
            <Text style={styles.description}>Aquesta aplicació mostra dades de pobresa de tot el món per ajudar-te a comprendre millor el problema global de la pobresa. Pots seleccionar un país per veure les dades de pobresa d'aquell país.</Text>
            <Image source={require('./img/pobreza.jpg')} style={{ width: 355, height: 175, marginBottom: 20,borderRadius: 10}}/>
            <Image source={require('./img/pobreza2.jpg')} style={{ width: 355, height: 175, marginBottom: 20,borderRadius: 10}}/>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dades')}>
                <Text style={styles.buttonText}>Comença</Text>
            </TouchableOpacity>
            <View style={{ height: 30 }} />

        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'stretch',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});