import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';




const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Remplacez 'URL_DE_VOTRE_API' par l'URL réelle de votre API
        const response = await axios.get('https://api2.api-onepiece.com/v2/characters/fr');
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
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Une erreur s'est produite: {error.message}</p>;
  }

  return (
    <div>
      <h1>Données de l'API:</h1>
      {"id": "int",
"name": "string",
"job": "string",
"size": "string",
"birthday": "string",
"age": "string",
"bounty": "string",
"status": "string",
"crew": {
"id": "int",
"name": "string",
"description": "string",
"status": "string",
"number": "string",
"roman_name": "string",
"total_prime": "string",
"is_yonko": "string",
},
"fruit": {
"id": "int",
"name": "string",
"description": "string",
"type": "string",
"filename": "string",
"roman_name": "string",
"technicalFile": "string",
}
},
[
{
"id": "int",
"name": "string",
"job": "string",
"size": "string",
"birthday": "string",
"age": "string",
"bounty": "string",
"status": "string",
"crew": {
"id": "int",
"name": "string",
"description": "string",
"status": "string",
"number": "string",
"roman_name": "string",
"total_prime": "string",
"is_yonko": "string",
},
"fruit": {
"id": "int",
"name": "string",
"description": "string",
"type": "string",
"filename": "string",
"roman_name": "string",
"technicalFile": "string",}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};



//const url('https://api2.api-onepiece.com/v2/characters/fr')
//.then((response) => response.json())
//.then((json) => {
  //console.log(json);
//})
//.catch((error) => {
  //console.error(error);
//});

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'blue', width: 200, height: 100}}>
      <Text>va me chercher une canette</Text></View>
      <View style={{backgroundColor: 'grey', width: 200, height: 100, justifyContent: 'center', alignItems: 'center'}}>
      <Text>va me chercher une canette</Text></View>
      <View style={{backgroundColor: 'green', width: 200, height: 100}}>
      <Text>va me chercher une canette</Text></View>
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
});
