import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { GameProvider } from './src/contexts/Game';
import { Tabs } from './src/routes';
import { NavigationContainer } from '@react-navigation/native';

const config = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
};

const customTheme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <NavigationContainer>
        <GameProvider>
          <Tabs />
        </GameProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
