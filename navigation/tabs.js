import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Account from '../screens/account';
import Chat from '../screens/chat';
import Swipe from '../screens/swipe';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Swipe" component={Swipe} />
            <Tab.Screen name="Chat" component={Chat} /> 
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>

    );
}

export default Tabs;
