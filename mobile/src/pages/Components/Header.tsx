import React from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

interface HeaderProps {
    title: string;
    showCancel?: boolean;
}

export default function Header({title, showCancel = true}: HeaderProps) {

    const navigation = useNavigation();

    function handleHomePage(){
        navigation.navigate('OrphanageMaps')
    }

    return (
        <View style={styles.container}>
            <BorderlessButton onPress={navigation.goBack}>
                < Feather name="arrow-left" size={24} color="#15b6d6" />
            </BorderlessButton>

            <Text style={styles.title}>{title}</Text>

            {showCancel ? (
                <BorderlessButton onPress={handleHomePage}>
                < Feather name="x" size={24} color="#ff669d" />
            </BorderlessButton>
            ): <View /> }
            
        </View>
    );
};