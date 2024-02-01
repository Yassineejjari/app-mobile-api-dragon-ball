import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';



export default function HomeScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async ( page = 1) => {
      try {
        const response = await axios.get('https://dragonball-api.com/api/characters?page=${page}&limit=12');
        setData(response.data);
        console.log(response.da);
        setCurrentPage(page);
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
    
    <ScrollView style={styles.container}>
      <Image
        source={require('/Users/Eleve/dev-mobile-api-onepiece/assets/dbz.png')}  // Remplacez le chemin par le chemin réel de votre image
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.Titreperso}>Personnages de Dragon Ball</Text>
      {data && data.items.map(character => (
        <View key={character.id} style={styles.personnageContainer}>
          <Image source={{ uri: character.image }} style={styles.personnageImage}  resizeMode="contain"/>
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
    </ScrollView>
   
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Couleur de fond principale
    padding: 10, // Espace intérieur pour les éléments
  },
  Titreperso: {
    fontFamily: 'Saiyan-Sans.ttf',  
    fontSize: 20,
    marginBottom: 10,
    color: '#fff', // Couleur du texte
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
    alignSelf: 'center',
    marginBottom: 20, // Espacement après le logo
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  currentPageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  personnageContainer: {
    backgroundColor: '#333', // Couleur de fond des conteneurs de personnages
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  personnageImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  personnageTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
});