import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useAppSelector } from '../../store/hooks';
import { selectWishlistItems } from '../../store/slices/wishlistSlice';
import { formatPrice } from '../../utils/price';

const Like = ({ navigation }) => {
  const likedProducts = useAppSelector(selectWishlistItems);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icons/arrow.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Wishlist ({likedProducts.length})</Text>

        <View style={{ width: 20 }} />
      </View>

      <FlatList
        data={likedProducts}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No liked products ❤️</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('ProductDetails', {
                product: item,
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.info}>
              <Text numberOfLines={2}>{item.title}</Text>

              <Text style={styles.price}>₹{formatPrice(item.price)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Like;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  headerIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },

  emptyText: {
    fontSize: 16,
    color: '#777',
  },

  card: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },

  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },

  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },

  price: {
    marginTop: 8,
    fontWeight: '700',
    color: '#3646FF',
  },
});
