import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import "@/global.css";
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function RootLayout() {
  const colorScheme = useColorScheme(); // Pega o tema do dispositivo
  
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // if (!loaded) {
  //   // Async font loading only occurs in development.
  //   return null;
  // }

// import type { Theme } from '../types';
// import { fonts } from './fonts';

// export const DefaultTheme: Theme = {
//   dark: false,
//   colors: {
//     primary: 'rgb(0, 122, 255)',
//     background: 'rgb(0, 0, 242)',
//     card: 'rgb(255, 255, 255)',
//     text: 'rgb(28, 28, 30)',
//     border: 'rgb(216, 216, 216)',
//     notification: 'rgb(255, 59, 48)',
//   },
//   fonts,
// };




  // const FormTheme: Theme = {
  //   ...DefaultTheme,
  //   dark: false,
  //   colors: {
  //     background: "#7F22FE",
  //     primary: 'rgb(0, 122, 255)',
  //     card: 'rgb(255, 255, 255)',
  //     text: 'rgb(28, 28, 30)',
  //     border: 'rgb(216, 216, 216)',
  //     notification: 'rgb(255, 59, 48)',
  //   }, 
  // }


  return (
    // Fazer essas 2 tags nos componentes separador,
    // Deixar somente Stacks
    <SafeAreaProvider>
        {/* <ThemeProvider value={FormTheme}> */}
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack 
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name='index'/>
          </Stack>

          <StatusBar style="light" />
        </ThemeProvider>
    </SafeAreaProvider>
  );
}
