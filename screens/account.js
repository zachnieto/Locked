import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import fire from '../fire'
import firebase from 'firebase';

export default function Account({ navigation, route }) {

    var database = firebase.firestore()
    

    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const getUser = (uid) => {

        database.collection('users')
        .doc(uid)
        .get()
        .then((doc) => {
            if (doc.exists) {
                setName(doc.data().name)
                setAge(doc.data().age)
            }
            else {
                console.log("Couldnt get user data");
            }
        });
    }

    const handleLogout = () => {
        fire.auth().signOut();
        navigation.navigate("Login");
    }

    useEffect(() => {

        if (route.params?.uid) {
            getUser(route.params.uid)
        }

      }, [route.params?.uid]);

    return (
        
        <View style={styles.container}>
            <Text>{name}</Text>
            <Text>{age}</Text>
            <Button title="Logout" onPress={handleLogout}/>
        </View>
        
    )
    
}


const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
})
