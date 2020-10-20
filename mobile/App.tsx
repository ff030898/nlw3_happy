import React from 'react';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import Routes from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <Routes />
      <StatusBar barStyle="dark-content" backgroundColor="#ccc" translucent/>
    </>
  );
}

