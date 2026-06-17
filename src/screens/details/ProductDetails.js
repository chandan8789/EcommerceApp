import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import {
  toggleWishlist,
  selectIsWishlisted,
} from '../../store/slices/wishlistSlice';
import { formatPrice } from '../../utils/price';

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector(state => selectIsWishlisted(state, product.id));

  const handleAddToBag = () => {
    dispatch(addToCart(product));
    navigation.goBack();
  };

  const discountPrice = formatPrice(product.price);
  const oldPrice = Math.round(discountPrice * 1.5);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../../assets/icons/arrow.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Product Details</Text>

        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => dispatch(toggleWishlist(product))}
        >
          <Image
            source={require('../../assets/icons/heart.png')}
            style={[
              styles.headerIcon,
              isLiked && { tintColor: '#FF3B5C' },
            ]}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </View>

        <View style={styles.content}>
          <Text style={styles.category}>{product.category}</Text>

          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {product.rating?.rate}</Text>

            <Text style={styles.review}>({product.rating?.count} Reviews)</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{discountPrice}</Text>

            <Text style={styles.oldPrice}>₹{oldPrice}</Text>

            <Text style={styles.discount}>33% OFF</Text>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>

          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToBag}>
          <Text style={styles.addToCartText}>Add To Bag</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    backgroundColor: '#FFF',
  },

  headerBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  imageContainer: {
    backgroundColor: '#F7F7F7',
    paddingVertical: 25,
  },

  productImage: {
    width: '100%',
    height: 320,
    resizeMode: 'contain',
  },

  content: {
    padding: 20,
  },

  category: {
    fontSize: 14,
    color: '#777',
    textTransform: 'capitalize',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginTop: 8,
    lineHeight: 30,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  rating: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },

  review: {
    marginLeft: 8,
    color: '#777',
    fontSize: 14,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3646FF',
  },

  oldPrice: {
    marginLeft: 10,
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },

  discount: {
    marginLeft: 10,
    color: '#2E7D32',
    fontWeight: '700',
    fontSize: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 25,
    marginBottom: 10,
    color: '#111',
  },

  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },

  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },

  addToCartBtn: {
    height: 55,
    backgroundColor: '#3646FF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addToCartText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
