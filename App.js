import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import processscreen from './screens/process'
import about from './screens/about.js'
import splashPic from './splah.jpeg';
import {
  Image,
  StyleSheet,
  View,
  } from 'react-native';


function splashScreen({ navigation }) {
  setTimeout(() => {
    navigation.replace('Choose Your Image')
  }, 3000);
  return (
    <View style = {{
      backgroundColor : "white",
      justifyContent : 'center',
        alignItems : 'center' , 
        flex : 1
    }}>
      <Image
      source = {splashPic} 
      style = {{ 
        marginLeft : 80,
        width : 250 , 
        height : 370 ,
        
      }}
      />
    </View>
  )


}
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="splashscreen" component={splashScreen} options={{
          headerShown : false,
        }}/>
        <Stack.Screen name="Choose Your Image" component={processscreen}
        //  options = {{
        //   headerShown :false }} 
          />
        <Stack.Screen name ="About The App" component = {about} 
        // options = {{
        //   headerShown :false }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  splash : {
        
        color : "black" , 
        fontSize : 25 , 
        fontStyle : "italic"

  } , 
  splashback : {

    backgroundColor: "black",
      justifyContent: 'center',
      alignItems: 'center',
  }
});


export default App;










