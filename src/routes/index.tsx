import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Game } from '../screens/Game';
import { Settings } from '../screens/Settings';
import { useColorMode, useTheme } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  const { colors, fontSizes } = useTheme();
  const { colorMode } = useColorMode();

  const bgColor = colorMode === 'dark' ? colors.dark[50] : colors.dark[900];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: bgColor,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderTopColor: bgColor,
          position: 'absolute',
        },
        headerStyle: {
          backgroundColor: bgColor,
          shadowColor: bgColor,
        },
        headerTitleStyle: {
          color: colorMode === 'dark' ? colors.white : colors.black,
          fontSize: fontSizes['3xl'],
          marginLeft: 30,
          marginBottom: 10,
        },
        headerTitleAlign: 'left',
        tabBarActiveTintColor:
          colorMode === 'dark' ? colors.dark[900] : colors.dark[50],
        tabBarInactiveTintColor: colors.dark[400],
      }}
      sceneContainerStyle={{
        backgroundColor:
          colorMode === 'dark' ? colors.dark[100] : colors.light[200],
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="game-controller" size={size} color={color} />
          ),
        }}
        name="Game"
        component={Game}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
        name="Settings"
        component={Settings}
      />
    </Tab.Navigator>
  );
};
