import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../screens/home/Dashboard';
import ProductDetails from '../screens/details/ProductDetails';
import Bags from '../screens/details/Bags';
import Like from '../screens/heart/Like';
import FillAddress from '../screens/address/FillAddress';
import PaymentGate from '../screens/payment/PaymentGate';
import OrderSuccess from '../screens/payment/OrderSuccess';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Bags" component={Bags} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Like" component={Like} />
      <Stack.Screen name="FillAddress" component={FillAddress} />
      <Stack.Screen name="PaymentGate" component={PaymentGate} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
