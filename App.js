import React, {useState, useEffect, useRef} from "react";
import { StyleSheet, View, Dimensions, Text, Image} from "react-native";
import MapView from "react-native-maps";
import * as Location from 'expo-location';


import customStyle from "./customStyle.js";

export default function Mapa() {
  const [location, setLocation] = useState(null);
  const [type, seType] = useState("standard");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão não concedida!");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);



  return (
    <View style={styles.container}>
        <Text style={styles.texto}>
            V E R  L O C A L
        </Text>
        <Text/>

      <MapView
        customMapStyle={customStyle}
        style={styles.mapStyle}
     region={
          !location
            ? {
                latitude: 74,
                longitude: 18,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
            : {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
        }
        showsUserLocation
        loadingEnabled
        initialRegion={{
          latitude: 0,
          longitude: -0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      </MapView>
      <Text/>
      <Text/>
      <Text/>

      <Image 
      style={styles.img}
     source={require('./assets/marker.png')} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#054F77",
    alignItems: "center",
    justifyContent: "center",
  },

  img: {
    width:  50,
    height: 50,
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: "70%",
  },
  texto: {
    color: '#fff',
    fontSize: 20,
  },
 
});

