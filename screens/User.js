import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';
import { useEffect } from 'react';
import { COLORS } from '../constants';


const User = () => {

    return <SafeAreaView style={styles.container}>
        <View style={styles.userBadge}>

        </View>
    </SafeAreaView>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    userBadge: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        alignItems: 'center',
    },
    displayName: {
        fontSize: 16,
    },
    profilePicture: {
        width: 38,
        height: 38,
        borderRadius: 38,
        marginRight: 10,
    }
})
export default User;