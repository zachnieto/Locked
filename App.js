import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login'
import Tabs from './navigation/tabs'
import SignUp from './screens/signup'

const Stack = createStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }}/>
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}