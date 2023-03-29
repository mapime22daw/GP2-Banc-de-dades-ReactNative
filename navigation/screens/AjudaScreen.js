import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function AjudaScreen({ navigation }){
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Com utilitzar aquesta aplicació?</Text>
      <Text style={styles.paragraph}>
        Aquesta aplicació mostra les dades de pobresa de tot el món. Per utilitzar-la, segueix els següents passos:
      </Text>
      <Text style={styles.paragraph}>
        1. A la pantalla principal, selecciona el país que vols veure.
      </Text>
      <Text style={styles.paragraph}>
        2. A continuació, es mostrarà la informació sobre la taxa de pobresa en aquest país.
      </Text>
      <Text style={styles.paragraph}>
        3. També pots seleccionar l'opció "Comparar" per veure com es compara la taxa de pobresa d'aquest país amb la d'altres països.
      </Text>
      <Text style={styles.paragraph}>
        I això és tot! Si tens algun dubte o problema, no dubtis en contactar-nos a través de l'opció "Contacte" en el menú principal.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Tornar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

