import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity

} from "react-native"
import colors from "../../styles/colors";
import { SafeAreaView } from 'react-native-safe-area-context'
import userImg from '../assets/watering.png'
import fonts from "../../styles/fonts";

export function Header() {
    return (
        <SafeAreaView>
            
            <View style={styles.container}>
                <View style={styles.brand}>
                    <Text style={styles.greeting}>OrderIA</Text>

                </View>
                <TouchableOpacity>
                <View style={styles.assistent}>
                    <Image
                        source={userImg}
                        style={styles.image}
                    />
                    <Text style={styles.textAssistent}>Assistente de Voz</Text>
                </View>
                </TouchableOpacity>
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
        gap: 120,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: colors.green,
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 40,
    },
    brand:{
        flex: 1,
        width:'70%',
        
    },
    assistent:{
        flex:1,
        alignItems: 'center',
        justifyContent :'center',
        gap: 10
    },
    textAssistent:{
        color: colors.green
    }
})