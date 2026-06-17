import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { formatPrice } from '../utils/price';

const CommonCard = ({ item, onPress, onLike, isLiked }) => {
  const price = formatPrice(item.price);
  const oldPrice = Math.round(price * 1.4);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />

        <TouchableOpacity
          style={styles.heartButton}
          activeOpacity={0.8}
          onPress={e => {
            e.stopPropagation();
            onLike && onLike();
          }}
        >
          <Image
            source={
              isLiked
                ? require('../assets/icons/heart.png')
                : require('../assets/icons/heart.png')
            }
            style={[
              styles.heartIcon,
              isLiked && {
                tintColor: '#FF3B5C',
              },
            ]}
          />
        </TouchableOpacity>
      </View>

      <Text numberOfLines={1} style={styles.brand}>
        {item.category}
      </Text>

      <Text numberOfLines={2} style={styles.productName}>
        {item.title}
      </Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{price}</Text>

        <Text style={styles.tryBuy}>
          TRY <Text style={styles.tryBuyBold}>BUY</Text>
        </Text>
      </View>

      <View style={styles.discountRow}>
        <Text style={styles.oldPrice}>₹{oldPrice}</Text>

        <Text style={styles.discount}>64% OFF</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommonCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 20,
  },

  imageContainer: {
    height: 260,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },

  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  heartIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  brand: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    textTransform: 'capitalize',
  },

  productName: {
    marginTop: 4,
    fontSize: 13,
    color: '#666',
    minHeight: 36,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    alignItems: 'center',
  },

  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  tryBuy: {
    color: '#3646FF',
    fontSize: 13,
  },

  tryBuyBold: {
    fontWeight: '700',
  },

  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  oldPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },

  discount: {
    marginLeft: 8,
    color: '#3646FF',
    fontSize: 12,
    fontWeight: '700',
  },
});
