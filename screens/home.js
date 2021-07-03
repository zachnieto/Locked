import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import fire from '../fire'

export default function Home({ navigation }) {


    const handleLogout = () => {
        fire.auth().signOut();
        navigation.navigate("Login");
      }

    return (
        
        <View style={styles.container}>
            <Text>HOME</Text>
            <Button title="Logout" onPress={handleLogout}/>
        </View>
        
    )
}



const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
})