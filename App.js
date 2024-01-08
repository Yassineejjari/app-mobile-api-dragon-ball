import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, StyleSheet} from 'react';
import axios from 'axios';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
//import  HomeScreen  from './screens/HomeScreen';
//import  DetailsScreen  from './screens/DetailsScreen';


export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dragonball-api.com/api/characters?limit=30');
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
      <Text>Personnages de Dragon Ball</Text>

      {data && data.items.map(character => (
        <View key={character.id} style={styles.personnageContainer}>
          <Image source={{ uri: character.image }} style={styles.personnageImage} />
          <Text style={styles.personnageTitle}>Nom : {character.name}</Text>
          <Text>Ki : {character.ki}</Text>
          <Text>maxki : {character.maxKi}</Text>
          <Text>Race : {character.race}</Text>
          <Text>Genre : {character.gender}</Text>
          <Text>Affiliation : {character.affiliation}</Text>
          {/* Ajoutez d'autres champs selon vos besoins */}
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
    alignItems: 'center',
  },
  personnageImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  personnageTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
