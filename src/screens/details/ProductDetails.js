import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/icons/arrow.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Product Details</Text>

          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/heart.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Product Image */}

        <Image source={{ uri: product.image }} style={styles.productImage} />

        {/* Product Info */}

        <View style={styles.details}>
          <Text style={styles.category}>{product.category}</Text>

          <Text style={styles.title}>{product.title}</Text>

          <Text style={styles.price}>₹ {Math.round(product.price * 85)}</Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {product.rating?.rate}</Text>

            <Text style={styles.review}>({product.rating?.count} Reviews)</Text>
          </View>

          <Text style={styles.descriptionTitle}>Description</Text>

          <Text style={styles.description}>{product.description}</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add To Bag</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  productImage: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
  },

  details: {
    padding: 16,
  },

  category: {
    color: '#666',
    textTransform: 'capitalize',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },

  price: {
    fontSize: 24,
    color: '#3646FF',
    fontWeight: '700',
    marginTop: 12,
  },

  ratingContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },

  rating: {
    fontSize: 16,
    fontWeight: '600',
  },

  review: {
    marginLeft: 10,
    color: '#666',
  },

  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },

  description: {
    color: '#555',
    lineHeight: 22,
  },

  button: {
    marginTop: 25,
    height: 55,
    backgroundColor: '#3646FF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
