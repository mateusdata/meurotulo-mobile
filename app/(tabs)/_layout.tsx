import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
        headerTransparent: true,
        headerShown: false,
        headerTintColor: "white",
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'O que é isso no meu rótulo?',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size ?? 28} color={color} />,
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, size }) => <Ionicons name="information-circle" size={size ?? 28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contato"
        options={{
          title: 'contato',
          tabBarIcon: ({ color, size }) => <Ionicons name="call" size={size ?? 28} color={color} />,
        }}
      />
    </Tabs>
  );
}
