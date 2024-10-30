// Parte 2: Página de login em React Native para validação de usuários

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import userImg from '../assets/watering.png'

export function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.0.11:5000/login', { // Substitua 192.168.X.X pelo IP local da sua máquina
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.status === 401) {
                Alert.alert('Erro', 'Credenciais inválidas. Por favor, verifique seu nome de usuário e senha.');
            } else if (response.status === 500) {
                Alert.alert('Erro', 'Erro no servidor. Tente novamente mais tarde.');
            } else if (response.ok) {
                navigation.navigate('UserIdentification');
            } else {
                Alert.alert('Erro', 'Algo deu errado, tente novamente. Código de status: ' + response.status);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
        }
    };



    return (
        <KeyboardAvoidingView
            style={styles.containerAvoiding}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <Image
                    source={userImg}
                    style={styles.image}
                />
                <Text style={styles.title}>Entre na sua conta!</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Usuário"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    containerAvoiding: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,

    },
    title: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 10,
        backgroundColor: colors.white,
    },
    button: {
        backgroundColor: colors.green,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: colors.white,
        fontFamily: fonts.heading,
        fontSize: 16,
    },
    
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: colors.green,
    }
});
