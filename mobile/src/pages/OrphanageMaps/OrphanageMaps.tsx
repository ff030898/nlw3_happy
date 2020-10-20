import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import mapMarker from '../../images/map-marker.png';
import { Feather } from '@expo/vector-icons';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';

import styles from './styles';


interface Orphanage{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanageMaps() {

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useFocusEffect(() => {
        api.get('orphanages').then(resp => {
            setOrphanages(resp.data)
        });
    })

    const navigation = useNavigation();

    function handleNavigateOrphanageDetail(id: number) {
        navigation.navigate('DetailOrphanage', { id });
    }

    function handleNavigateOrphanageCreate() {
        navigation.navigate('SelectMapPosition');
    }

    return (
        <View style={styles.container}>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -24.0344735,
                    longitude: -46.519436,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}>

                {orphanages.map((orphanage: Orphanage) => {
                    return (
                        <Marker
                        key={orphanage.id}
                        icon={mapMarker}
                        calloutAnchor={{
                            x: 3.7,
                            y: 1.1
                        }}
                        coordinate={{
                            latitude: orphanage.latitude,
                            longitude: orphanage.longitude,
                        }}
                    >
                        <Callout tooltip onPress={() => handleNavigateOrphanageDetail(orphanage.id)}>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>{orphanage.name}</Text>
                            </View>
                        </Callout>
                    </Marker>
                    );
                })}

            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>2 Orfanatos encontrados</Text>
                <TouchableOpacity style={styles.createOrphanageButton} onPress={handleNavigateOrphanageCreate}>
                    <Feather name="plus" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default OrphanageMaps;
