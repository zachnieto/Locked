import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import fire from '../fire'
import firebase from 'firebase';

export default function Account({ navigation, route }) {

    var database = firebase.firestore()
    

    const [name, setName] = useState('');
    const [age, setAge] = useState('');


    const handleLogout = () => {
        fire.auth().signOut();
        navigation.navigate("Login");
    }

    useEffect(() => {

        console.log(route.params)

        setName(route.params.user.name)
        setAge(route.params.user.age)

      }, [route.params]);

    return (
        
        <View style={styles.container}>
            <Text>Name {name}</Text>
            <Text>Age {age}</Text>
            <Button title="Logout" onPress={handleLogout}/>
        </View>
        
    )
    
}


const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
})
