import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';

const Bag = () => {
  const navigation = useNavigation();
  const {
    cartItems,
    updateQuantity,
    toggleSelect,
    deselectAll,
    selectedItems,
    totalAmount,
  } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bag</Text>
        <TouchableOpacity>
          <Text style={styles.heartIcon}>♡</Text>
        </TouchableOpacity>
      </View>

      {/* Delivery Info */}
      <View style={styles.deliveryInfo}>
        <View style={styles.deliveryHeader}>
          <Text style={styles.deliveryTitle}>🚚 Delivering in just 60 min</Text>
          <Text style={styles.dropdown}>▼</Text>
        </View>
        <Text style={styles.address}>
          Full address - 29 Aparna Complex, Gurgaon...
        </Text>
        <Text style={styles.freeDelivery}>
          💙 Yay! Your order is eligible for FREE delivery.
        </Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your bag is empty</Text>
        </View>
      ) : (
        <>
          <TouchableOpacity
            onPress={deselectAll}
            style={styles.deselectContainer}
          >
            <Text style={styles.deselectText}>Deselect all items</Text>
          </TouchableOpacity>

          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={() => toggleSelect(item.id)}
                  style={styles.checkbox}
                >
                  <Text
                    style={item.selected ? styles.checked : styles.unchecked}
                  >
                    {item.selected ? '✔' : '⬜'}
                  </Text>
                </TouchableOpacity>

                <Image
                  source={{
                    uri: item.image || 'https://via.placeholder.com/100',
                  }}
                  style={styles.productImage}
                />

                <View style={styles.itemDetails}>
                  <Text style={styles.productName}>{item.title}</Text>
                  <Text style={styles.desc}>Product description line 1</Text>
                  <Text style={styles.desc}>Product description line 2</Text>

                  <View style={styles.priceRow}>
                    <Text style={styles.currentPrice}>₹{item.price}</Text>
                  </View>

                  <View style={styles.bottomRow}>
                    <TouchableOpacity style={styles.tryBuyButton}>
                      <Text style={styles.tryBuyText}>TRY & BUY</Text>
                    </TouchableOpacity>

                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => updateQuantity(item.id, 'minus')}
                      >
                        <Text style={styles.qtyText}>–</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => updateQuantity(item.id, 'plus')}
                      >
                        <Text style={styles.qtyText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </>
      )}

      {cartItems.length > 0 && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.proceedButton,
              selectedItems.length === 0 && styles.disabledButton,
            ]}
            disabled={selectedItems.length === 0}
          >
            <Text style={styles.proceedText}>
              Proceed to pay ₹{totalAmount}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backIcon: { fontSize: 28 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  heartIcon: { fontSize: 26 },

  deliveryInfo: { padding: 16, backgroundColor: '#f9f9f9' },
  deliveryHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  deliveryTitle: { fontSize: 16, fontWeight: '600' },
  address: { color: '#666', marginTop: 4 },
  freeDelivery: { color: '#0066ff', marginTop: 8 },

  deselectContainer: { padding: 16 },
  deselectText: { color: '#0066ff', fontWeight: '500' },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#666' },

  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  checkbox: { marginRight: 12, marginTop: 10 },
  checked: { fontSize: 22, color: '#0066ff' },
  unchecked: { fontSize: 22, color: '#ccc' },

  productImage: { width: 100, height: 100, borderRadius: 8, marginRight: 12 },
  itemDetails: { flex: 1 },
  productName: { fontSize: 16, fontWeight: '600' },
  desc: { fontSize: 13, color: '#666', marginVertical: 2 },
  priceRow: { flexDirection: 'row', marginTop: 6 },
  currentPrice: { fontSize: 18, fontWeight: '700' },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  tryBuyButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  tryBuyText: { fontSize: 12, fontWeight: '600' },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  qtyButton: { paddingHorizontal: 12, paddingVertical: 4 },
  qtyText: { fontSize: 18, fontWeight: '600' },
  quantity: { paddingHorizontal: 12, fontSize: 16 },

  bottomContainer: { padding: 16, borderTopWidth: 1, borderTopColor: '#eee' },
  proceedButton: {
    backgroundColor: '#0066ff',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  disabledButton: { backgroundColor: '#a0a0a0' },
  proceedText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default Bag;
