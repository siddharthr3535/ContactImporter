import React, { useState } from 'react';
import * as ImagePicker from "react-native-image-picker";
import { launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import icon from '../maybe.jpg'
import abouttheapp from '../abouttheapp.jpeg'
import {
  StyleSheet,
  Text,
  Button,
  Image,
  View,
  Modal,
  ActivityIndicator,
  Alert
} from 'react-native';
const stack = createStackNavigator(); 

const about = () => 
{
    return (

        <View style = {{
            flex : 1 ,
            // backgroundColor : "white"
        }}>

            <View>
                <Image style = {{
                    position : 'absolute',
                }}
                source = {icon}
                />
            </View>
            <View style = {{
                justifyContent : 'center' , 
                alignContent : 'center',
                marginLeft : 120,
                marginTop : 50
            }}>
                <Image source = {abouttheapp} style = {{
                    backgroundColor : 'transparent'
                }}/>
            </View>

            <View style = {{
                justifyContent : 'center' , 
                alignItems : 'center' , 
                
                backgroundColor: 'rgba(0, 0, 0, 0.4)' ,
                marginRight : 15,
                marginTop : 50
            }}>
                <Text style ={style.font}>
                We Use Image Processing Techniques To Preprocess The Card’s Image, Which Might Have Been Taken From a Difficult Perspective, Unfavorable Lighting Conditions, Or Partial Occlusions.The Text In The Preprocessed Image is Then Extracted Using Optical Character Recognition (OCR) and Parsed To Isolate The Name, Phone Number, and Email Address Of The Contact To Be Automatically Imported In The User’s Address Book.
                </Text>

            </View>
        </View>

    )


}
export default about ;
const style = StyleSheet.create({
    font : {
                    color : "white" , 
                    fontSize : 20 ,
                    fontStyle : "italic" ,
                    fontWeight : 'bold',
                    fontFamily : "monospace"

    }
})