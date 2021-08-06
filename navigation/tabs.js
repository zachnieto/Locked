import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import fire from '../fire'

import Account from '../screens/account';
import Chat from '../screens/chat';
import Swipe from '../screens/swipe';

const Tab = createBottomTabNavigator();

const Tabs = () => {

    let locked = true

    fire.firestore().collection('users').doc(fire.auth().currentUser.uid).get()
      .then((doc) => {
        if (doc.exists) {
          locked = doc.data().match != ''
        }
    })
    
    return (
        <Tab.Navigator>
            { locked ? <Tab.Screen name="Chat" component={Chat} /> : <Tab.Screen name="Swipe" component={Swipe} /> }
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>

    );
}

export default Tabs;
