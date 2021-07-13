import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef} from 'react';
import {  Text, View, TouchableOpacity } from 'react-native';
import {css} from './assets/css/css';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from './config'
import MapViewDirections from 'react-native-maps-directions';
import { MaterialIcons } from '@expo/vector-icons'

export default function App() {

  const mapEl = useRef(null)
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
      (async function(){
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        console.log(location)
        setOrigin({
          latitude: -3.760023477809091, 
          longitude: -38.48159892854424,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        });
      })();
  },[] )
  return (
    <View style={css.container}>
       <MapView style={css.map}
          initialRegion={origin}
          showsUserLocation={true}
          zoomEnabled={false}
          loadingEnabled={true}
          ref={mapEl}
        >
          {destination && 
            <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={config.googleApi}
            strokeWidth={3}
            onReady={result=> {
              setDistance(result.distance)
              setPrice(result.distance * 5)
              mapEl.current.fitToCoordinates(
                result.coordinates,{
                  edgePadding:{
                    top:50,
                    bottom:50,
                    left:50,
                    right:50
                  }

                }
              )
              console.log(result)
            }}
          />
          }
           
        </MapView>  
        <View style={css.search}>
       
          <GooglePlacesAutocomplete
            placeholder='Para onde vamos?'
            onPress={(data, details = null) => {
              console.log(data, details);
              setDestination({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
              });
              console.log(destination);
            }}
            query={{
              key: config.googleApi,
              language: 'pt-br',
            }}
            enablePoweredByContainer={false}
            fetchDetails={true}
            styles={{
              listView:{backgroundColor:'#fff', zIndex:10},
              container:{position:'absolute', width:'100%'}
            }}
          />
           {distance &&
          <View style={css.distance}>
            <Text  style={css.distance__text}>Distância: {distance.toFixed(2).replace('.', ',')}m</Text>
            <TouchableOpacity style={css.price}>
              <Text  style={css.price__text}><MaterialIcons name='payment' size={24} color="white" /> Pagar R$ {price.toFixed(2).replace('.', ',')}</Text>
            </TouchableOpacity>
          </View>  
        }
        </View>
       
    </View>
  );
}

