import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "../../styles/colors";
import { Header } from "../components/Header";
import fonts from "../../styles/fonts";
import { RestaurantCard } from "../components/RestaurantCard";
import { EnviromentButton } from "../components/EnviromentButton";

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

    const handleEnvironmentPress = (environment: string) => {
        setActiveEnvironment(environment);
    }

    const handleRestaurantPress = (id: string) => {
        setActiveRestaurantId(id);
    }

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <Header />
            <Text style={styles.title}>{userName && <Text style={styles.welcome}>Bem-vindo, {userName}!</Text>}</Text>
            <Text style={styles.subtitle}> Qual prato você gostaria de experimentar hoje?</Text>
            
            <View style={styles.environmentContainer}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <EnviromentButton
                            title={item}
                            active={item === activeEnvironment}
                            onPress={() => handleEnvironmentPress(item)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>
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
        <FlatList
            data={restaurants}
            keyExtractor={(item) => item.id}
            renderItem={renderRestaurantItem}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.container}
            ListEmptyComponent={<Text>Sem restaurantes disponíveis</Text>}
        />
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
    environmentContainer: {
        marginVertical: 15,
    },
    enviromentList: {
        height: 50,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 10,
    },
})
const restaurants: RestaurantProps[] = [
    { id: '1', name: 'La Bella Italia', rating: 4.5, type: 'Italiana', distance: 1.2, description: 'Autêntica comida italiana com um ambiente acolhedor.', image: 'https://restaurantecosi.com.br/wp-content/uploads/2024/01/restaurante-italiano-sp-1.jpg' },
    { id: '2', name: 'Sushi World', rating: 4.8, type: 'Japonesa', distance: 3.5, description: 'Sushi fresco e pratos tradicionais japoneses.', image: 'https://veganbusiness.com.br/wp-content/uploads/2022/04/sanro-vegetariano.jpeg' },
    { id: '3', name: 'Burger Haven', rating: 4.2, type: 'Hamburgueria', distance: 2.0, description: 'Hambúrgueres gourmet e batatas fritas irresistíveis.', image: 'https://cdn.abrahao.com.br/base/024/d2d/699/nomes-de-hamburguer-para-cardapio.jpg' },
    { id: '4', name: 'Pasta Palace', rating: 4.7, type: 'Italiana', distance: 0.9, description: 'Massas artesanais com receitas familiares.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrrxQd5831GF2593RZlVlsBXdp8PP8ZSeUAQ&s' },
    { id: '5', name: 'Salad Express', rating: 4.3, type: 'Saladas', distance: 1.8, description: 'Saladas frescas e opções saudáveis para qualquer hora do dia.', image: 'https://img.freepik.com/fotos-premium/salada-de-comida-em-restaurante-self-service_538646-6724.jpg' },
    { id: '6', name: 'Sweet Treats', rating: 4.6, type: 'Sobremesas', distance: 2.5, description: 'Deliciosas sobremesas e bolos caseiros.', image: 'https://img.freepik.com/fotos-premium/doces-de-chocolate-fundo-comida-doce-com-varios-recheios_84485-1886.jpg' },
    { id: '7', name: 'Taco Fiesta', rating: 4.4, type: 'Mexicana', distance: 2.3, description: 'Tacos autênticos e pratos mexicanos tradicionais.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFOdESBf_QDcF5L0DWuJMyO3hAHcF_c1rXYw&s' },
    { id: '8', name: 'Café de Paris', rating: 4.6, type: 'Francesa', distance: 1.5, description: 'Delícias da culinária francesa com um toque sofisticado.', image: 'https://baggiocafe.com.br/cdn/shop/articles/TSC_01.jpg?v=1706894812' },
    { id: '9', name: 'Spicy Thai', rating: 4.7, type: 'Tailandesa', distance: 2.8, description: 'Pratos tailandeses picantes e saborosos.', image: 'https://www.baressp.com.br/bares/fotos/seupimenta1.jpg' },


];
const data = [
    'Italiana',
    'Japonesa',
    'Hamburgueria',
    'Saladas',
    'Sobremesas',
    'Mexicana',
    'Chinesa',
    'Tailandesa',
    'Indiana',
    'Grega',
    'Francesa',
    'Vegana',
    'Sushi',
    'Barbecue',
    'Mariscos',
    'Café',
    'Fusion',
    'Middle Eastern',
    'Turca',
    'Brasileira'
];