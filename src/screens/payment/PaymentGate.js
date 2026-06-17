import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCart } from '../../store/slices/cartSlice';
import {
  selectAddress,
  selectFormattedAddress,
  setLastOrderId,
} from '../../store/slices/checkoutSlice';
import { selectSelectedItems } from '../../store/slices/cartSlice';

const PaymentGate = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectAddress);
  const formattedAddress = useAppSelector(selectFormattedAddress);
  const selectedItems = useAppSelector(selectSelectedItems);
  const totalAmount = route?.params?.totalAmount || 0;

  const [paying, setPaying] = useState(false);

  const handlePay = () => {
    setPaying(true);

    setTimeout(() => {
      const orderId = `ORD${Date.now().toString().slice(-8)}`;
      dispatch(setLastOrderId(orderId));
      dispatch(clearCart());
      setPaying(false);
      navigation.replace('OrderSuccess', {
        orderId,
        totalAmount,
        itemCount: selectedItems.length,
        address,
      });
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order Summary</Text>
        <Text style={styles.rowText}>Items: {selectedItems.length}</Text>
        <Text style={styles.rowText}>Delivery to:</Text>
        <Text style={styles.address}>{formattedAddress}</Text>
        <View style={styles.divider} />
        <Text style={styles.totalLabel}>Total Payable</Text>
        <Text style={styles.totalAmount}>₹{totalAmount}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Method</Text>
        <View style={styles.methodRow}>
          <Text style={styles.methodText}>UPI / Card / Net Banking</Text>
          <Text style={styles.badge}>Demo</Text>
        </View>
        <Text style={styles.note}>
          This is a temporary payment screen for testing checkout flow.
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.payButton, paying && styles.payButtonDisabled]}
          onPress={handlePay}
          disabled={paying}
        >
          {paying ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payText}>Pay ₹{totalAmount}</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentGate;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backText: { fontSize: 24, color: '#111' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
  rowText: { fontSize: 14, color: '#555', marginBottom: 4 },
  address: { fontSize: 14, color: '#111', lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 14 },
  totalLabel: { fontSize: 14, color: '#666' },
  totalAmount: { fontSize: 28, fontWeight: '700', color: '#3F51FF' },
  methodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodText: { fontSize: 15, color: '#111' },
  badge: {
    backgroundColor: '#E8EAFF',
    color: '#3F51FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '700',
  },
  note: { marginTop: 10, fontSize: 13, color: '#777', lineHeight: 18 },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  payButton: {
    height: 55,
    borderRadius: 30,
    backgroundColor: '#3F51FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonDisabled: { opacity: 0.8 },
  payText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
