import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, ImageStore, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import mapMarkerImg from '../../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute } from "@react-navigation/native";
import api from '../../services/api';

import styles from './styles';

interface Orphanage {
    latitude: number;
    longitude: number;
    name: string;
    about: string;
    whatsapp: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: string;
    images: Array<{
        id: number;
        url: string;
    }>;
}

interface OrphanageParams {
    id: string;
}

function DetailOrphanage() {

    const route = useRoute();

    const [orphanage, setOrphanage] = useState<Orphanage>();

    const params = route.params as OrphanageParams;

    useEffect(() => {
        api.get(`orphanages/${params.id}`).then(response => {
            setOrphanage(response.data);
            
        })
    }, [params.id]);

    if (!orphanage?.images ) {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Carregando...</Text>
            </View>
        );
    }

    function handleWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${orphanage?.whatsapp}&text=Tenho interesse em ter aulas`);
    }

    function handleGoogleMaps(){
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${orphanage?.latitude},${orphanage?.longitude}`)
    }
    
    return (

        <ScrollView style={styles.container}>

            <View style={styles.imagesContainer}>
                <ScrollView horizontal pagingEnabled>

                    {orphanage.images.map(image => {
                        return (
                            <Image
                                key={image.id}
                                style={styles.image}
                                source={{ uri: image.url }} />
                        )
                    })}
                </ScrollView>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{orphanage.name}</Text>
                <Text style={styles.description}>{orphanage.about}</Text>

                <View style={styles.mapContainer}>
                    <MapView
                        initialRegion={{
                            latitude: orphanage.latitude,
                            longitude: orphanage.longitude,
                            latitudeDelta: 0.008,
                            longitudeDelta: 0.008,
                        }}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        scrollEnabled={false}
                        rotateEnabled={false}
                        style={styles.mapStyle}
                    >
                        <Marker
                            icon={mapMarkerImg}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude
                            }}
                        />
                    </MapView>

                    <View style={styles.routesContainer}>
                        <Text style={styles.routesText} onPress={handleGoogleMaps}>Ver rotas no Google Maps</Text>
                    </View>
                </View>

                <View style={styles.separator} />

                <Text style={styles.title}>Instruções para visita</Text>
                <Text style={styles.description}>{orphanage.instructions}</Text>

                <View style={styles.scheduleContainer}>
                    <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
                        <Feather name="clock" size={40} color="#2AB5D1" />
                        <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>{orphanage.opening_hours}</Text>
                    </View>
                    {orphanage.open_on_weekends ? (
                        <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
                            <Feather name="info" size={40} color="#39CC83" />
                            <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos fim de semana</Text>
                        </View>
                    ) : (
                            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
                                <Feather name="info" size={40} color="#ff669d" />
                                <Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não Atendemos fim de semana</Text>
                            </View>
                        )}
                </View>

                <RectButton style={styles.contactButton} onPress={handleWhatsApp}>
                    <FontAwesome name="whatsapp" size={24} color="#FFF" />
                    <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>
            </View>

        </ScrollView>

    );
}

export default DetailOrphanage;