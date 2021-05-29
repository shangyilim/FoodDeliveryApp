import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    FlatList,
    Platform,
    Text

} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
    restaurantData,
    initialCurrentLocation,
    categoryData
} from '../data/restaurantData'
import { icons, images, SIZES, COLORS, FONTS } from '../constants';
import { NavigationContainer } from '@react-navigation/native';
import Restaurant from '../components/Restaurant';

const Home = ({ navigation }) => {

    const [categories, setCategories] = useState(categoryData);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [restaurants, setRestaurants] = useState(restaurantData)
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation)

    function onSelectCategory(category) {
        let restaurantsList = category.id === 'all' ? restaurantData : restaurantData.filter(a => a.categories.includes(category.id))
        setRestaurants(restaurantsList);
        setSelectedCategory(category);
    }



    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50, marginTop: Platform.OS == "android" ? 35 : 0 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        height: "100%",
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.nearby}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />

                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        width: "70%",
                        height: "90%",
                        backgroundColor: COLORS.lightGray3,
                        alignItems: "center",
                        justifyContent: 'center',
                        borderRadius: SIZES.radius
                    }}>
                        <Text style={{ ...FONTS.h3 }}>{initialCurrentLocation.streetName}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{
                    width: 50,
                    height: "100%",
                    paddingRight: SIZES.padding * 2,
                    justifyContent: "center"
                }}>
                    <Image
                        source={icons.location}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        marginLeft: SIZES.padding,
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding,
                        backgroundColor: (selectedCategory?.id === item.id ? COLORS.primary : COLORS.white),
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        ...styles.shadow
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View style={{
                        backgroundColor: (selectedCategory?.id === item.id ? COLORS.white : COLORS.lightGray),
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: "center"
                    }}>
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />

                    </View>
                    <Text style={{
                        color: (selectedCategory?.id === item.id ? COLORS.white : COLORS.black),
                        marginTop: SIZES.padding,
                        ...FONTS.body5,
                        fontWeight: "bold"
                    }}>{item.name}</Text>

                </TouchableOpacity>
            )
        }
        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h2 }}>Categories</Text>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}

                />
            </View>
        )
    }

    function renderRestaurantList() {

        const renderItem = ({ item }) => {

            return <Restaurant
                item={item}
                onPress={() => navigation.navigate('Restaurants', {
                    item,
                    currentLocation
                })} />


        }

        return (
            <FlatList
                data={restaurants}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30,
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* { renderHeader()} */}
            { renderMainCategories()}
            { renderRestaurantList()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})
export default Home;