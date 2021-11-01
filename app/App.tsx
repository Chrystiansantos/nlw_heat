import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { Home } from './src/pages/Home';
import { AuthProvider } from './src/hooks/auth';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Home />
    </AuthProvider>
  );
}
