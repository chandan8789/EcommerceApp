import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { useAppDispatch } from '../../store/hooks';
import { resetCheckout } from '../../store/slices/checkoutSlice';

const OrderSuccess = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const { orderId, totalAmount, itemCount, address } = route.params || {};

  const handleGoHome = () => {
    dispatch(resetCheckout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Text style={styles.checkIcon}>✓</Text>
        </View>

        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.subtitle}>
          Your order has been confirmed and will be delivered soon.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardRow}>Order ID: {orderId}</Text>
          <Text style={styles.cardRow}>Items: {itemCount}</Text>
          <Text style={styles.cardRow}>Amount Paid: ₹{totalAmount}</Text>
          <Text style={styles.cardRow}>
            Deliver to: {address?.fullName}, {address?.city}
          </Text>
        </View>

        <TouchableOpacity style={styles.homeBtn} onPress={handleGoHome}>
          <Text style={styles.homeBtnText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkIcon: { color: '#fff', fontSize: 42, fontWeight: '700' },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
  },
  cardRow: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  homeBtn: {
    marginTop: 28,
    width: '100%',
    height: 55,
    borderRadius: 30,
    backgroundColor: '#3F51FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
