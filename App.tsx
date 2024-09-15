import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
    useFonts,
    Jost_400Regular,
    Jost_600SemiBold
} from '@expo-google-fonts/jost'
import Routes from "./src/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
    const [fontsLoaded] = useFonts({
        Jost_400Regular,
        Jost_600SemiBold
    });


    return (
        <SafeAreaProvider>
            <GestureHandlerRootView>
                <Routes />
            </GestureHandlerRootView>
        </SafeAreaProvider>

    )
}