import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShiftListScreen from '../screens/ShiftListScreen';
import ShiftDetailsScreen from '../screens/ShiftDetailsScreen';

export type RootStackParamList = {
  List: undefined;
  Details: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ShiftListScreen} options={{title: 'Смены рядом'}} />
        <Stack.Screen name="Details" component={ShiftDetailsScreen} options={{title: 'Детали смены'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;


