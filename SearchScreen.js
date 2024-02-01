// SearchScreen.jsx
import React, { useState } from 'react';
import axios from 'axios';
import FavoriteScreen from './FavoriteScreen.js';
import { View, Text, TextInput, StyleSheet, Button, FlatList, Image, TouchableOpacity } from 'react-native';


const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [favorites, setFavorites] = useState([]);

 

 const handleSearch = async () => {
    try {
      const response = await axios.get(`https://dragonball-api.com/api/characters?name=${searchTerm}`);
      const data = response.data;
  
      console.log('Résultat de la recherche :', data);
  
      if (data && data.length > 0) {
        setSearchResults(data);
        setSearchError(null);
      } else {
        setSearchResults([]);
        setSearchError('Aucun résultat trouvé.');
      }
    } catch (error) {
      console.error('Erreur de recherche :', error);
      setSearchResults([]);
      setSearchError('Erreur lors de la recherche.');
    }
  };



  const addToFavorites = (character) => {
    // Vérifiez si le personnage est déjà dans les favoris
    if (!favorites.some((fav) => fav.id === character.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, character]);
    }
  };
  
  const addFavorite = (item) => {
    setFavorites([...favorites, item]);
  };
  
const handleAddToFavorites = (item) => {
  addFavorite(item);
  navigation.navigate('FavoriteScreen');
};

  

  
  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        placeholder="Rechercher par nom..."
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      <Button style ={styles.boutonrechercher}title="Rechercher" onPress={handleSearch} />

      {searchError ? (
        <Text>{searchError}</Text>
      ) : (


        <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
          <View style={styles.searchResultContainer}>
          <Image source={{ uri: item.image }} style={styles.personnageImage} resizeMode="contain" />
          <Text style={styles.personnageTitle}>{item.name}</Text>
          
          <Text>Ki : {item.ki}</Text>
          <Text>maxki : {item.maxKi}</Text>
          <Text>Race : {item.race}</Text>
          <Text>Genre : {item.gender}</Text>
          <Text>Affiliation : {item.affiliation}</Text>
          
          <Button style ={styles.boutonrechercher}
             title="Voir détail"
            onPress={() => navigation.navigate('DetailsSearch', { id: item.id })}
         />
         <Button style ={styles.boutonrechercher}
              title="Ajouter aux favoris"
              onPress={() => addToFavorites(item)}
            />
           
           </View>
            )}
        />




      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a', // Couleur de fond principale
    padding: 10, // Espace intérieur pour les éléments
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff', // Couleur de fond de la zone de recherche
  },
  searchResultContainer: {
    backgroundColor: '#333', // Couleur de fond des conteneurs de résultats de recherche
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  personnageTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff', // Couleur du texte du titre du personnage
  },
  personnageImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  Button: {
    backgroundColor: '#ff0000', // Couleur du bouton
    color: '#fff', // Couleur du texte du bouton
    padding: 10, // Espace intérieur du bouton
    borderRadius: 5, // Coins arrondis
    marginVertical: 10, // Espacement vertical autour du bouton
    width: '80%', // Largeur du bouton
    alignSelf: 'center', // Centrer le bouton
  },
  boutonrechercher: {
    backgroundColor: '#ff0000', // Couleur du bouton
    color: '#fff', // Couleur du texte du bouton
    padding: 10, // Espace intérieur du bouton
    borderRadius: 5, // Coins arrondis
    marginVertical: 10, // Espacement vertical autour du bouton
    width: '80%', // Largeur du bouton
    alignSelf: 'center', // Centrer le bouton
  },
  heartIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
});


export default SearchScreen;
