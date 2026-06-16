import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const CommonCard = ({ item }) => {
  const discountPrice = Math.round(item.price);

  const originalPrice = Math.round(item.price + item.price * 0.64);

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />

        <TouchableOpacity style={styles.heartButton}>
          <Image
            source={require('../assets/icons/heart.png')}
            style={styles.heartIcon}
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
        <Text style={styles.price}>₹{Math.round(item.price)}</Text>

        <Text style={styles.tryBuy}>
          TRY <Text style={{ fontWeight: '700' }}>BUY</Text>
        </Text>
      </View>

      <View style={styles.discountRow}>
        <Text style={styles.oldPrice}>₹{Math.round(item.price * 1.5)}</Text>

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

  heartContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  heart: {
    fontSize: 18,
    color: '#000',
  },

  content: {
    marginTop: 8,
  },

  brand: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    textTransform: 'capitalize',
  },

  productName: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    minHeight: 36,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },

  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },

  buyText: {
    color: '#3F51FF',
    fontSize: 14,
  },

  buyBold: {
    fontWeight: '700',
  },

  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  oldPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },

  discount: {
    marginLeft: 8,
    color: '#3F51FF',
    fontWeight: '700',
    fontSize: 12,
  },
});
