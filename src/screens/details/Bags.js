import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  updateQuantity,
  removeFromCart,
  toggleSelect,
  deselectAll,
  selectCartItems,
  selectTotalAmount,
} from '../../store/slices/cartSlice';
import { selectFormattedAddress } from '../../store/slices/checkoutSlice';
import { formatPrice } from '../../utils/price';

const Bags = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalAmount = useAppSelector(selectTotalAmount);
  const formattedAddress = useAppSelector(selectFormattedAddress);
  const selectedCount = cartItems.filter(item => item.selected).length;

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Image
            source={require('../../assets/images/empty.png')}
            style={styles.emptyImage}
          />

          <Text style={styles.emptyTitle}>Your Bag is Empty</Text>

          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Text style={styles.shopText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleProceedToPay = () => {
    if (selectedCount === 0) {
      Alert.alert('Select items', 'Please select at least one item to proceed.');
      return;
    }

    navigation.navigate('FillAddress');
  };

  const renderItem = ({ item }) => {
    const salePrice = formatPrice(item.price);
    const oldPrice = Math.round(salePrice * 1.4);

    return (
      <View style={styles.productCard}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              !item.selected && styles.checkboxUnchecked,
            ]}
            onPress={() => dispatch(toggleSelect(item.id))}
          >
            {item.selected ? <Text style={styles.tick}>✓</Text> : null}
          </TouchableOpacity>

          <Image source={{ uri: item.image }} style={styles.productImage} />
        </View>

        <View style={styles.productInfo}>
          <Text numberOfLines={1} style={styles.productTitle}>
            {item.title}
          </Text>

          <Text style={styles.productDesc}>Product description line 1</Text>

          <Text style={styles.productDesc}>Product description line 2</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{salePrice}</Text>

            <Text style={styles.oldPrice}>₹{oldPrice}</Text>
          </View>

          <Text style={styles.tryBuy}>
            TRY
            <Text style={{ fontWeight: '700' }}> BUY</Text>
          </Text>

          <View style={styles.qtyContainer}>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => dispatch(removeFromCart(item.id))}
            >
              <Text style={styles.deleteIcon}>🗑</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => dispatch(updateQuantity({ id: item.id, type: 'minus' }))}
            >
              <Text style={styles.qtyText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => dispatch(updateQuantity({ id: item.id, type: 'plus' }))}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icons/arrow.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Bag</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Like')}>
          <Image
            source={require('../../assets/icons/heart.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.deliveryContainer}
        onPress={() => navigation.navigate('FillAddress')}
      >
        <Text style={styles.bike}>🛵</Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.deliveryTitle}>Delivering in just 60 min</Text>

          <Text style={styles.address}>{formattedAddress}</Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <View style={styles.freeContainer}>
        <Text style={styles.freeText}>
          🎉 Yayy! Your order is eligible for FREE delivery.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deselectContainer}
        onPress={() => dispatch(deselectAll())}
      >
        <Text style={styles.deselectText}>Deselect all items</Text>
      </TouchableOpacity>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      />

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.payButton} onPress={handleProceedToPay}>
          <Text style={styles.payText}>Proceed to pay ₹{totalAmount}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Bags;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  header: {
    height: 80,
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },

  headerIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },

  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
  },

  bike: {
    fontSize: 28,
    marginRight: 10,
  },

  deliveryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },

  address: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },

  arrow: {
    fontSize: 20,
    color: '#555',
  },

  freeContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },

  freeText: {
    color: '#3F51FF',
    fontSize: 15,
    fontWeight: '600',
  },

  deselectContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingBottom: 12,
  },

  deselectText: {
    color: '#3F51FF',
    fontSize: 15,
  },

  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },

  imageWrapper: {
    width: 135,
    height: 135,
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkbox: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 22,
    height: 22,
    borderRadius: 5,
    backgroundColor: '#3F51FF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },

  checkboxUnchecked: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#AAA',
  },

  tick: {
    color: '#fff',
    fontWeight: '700',
  },

  productImage: {
    width: 95,
    height: 95,
    resizeMode: 'contain',
  },

  productInfo: {
    flex: 1,
    marginLeft: 15,
  },

  productTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },

  productDesc: {
    fontSize: 13,
    color: '#666',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  price: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111',
  },

  oldPrice: {
    marginLeft: 10,
    fontSize: 18,
    color: '#888',
    textDecorationLine: 'line-through',
  },

  tryBuy: {
    marginTop: 4,
    color: '#666',
    fontSize: 15,
  },

  qtyContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8D8FF',
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  deleteBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteIcon: {
    fontSize: 16,
  },

  qtyBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyText: {
    fontSize: 22,
    color: '#333',
  },

  quantity: {
    width: 30,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },

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

  payText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyImage: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },

  emptyTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginTop: 20,
  },

  shopButton: {
    marginTop: 25,
    backgroundColor: '#3F51FF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },

  shopText: {
    color: '#fff',
    fontWeight: '700',
  },
});
