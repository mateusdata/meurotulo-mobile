import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform, useColorScheme } from 'react-native';

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: Platform.OS === 'ios' ? true : undefined, 
          headerStyle: {
            backgroundColor: useColorScheme?.() !== 'dark' ? Colors.primary : undefined

          },
          headerTintColor: useColorScheme?.() !== 'dark' ? "white" : Colors.dark.text,
          headerBlurEffect: Platform.OS === 'ios' ? 'systemChromeMaterial' : undefined,
          headerTitle: 'O que é isso no meu rótulo ?',
        }}
      />
    </Stack>
  );
}