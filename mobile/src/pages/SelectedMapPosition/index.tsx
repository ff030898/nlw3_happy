import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';

import styles from './styles';

export default function SelectMapPosition() {
    const navigation = useNavigation();

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

    function handleNextStep() {
        navigation.navigate('OrphanageData', { position });
    }

    function handleSelectedMapPosition(event: MapEvent) {
        setPosition(event.nativeEvent.coordinate);
    }

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: -24.0344735,
                    longitude: -46.519436,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
                style={styles.mapStyle}
                onPress={handleSelectedMapPosition}
            >
                {position.latitude != 0 && (
                    <Marker
                    icon={mapMarkerImg}
                    coordinate={{ latitude: position.latitude, longitude: position.longitude }}
                   
                />
                )}
            </MapView>

            <RectButton style={styles.nextButton} onPress={handleNextStep}>
                <Text style={styles.nextButtonText}>Próximo</Text>
            </RectButton>
        </View>
    )
}

