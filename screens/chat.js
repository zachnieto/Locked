import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Pressable } from 'react-native';

export default function Chat({ navigation }) {

    /*
        firestore().collection("users").doc(userName).onSnapshot(doc -> {
            setBlah(doc.data().blah)
        })

    */


    useEffect(() => {

        if (route.params?.uid) {
            getUser(route.params.uid)
        }

    }, [route.params?.uid]);    

    return (
        <View>
            <Text>Hello</Text>
        </View>
    );
};
