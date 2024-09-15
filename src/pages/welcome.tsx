import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Dimensions
} from "react-native";

import { Entypo, Feather } from '@expo/vector-icons'

import wateringImg from '../assets/watering.png';
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { useNavigation } from '@react-navigation/native';

import { Button } from "../components/Button";


export function Welcome() {

    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate("UserIdentification")
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Descubra {'\n'}
                    seus pratos favoritos {'\n'}
                    com facilidade !
                </Text>

                <Image
                    source={wateringImg}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.subtitle}>
                    Não se perca mais nas opções. {'\n'}
                    Nós te ajudamos a encontrar {'\n'}
                    suas comidas preferidas e 
                    os melhores restaurantes perto de você usando IA.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleStart}

                >
                    <Text>
                        <Feather
                            name="chevron-right"
                            style={styles.buttonIcon}
                        />
                    </Text>
                </TouchableOpacity>



            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,


        },
        wrapper: {
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
            paddingHorizontal: 20,
        },
        title: {
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            color: colors.heading,
            marginTop: 38,
            fontFamily: fonts.heading,
            lineHeight: 34,

        },
        subtitle: {
            textAlign: "center",
            fontSize: 18,
            paddingHorizontal: 20,
            color: colors.heading,
            fontFamily: fonts.text

        },

        image: {
            height: Dimensions.get("window").width * 0.7,
            width: Dimensions.get("window").width * 0.7,
            borderRadius: 500,

        },
        button: {
            backgroundColor: colors.green,
            justifyContent: 'center',
            alignItems: "center",
            borderRadius: 5,
            marginBottom: 10,
            height: 56,
            width: 56,

        },
        buttonIcon: {
            color: colors.white,
            fontSize: 32,

        },


    }
)