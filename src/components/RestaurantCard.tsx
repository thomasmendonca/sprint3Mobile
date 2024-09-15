// components/RestaurantCard.tsx
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import colors from "../../styles/colors";

interface RestaurantCardProps {
    id: string;
    name: string;
    rating: number;
    type: string;
    image?: string;
    distance: number;
    description: string;
    isActive: boolean;
    onPress: (id: string) => void;
}

export function RestaurantCard({
    id,
    name,
    rating,
    type,
    distance,
    image,
    description,
    isActive,
    onPress
}: RestaurantCardProps) {
    return (
        <TouchableOpacity
            onPress={() => onPress(id)}
            style={[styles.card, isActive && styles.activeCard]}
        >
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detail}>⭐ {rating.toFixed(1)}</Text>
                    <Text style={styles.detail}>• {type}</Text>
                    <Text style={styles.detail}>• {distance} km</Text>
                </View>
                <Text style={styles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        marginVertical: 8,
        marginHorizontal: 16,
        overflow: 'hidden',
        padding: 10,
    },
    activeCard: {
        borderColor: colors.green,
        borderWidth: 2,
    },
    image: {
        height: Dimensions.get("window").width * 0.25,
        width: Dimensions.get("window").width * 0.4
    },
    infoContainer: {
        flex: 1,
        paddingHorizontal:15,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    detailsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    detail: {
        fontSize: 14,
        color: colors.green_dark,
        marginRight: 10,
    },
    description: {
        fontSize: 14,
        color: colors.body_dark,
    },
});
