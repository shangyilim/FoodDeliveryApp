import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import { categoryData } from '../data/restaurantData';

const Restaurant = ({
    item,
    onPress
}) => {

    const [photoUrl, setPhotoUrl] = useState();

    return <TouchableOpacity
        style={{ padding: SIZES.padding * 2 }}
        onPress={onPress}
    >
        <View>
            <Image
                source={item.photo}
                resizeMode="cover"
                style={{
                    width: "100%",
                    height: 150,
                    borderRadius: SIZES.radius
                }}
            />

            <View style={{
                position: "absolute",
                bottom: 0,
                height: 50,
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.white,
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                alignItems: "center",
                justifyContent: 'center',
                ...styles.shadow
            }}>
                <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
            </View>
        </View>

        {/* Restaurant Info */}
        <Text style={{ ...FONTS.body2 }}>{item.name}</Text>
        <View style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
        }}>
            <Image
                source={icons.star}
                resizeMode="contain"
                style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.primary,
                    marginRight: 10
                }}

            />
            <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>
            {/* Categories */}
            <View style={{
                flexDirection: 'row',
                marginLeft: 10,
            }}>
                {
                    item.categories.map((categoryId) => {
                        return (
                            <View
                                key={categoryId}
                                style={{
                                    flexDirection: 'row',

                                }}
                            >
                                <Text style={{ ...FONTS.body3, }}>{categoryId}</Text>
                                <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>


                            </View>
                        )
                    })
                }
                {/* Price */}
                {
                    [1, 2, 3].map((priceRating) => {
                        return (
                            <Text
                                key={priceRating}
                                style={{
                                    ...FONTS.h3,
                                    color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                }}
                            >
                                $
                            </Text>
                        )
                    })
                }
            </View>
        </View>
    </TouchableOpacity>
}





const styles = StyleSheet.create({
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

export default Restaurant;