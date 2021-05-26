import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import { COLORS } from '../constants';

const Login = () => {



    return <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Welcome to FoodDelivery</Text>
        <Text style={styles.subtitle}>Start ordering food now by logging in below:</Text>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: 28,
        color: COLORS.darkgray,
        marginVertical: 20,
    },
    subtitle: {
        fontSize: 16,
        marginVertical: 20,
    }
})
export default Login;