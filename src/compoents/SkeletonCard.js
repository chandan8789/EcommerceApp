import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonCard = () => {
  return (
    <View style={styles.card}>
      <SkeletonPlaceholder borderRadius={4}>
        <View style={styles.inner}>
          <View style={styles.imageContainer}>
            <View style={styles.heartButton} />
          </View>

          <View style={styles.brand} />

          <View style={styles.productNameLine} />
          <View style={styles.productNameLineSecond} />

          <View style={styles.priceRow}>
            <View style={styles.price} />
            <View style={styles.tryBuy} />
          </View>

          <View style={styles.discountRow}>
            <View style={styles.oldPrice} />
            <View style={styles.discount} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default SkeletonCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 20,
  },

  inner: {
    width: '100%',
  },

  imageContainer: {
    width: '100%',
    height: 260,
    borderRadius: 16,
  },

  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  brand: {
    width: '55%',
    height: 15,
    marginTop: 10,
    borderRadius: 4,
  },

  productNameLine: {
    width: '100%',
    height: 13,
    marginTop: 4,
    borderRadius: 4,
  },

  productNameLineSecond: {
    width: '75%',
    height: 13,
    marginTop: 6,
    borderRadius: 4,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },

  price: {
    width: 56,
    height: 18,
    borderRadius: 4,
  },

  tryBuy: {
    width: 52,
    height: 13,
    borderRadius: 4,
  },

  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  oldPrice: {
    width: 42,
    height: 12,
    borderRadius: 4,
  },

  discount: {
    width: 58,
    height: 12,
    marginLeft: 8,
    borderRadius: 4,
  },
});
