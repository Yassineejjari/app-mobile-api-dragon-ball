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
      backgroundColor: 'whitesmoke',
      
    },
    Titreperso: {
      fontFamily: 'Saiyan-Sans.ttf',  
      fontSize: 20,  
      marginBottom: 10,
  
    },
    logo: {
      width: 150,  // Ajustez la largeur selon vos besoins
      height: 50,  // Ajustez la hauteur selon vos besoins
      resizeMode:"contain",
      alignSelf: 'center',
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    currentPageText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    personnageContainer: {
      backgroundColor: 'lightgray',
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
    },
    personnageTitle: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  