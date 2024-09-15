import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import colors from "../../styles/colors";
import { Welcome } from "../pages/welcome";
import { UserIdentification } from "../pages/UserIdentification";
import { Confirmation } from "../pages/Confirmation";
import { PlanSelect } from "../pages/PlantSelect";

const Stack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, 
                contentStyle: {
                    backgroundColor: colors.white
                },
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={Welcome}
            />
            <Stack.Screen
                name="UserIdentification"
                component={UserIdentification}
            />
            <Stack.Screen
                name="Confirmation"
                component={Confirmation}
            />
            <Stack.Screen
                name="PlantSelect"
                component={PlanSelect}
            />
        </Stack.Navigator>
    )
}

export default AppRoutes
