// Parte 2: Usando a API em React Native

import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "../../styles/colors";
import { Header } from "../components/Header";
import fonts from "../../styles/fonts";
import { RestaurantCard } from "../components/RestaurantCard";

interface RestaurantProps {
    id: string;
    name: string;
    rating: number;
    image: string;
    type: string;
    distance: number;
    description: string;
}

export function PlanSelect() {
    const [activeEnvironment, setActiveEnvironment] = useState<string | null>(null);
    const [activeRestaurantId, setActiveRestaurantId] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [restaurants, setRestaurants] = useState<RestaurantProps[]>([]);
    const [filterOptions, setFilterOptions] = useState<string[]>([]);
    const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isDistanceDropdownOpen, setIsDistanceDropdownOpen] = useState<boolean>(false);

    useEffect(() => {
        async function fetchUserName() {
            try {
                const name = await AsyncStorage.getItem('@user_name');
                setUserName(name);
            } catch (error) {
                console.error('Failed to load name:', error);
            }
        }

        fetchUserName();
    }, []);

    useEffect(() => {
        fetchRestaurants();
    }, [activeEnvironment, selectedDistance]);

    useEffect(() => {
        fetchFilterOptions();
    }, []);

    async function fetchRestaurants() {
        try {
            let url = 'http://192.168.0.11:5000/restaurants'; // Substitua 192.168.X.X pelo IP local da sua máquina
            if (activeEnvironment) {
                url += `?type=${activeEnvironment}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            let filteredData = data;
            if (selectedDistance !== null) {
                filteredData = data.filter((restaurant: RestaurantProps) => restaurant.distance <= selectedDistance);
            }
            setRestaurants(filteredData);
        } catch (error) {
            console.error('Failed to load restaurants:', error);
        }
    }

    async function fetchFilterOptions() {
        try {
            const response = await fetch('http://192.168.0.11:5000/restaurants'); // Substitua 192.168.X.X pelo IP local da sua máquina
            const data: RestaurantProps[] = await response.json();
            const types = Array.from(new Set(data.map(restaurant => restaurant.type)));
            setFilterOptions(['Todos', ...types]);
        } catch (error) {
            console.error('Failed to load filter options:', error);
        }
    }

    const handleEnvironmentPress = (environment: string) => {
        setActiveEnvironment(environment);
    }

    const handleRestaurantPress = (id: string) => {
        setActiveRestaurantId(id);
    }

    const handleDistanceFilterPress = (distance: number | null) => {
        setSelectedDistance(distance);
    }

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <Header />
            <Text style={styles.title}>{userName && <Text style={styles.welcome}>Bem-vindo, {userName}!</Text>}</Text>
            <Text style={styles.subtitle}> Qual prato você gostaria de experimentar hoje?</Text>

            <TouchableOpacity onPress={() => setIsDropdownOpen(!isDropdownOpen)} style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Filtrar por tipo de cozinha</Text>
            </TouchableOpacity>

            {isDropdownOpen && (
                <View style={styles.dropdownContainer}>
                    {filterOptions.map((option) => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => {
                                handleEnvironmentPress(option === 'Todos' ? null : option);
                                setIsDropdownOpen(false);
                            }}
                            style={styles.dropdownItem}
                        >
                            <Text style={styles.dropdownItemText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {activeEnvironment && (
                <Text style={styles.selectedEnvironmentLabel}>
                    Tipo de cozinha selecionado: {activeEnvironment}
                </Text>
            )}

            <TouchableOpacity onPress={() => setIsDistanceDropdownOpen(!isDistanceDropdownOpen)} style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Filtrar por distância</Text>
            </TouchableOpacity>

            {isDistanceDropdownOpen && (
                <View style={styles.dropdownContainer}>
                    {[null, 1, 3, 5, 10].map((distance) => (
                        <TouchableOpacity
                            key={distance !== null ? distance.toString() : 'Todos'}
                            onPress={() => {
                                handleDistanceFilterPress(distance);
                                setIsDistanceDropdownOpen(false);
                            }}
                            style={styles.dropdownItem}
                        >
                            <Text style={styles.dropdownItemText}>
                                {distance !== null ? `Até ${distance} km` : 'Todos'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {selectedDistance !== null && (
                <Text style={styles.selectedDistanceLabel}>
                    Distância selecionada: Até {selectedDistance} km
                </Text>
            )}
        </View>
    )

    const renderRestaurantItem = ({ item }: { item: RestaurantProps }) => (
        <RestaurantCard
            id={item.id}
            name={item.name}
            rating={item.rating}
            type={item.type}
            image={item.image}
            distance={item.distance}
            description={item.description}
            isActive={item.id === activeRestaurantId}
            onPress={handleRestaurantPress}
        />
    )

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={restaurants}
                        keyExtractor={(item) => item.id}
                        renderItem={renderRestaurantItem}
                        ListHeaderComponent={renderHeader}
                        contentContainerStyle={styles.container}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>😞 Sem restaurantes disponíveis</Text>
                            </View>
                        }
                        keyboardShouldPersistTaps="always"
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
    },
    headerContainer: {
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40,
        marginTop: 15,
        
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    welcome: {
        fontFamily: fonts.heading,
        fontSize: 20,
        color: colors.green,
        textAlign: 'center',
        marginVertical: 10,
    },
    filterButton: {
        backgroundColor: colors.green,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    filterButtonText: {
        color: colors.white,
        fontFamily: fonts.heading,
        fontSize: 16,
    },
    dropdownContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginTop: 5,
        padding: 10,
        elevation: 5,
    },
    dropdownItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
    },
    dropdownItemText: {
        fontFamily: fonts.text,
        fontSize: 16,
        color: colors.heading,
    },
    selectedEnvironmentLabel: {
        fontFamily: fonts.heading,
        fontSize: 16,
        color: colors.green,
        textAlign: 'center',
        marginVertical: 10,
    },
    selectedDistanceLabel: {
        fontFamily: fonts.heading,
        fontSize: 16,
        color: colors.green,
        textAlign: 'center',
        marginVertical: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 55,
    },
    emptyText: {
        fontFamily: fonts.text,
        fontSize: 18,
        color: colors.heading,
        textAlign: 'center',
    },
})
