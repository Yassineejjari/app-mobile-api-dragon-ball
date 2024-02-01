

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const DetailsScreen = ({ route }) => {
  const { id } = route.params; // Remplacez 'character' par 'item'

const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [item, setItem] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      console.log(id);
      const response = await axios.get(`https://dragonball-api.com/api/characters/${id}`);
      setData(response.data);
      console.log('azerty', response.data);
      setItem(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [id]);

  return item && (
    <ScrollView style={styles.container}>
      <View style={styles.Persocontainer}>
      <Image source={{ uri: item.image }} style={styles.characterImage} resizeMode="contain" />
      <Text style={styles.characterTitle}>{item.name}</Text>
      <Text style={styles.text}>Ki: {item.ki}</Text>
      <Text style={styles.text}>Max Ki: {item.maxKi}</Text>
      <Text style={styles.text}>Race: {item.race}</Text>
      <Text style={styles.text}>Genre: {item.gender}</Text>
      <Text style={styles.text}>Affiliation: {item.affiliation}</Text>
      <Text style={styles.text}>Description: {item.description}</Text>
      </View>

      <Text style={styles.sectionTitle}>Origine de la planète</Text>
      <View style={styles.originPlanetContainer}>
      <Image source={{ uri: item.originPlanet?.image }} style={styles.planetImage} resizeMode="contain" />
        <Text style={styles.text}>Planète: {item.originPlanet?.name}</Text>
        <Text style={styles.text}>Description: {item.originPlanet?.description}</Text>
      </View>

      <Text style={styles.sectionTitle}>Transformations</Text>
      {item.transformations?.map((transformation) => (
        <View key={transformation.item} style={styles.transformationContainer}>
          <Image source={{ uri: transformation?.image }} style={styles.transformationImage} resizeMode="contain" />
          <Text style={styles.text}>Nom: {transformation?.name}</Text>
          <Text style={styles.text}>Ki: {transformation?.ki}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1a1a1a', // Couleur de fond principale
  },
  characterImage: {
    width: '100%',
    height: 250,
    marginBottom: 15,
    borderRadius: 10, // Coins arrondis
  },
  characterTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
    color: 'white', // Couleur du texte du titre
  },
  text: {
    color: '#fff', // Couleur du texte générique
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
    marginBottom: 10,
    color: 'white', // Couleur du texte du titre de section
  },
  originPlanetContainer: {
    marginBottom: 15,
    backgroundColor: '#333', // Couleur de fond du conteneur de l'origine de la planète
    padding: 15,
    borderRadius: 10, // Coins arrondis
  },
  planetImage: {
    width: '100%',
    height: 150,
    marginBottom: 15,
    borderRadius: 10, // Coins arrondis
  },
  Persocontainer: {
    marginBottom: 15,
    backgroundColor: '#333', // Couleur de fond du conteneur de l'origine de la planète
    padding: 15,
    alignItems: 'center',
    borderRadius: 10, // Coins arrondis
  },
  transformationContainer: {
    marginBottom: 15,
    backgroundColor: '#333', // Couleur de fond du conteneur des transformations
    padding: 15,
    borderRadius: 10, // Coins arrondis
  },
  transformationImage: {
    width: '100%',
    height: 150,
    marginBottom: 15,
    borderRadius: 10, // Coins arrondis
  },
  descriptionText: {
    color: '#fff',
    marginBottom: 15,
    lineHeight: 20, // Hauteur de ligne pour une meilleure lisibilité
  },
  backButton: {
    backgroundColor: '#ff0000',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignSelf: 'center',
  },
});

export default DetailsScreen;
