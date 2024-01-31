import axios from 'axios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from './screens/DetailsScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import SearchScreen from './screens/SearchScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Accueil" component={HomeScreen} />
      <Stack.Screen name="DetailsHome" component={DetailsScreen} />
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="DetailsSearch" component={DetailsScreen} />
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
              headerShown: false
            }}
          />
          <Tab.Screen
            name="Recherche"
            component={SearchStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" color={color} size={size} />
              ),
              headerShown: false
            }}
          />
          <Tab.Screen
            name="Favorite"
            component={FavoriteScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="heart" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App;



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
