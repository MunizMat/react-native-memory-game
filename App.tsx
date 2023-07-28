import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { GameProvider } from './src/contexts/Game';
import { Tabs } from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { SettingsProvider } from './src/contexts/Settings';

const config = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
};

const customTheme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <NavigationContainer>
        <SettingsProvider>
          <GameProvider>
            <Tabs />
          </GameProvider>
        </SettingsProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
