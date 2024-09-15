import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Image

} from "react-native"
import colors from "../../styles/colors";
import { SafeAreaView } from 'react-native-safe-area-context'
import userImg from '../assets/thomas.png'
import fonts from "../../styles/fonts";

export function Header() {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.greeting}>Olá,</Text>
                    <Text style={styles.userName}>Thomas</Text>
                </View>

                <Image 
                source={userImg}
                style={styles.image}
                />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    image:{
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    greeting:{
        fontSize:32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName:{
        fontSize:32,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight:40,
    }
})