

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
      <Image source={{ uri: item.image }} style={styles.characterImage} resizeMode="contain" />
      <Text style={styles.characterTitle}>{item.name}</Text>
      <Text>Ki: {item.ki}</Text>
      <Text>Max Ki: {item.maxKi}</Text>
      <Text>Race: {item.race}</Text>
      <Text>Genre: {item.gender}</Text>
      <Text>Affiliation: {item.affiliation}</Text>
      <Text>Description: {item.description}</Text>

      <Text style={styles.sectionTitle}>Origine de la planète</Text>
      <View style={styles.originPlanetContainer}>
      <Image source={{ uri: item.originPlanet?.image }} style={styles.planetImage} resizeMode="contain" />
        <Text>Planète: {item.originPlanet?.name}</Text>
        <Text>Description: {item.originPlanet?.description}</Text>
      </View>

      <Text style={styles.sectionTitle}>Transformations</Text>
      {item.transformations?.map((transformation) => (
        <View key={transformation.item} style={styles.transformationContainer}>
          <Image source={{ uri: transformation?.image }} style={styles.transformationImage} resizeMode="contain" />
          <Text>Nom: {transformation?.name}</Text>
          <Text>Ki: {transformation?.ki}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  characterImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  characterTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  originPlanetContainer: {
    marginBottom: 10,
  },
  planetImage: {
    width: '100%',
    height: 100,
    marginBottom: 10,
  },
  transformationContainer: {
    marginBottom: 10,
  },
  transformationImage: {
    width: '100%',
    height: 100,
    marginBottom: 10,
  },
});

export default DetailsScreen;
