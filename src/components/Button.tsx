import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    TouchableOpacityProps,
    ViewStyle,
    TextStyle
} from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    disabled?: boolean; // Adicione a propriedade disabled
}

export function Button({ title, disabled = false, style, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.container, disabled && styles.containerDisabled, style]} // Aplique o estilo condicionalmente
            {...rest}
            disabled={disabled} // Desative o toque quando o botão estiver desativado
        >
            <Text style={[styles.text, disabled && styles.textDisabled]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerDisabled: {
        backgroundColor: colors.bgDisabled, 
    },
    text: {
        fontFamily: fonts.text,
        fontSize: 16,
        color: colors.green_light,
    },
    textDisabled: {
        color: colors.textDisabled, 
    }
});
