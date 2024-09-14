import React from "react";
import { Text,View, StyleSheet } from "react-native";

import {
    useFonts,
    Jost_400Regular,
    Jost_600SemiBold
} from '@expo-google-fonts/jost'
import Routes from "./src/routes";

export default function App(){
    const [fontsLoaded] = useFonts({
        Jost_400Regular,
        Jost_600SemiBold
    });
    

    return(
       <Routes/>   
    )
}