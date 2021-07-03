import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';
import Geolocation from '@react-native-community/geolocation';

export default function SignUp({ navigation, route }) {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [ageError, setAgeError] = useState('');


    var database = firebase.firestore()

    const addUserInfo = async () => {

        if (age < 18 || age > 100) {
            setAgeError('Age must be between 18 and 100')
            return
        }

        console.log("Added user info");

        Geolocation.getCurrentPosition(info => console.log(info));

        let uid = firebase.auth().currentUser.uid

        database.collection('users').doc(uid).set({
            email: route.params.email,
            name: name,
            age: age,
            //latitude: location.latitude,
            //longitude: location.longitude
        })
        .then(
            navigation.navigate("Home", { 
                screen: 'Account',
                params: { 
                    uid: uid 
                },
            }));
    };

    const handleLogout = () => {
        firebase.auth().signOut();
        navigation.navigate("Login");
      }

    return (
        <LinearGradient style={styles.container}
            colors={['#ff0092', '#7520c3', '#00d4ff']}
        >
            <View>
                <Text style={styles.text}>Name</Text>
                <TextInput style={styles.input} type="text" autoFocus required value={name} onChangeText={setName} />
                <Text style={styles.text}>Age</Text>
                <TextInput style={styles.input} type="text" keyboardType="numeric" autoFocus required value={age} onChangeText={setAge} />
                <Text>{ageError}</Text>
                <View style={styles.space} />
                <Pressable style={styles.btn} onPress={addUserInfo}>
                    <Text style={styles.text}>SIGN UP</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={handleLogout}>
                    <Text style={styles.text}>CANCEL</Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 24,
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems:'center',
        justifyContent:'center'
      },
      text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
      },
      appName: {
        color: 'white',
        textAlign: 'center',
        fontSize: 50
      },
      btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: 'transparent',
        marginTop: 20
      },
      input: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        paddingLeft: 10,
        fontSize: 20,
        borderColor: 'white',
        color: 'white'
      }
});