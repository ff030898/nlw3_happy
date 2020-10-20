import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrphanageMaps from './pages/OrphanageMaps/OrphanageMaps';
import DetailOrphanage from './pages/DetailOrphanage/DetailOrphanage';
import SelectMapPosition from './pages/SelectedMapPosition';
import OrphanageData from './pages/OrphanageData';
import Header from './pages/Components/Header';


const { Navigator, Screen } = createStackNavigator();

const Routes = () => {

    return (
        <NavigationContainer>
            <Navigator
                screenOptions={
                    {
                        headerShown: false,
                        cardStyle:
                            { backgroundColor: '#f2f3f5' }
                    }}>

                <Screen
                    name="OrphanageMaps"
                    component={OrphanageMaps} />

                <Screen name="DetailOrphanage"
                    component={DetailOrphanage}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato" />
                    }}

                />
                <Screen name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Orfanato" />
                    }}
                />
                <Screen name="OrphanageData"
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Orfanato" />
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );

}
export default Routes;