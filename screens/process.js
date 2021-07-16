import React, { useState } from 'react';
import { launchCamera ,launchImageLibrary } from 'react-native-image-picker';
import Contacts from 'react-native-contacts'; 
// import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from 'react-native-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
import { createStackNavigator } from '@react-navigation/stack';
import ImagePicker from 'react-native-image-crop-picker';
import icon from '../finall.jpg'
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

const App = ({navigation}) => {
  const [email, Setemail] = useState('');
  const [phonenumber, Setphonenumber] = useState('');
  const [name, Setname] = useState('')
  const [showmodal, Setshowmodal] = useState(false)
  const [showMe, Setshowme] = useState(false)
const openCamera = () => {
  
ImagePicker.openCamera({
  width: 250,
  height: 150,
  cropping: true, 
  includeBase64 : true
}
).then(response => { 
  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    
    Setshowme(true)
    console.log("camer here")
    console.log(response["data"])
    let opencameraurl = response["data"]
    fetch('http://192.168.0.105:5000/hello',
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            'Accept': "application/json"
          },
          body: JSON.stringify({ encoded: opencameraurl })
        // console.log("s")
  
        }
      )
        .then(extractedData => {
          return extractedData.json()
        })
        .then(extractedData2 => {
  
          Setname(extractedData2["name:"])
          Setemail(extractedData2["email:"])
          Setphonenumber(extractedData2["phno:"])
          
          Setshowmodal(true)
  
          Setshowme(false)
        })
        .catch(err => {
          console.log('an error occured at the server', err.message);
        });
  

  }
 



});


  
}
  const openPicker = () => {
    // Setshowmodal(false)
    launchImageLibrary(
      {
        // noData: true,
        mediaType: 'photo',
        saveToPhotos: true,
        includeBase64: true,
      }, (response) => {
        // console.log('Response = ', response.assets[0]["base64"]);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          
          Setshowme(true)

          let baseurl = response.assets[0]["base64"];
          extract(baseurl);


        }


      });

  }
  const extract = async (baseurl) => {

    fetch('http://192.168.0.105:5000/hello',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Accept': "application/json"
        },
        body: JSON.stringify({ encoded: baseurl })

      }
    )
      .then(extractedData => {
        return extractedData.json()
      })
      .then(extractedData2 => {

        Setname(extractedData2["name:"])
        Setemail(extractedData2["email:"])
        Setphonenumber(extractedData2["phno:"])
        
        Setshowmodal(true)

        Setshowme(false)
      })
      .catch(err => {
        console.log('an error occured at the server', err.message);
      });


  }

  return (
    <View>

      <View>

        <Image source = {icon} style = {{
          position :'absolute'
        }}>

        </Image>
      </View>

      

      <View
        style={{
            
          alignItems: 'center',
          marginTop : 270,
        
        }}
      >

        <Button title="Pick Image From Gallery" onPress={openPicker} /> 
        <View style = {{
          marginTop : 40
        }}
        >

        
        <Button title = "Open Camera" onPress = {openCamera} />

        </View>
        <View style = {{
          marginTop : 40, }} >
        <Button title = "About app"  onPress={() => navigation.navigate('About The App')} />
        </View>
        
        <View  style = {{
          marginTop : 20 , 
          
        }}>
         
            <ActivityIndicator
              animating={showMe}
              // color='#1E90FF' , 
              color = "white"
              size="large"
            /> 
        </View>


      </View>
      <Modal
        visible={showmodal}
        onRequestClose={() => {
          Alert.alert("Process cancelled. Try again.");
          Setshowmodal(!{ showmodal });
        }}
      >
        <View style={{
          backgroundColor: 'yellow'
        }}>

          
          <Text style={{ color: "black" }}>                                           CONTACT DETAILS</Text>
        </View>

        <View style={{
          // flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          backgroundColor: "black"

        }} >
          <View style={{
            backgroundColor: "#1E90FF",
            width: 70,
            marginTop: 40
          }}>

            <Text style={{
              color: "white",
              fontSize: 20,
              
            }}>
              Name :
            </Text>
          </View>
          <View>
            <Text style={styles.yo}> {name}</Text>

          </View>
          <View style={{
            backgroundColor: "#1E90FF",
            width: 85,
            marginTop: 40
          }}>
            <Text style={{
              color: "white",
              fontSize: 20
            }}>
              Contact :
            </Text>
          </View>
          <View>
            <Text style={styles.yo}> {phonenumber}</Text>

          </View>

          <View style={{
            backgroundColor: "#1E90FF",
            width: 83,
            marginTop: 40
          }}>
            <Text style={{
              color: "white",
              fontSize: 20
            }}>
              Email-id :
            </Text>
          </View>
          <View>
            <Text style={styles.yo}> {email}</Text>

          </View>


        </View>
        <View style={{
          flex: 2,
          backgroundColor: "black"
        }}>

          <View style={{
             marginLeft: 150,
              width: 100 ,
              marginTop : 30

             }}>
            <Button title="Add to contacts"
            onPress = {
              () => {
                var newPerson = {
                    emailAddresses: [{
                      label: "work",
                      email: {email}["email"],  
                    }],
                    
                    displayName: {name}["name"],

                    phoneNumbers: [{
                      label: 'mobile',
                      number: {phonenumber}["phonenumber"]
                    }]
                  }
                  // console.log({name}["name"] ,{email} ,{phonenumber})
                  Contacts.openContactForm(newPerson).then(contact => {
                    
                  })

              }
            }
            ></Button>

          </View>
        </View>


      </Modal>





    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: "black",
    marginTop: 32,
    paddingHorizontal: 24,
  },
  yo: {
    color: "white",
    fontStyle: "italic",
    marginTop: 25,
    fontSize: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  displaypage: {
    backgroundColor: "black",
    color: "red",
    // flex : 1 , 
    marginTop: 300,
    marginLeft: 100,
    justifyContent: 'center',
    textAlign: 'center'
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;










