import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api2.api-onepiece.com/v2/characters/fr');
        console.log(response);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <View style={styles.container}><Text>Chargement...</Text></View>;
  }

  if (error) {
    return <View style={styles.container}><Text>Une erreur s'est produite : {error.message}</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text>Les personnages</Text>

      {data && data.map(personnage => (
        <View key={personnage.id} style={styles.personnageContainer}>
          <Text style={styles.personnageTitle}>Nom : {personnage.name}</Text>
          <Text>Taille : {personnage.size}</Text>
          <Text>Prime : {personnage.bounty}</Text>
          <Text>Équipage : {personnage.crew}</Text>
          <Text>Fruit du Demon : {personnage.devilFruit}</Text>
        </View>
      ))}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  personnageContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  personnageTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
