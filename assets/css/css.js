import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const css = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map:{
        height: '60%',
        width: width,
    },
    search:{
        height: '40%',
        width: width,
    },
    distance:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10
    },
    distance__text:{
      fontSize:20,
      fontWeight:'bold'
    },
    price:{
      backgroundColor: 'black',
      padding:7,
      borderRadius:4,
      marginTop:30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    price__text:{
      color:'white',
      fontSize:20,
      fontWeight:'bold'

    },
  });

export {css};  
  