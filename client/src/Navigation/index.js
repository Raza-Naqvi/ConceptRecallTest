import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Dashboard from '../Screens/Dashboard';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const UserNav = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Dashboard'}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
    )
}

const AuthNav = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Login'}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}

const Navigation = () => {
    const { LoginUser } = useSelector(state => {
        return state?.AuthReducer;
    });

    return (
        <NavigationContainer>
            {LoginUser ? (
                <UserNav />
            ) : (
                <AuthNav />
            )}
        </NavigationContainer>
    )
}

export default Navigation