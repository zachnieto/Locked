import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import fire from '../fire'
import firebase from 'firebase';

export default function Account({ navigation, route }) {

    var database = firebase.firestore()

    const getUser = (uid) => {

        database.collection('users')
        .doc(uid)
        .get()
        .then((doc) => {
            if (doc.exists) {
                console.log("Name", doc.data().name);
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
        // const authListener = () => {
        //   fire.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         getUser(route.params.uid);
        //     }
        //   });
        // };
        //authListener();

        if (route.params?.uid) {
            getUser(route.params.uid)
        }

      }, [route.params?.uid]);

    return (
        
        <View style={styles.container}>
            <Button title="Logout" onPress={handleLogout}/>
        </View>
        
    )
    
}


const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
})
