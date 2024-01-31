// FavoriteScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);

  const removeFavorite = (characterId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((character) => character.id !== characterId));
  };
  




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personnages Favoris</Text>
      {favorites.length === 0 ? (
        <Text>Aucun personnage favori pour le moment.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.favoriteContainer}>
              <Image source={{ uri: item.image }} style={styles.favoriteImage} resizeMode="contain" />
              <Text style={styles.favoriteTitle}>{item.name}</Text>
              <Text>Ki: {item.ki}</Text>
              <Text>Race: {item.race}</Text>
              <Text>Affiliation: {item.affiliation}</Text>
              <Text>Description: {item.description}</Text>
              {/* Ajoutez d'autres champs selon vos besoins */}
              <Button
        title="Retirer des favoris"
        onPress={() => removeFavorite(item.id)}
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
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  favoriteContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  favoriteImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  favoriteTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  favoriteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  favoriteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FavoriteScreen;
