import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setAddress } from '../../store/slices/checkoutSlice';
import { selectTotalAmount } from '../../store/slices/cartSlice';

const FillAddress = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const savedAddress = useAppSelector(state => state.checkout.address);
  const totalAmount = useAppSelector(selectTotalAmount);

  const [form, setForm] = useState(savedAddress);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Name is required';
    }

    if (!/^\d{10}$/.test(form.phone.trim())) {
      nextErrors.phone = 'Enter valid 10-digit phone';
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      nextErrors.pincode = 'Enter valid 6-digit pincode';
    }

    if (!form.addressLine.trim()) {
      nextErrors.addressLine = 'Address is required';
    }

    if (!form.city.trim()) {
      nextErrors.city = 'City is required';
    }

    if (!form.state.trim()) {
      nextErrors.state = 'State is required';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) {
      return;
    }

    dispatch(setAddress(form));
    navigation.navigate('PaymentGate', { totalAmount });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Address</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={form.fullName}
            onChangeText={value => updateField('fullName', value)}
            placeholder="Enter your name"
          />
          {errors.fullName ? (
            <Text style={styles.error}>{errors.fullName}</Text>
          ) : null}

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={form.phone}
            onChangeText={value => updateField('phone', value)}
            placeholder="10-digit mobile number"
            keyboardType="phone-pad"
            maxLength={10}
          />
          {errors.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}

          <Text style={styles.label}>Pincode</Text>
          <TextInput
            style={styles.input}
            value={form.pincode}
            onChangeText={value => updateField('pincode', value)}
            placeholder="6-digit pincode"
            keyboardType="number-pad"
            maxLength={6}
          />
          {errors.pincode ? (
            <Text style={styles.error}>{errors.pincode}</Text>
          ) : null}

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={form.addressLine}
            onChangeText={value => updateField('addressLine', value)}
            placeholder="House no, street, area"
            multiline
          />
          {errors.addressLine ? (
            <Text style={styles.error}>{errors.addressLine}</Text>
          ) : null}

          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={form.city}
            onChangeText={value => updateField('city', value)}
            placeholder="City"
          />
          {errors.city ? <Text style={styles.error}>{errors.city}</Text> : null}

          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            value={form.state}
            onChangeText={value => updateField('state', value)}
            placeholder="State"
          />
          {errors.state ? <Text style={styles.error}>{errors.state}</Text> : null}
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
            <Text style={styles.continueText}>
              Continue to Payment · ₹{totalAmount}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FillAddress;

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
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  form: { padding: 20, paddingBottom: 120 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  textArea: { minHeight: 90, textAlignVertical: 'top' },
  error: { color: '#E53935', fontSize: 12, marginTop: 4 },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  continueBtn: {
    height: 55,
    borderRadius: 30,
    backgroundColor: '#3F51FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
