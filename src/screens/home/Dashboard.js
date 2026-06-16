import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

import Modal from 'react-native-modal';

import Header from '../../compoents/Header';
import CommonCard from '../../compoents/CommonCard';
import SkeletonCard from '../../compoents/SkeletonCard';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch('https://fakestoreapi.com/products');

      const data = await response.json();

      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Search
  const handleSearch = text => {
    if (!text.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredProducts(filtered);
  };

  // Sort
  const handleSort = type => {
    let sortedProducts = [...filteredProducts];

    switch (type) {
      case 'newest':
        sortedProducts.sort((a, b) => b.id - a.id);
        break;

      case 'low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;

      case 'high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;

      case 'discount':
        sortedProducts.sort(
          (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0),
        );
        break;

      case 'bestseller':
        sortedProducts.sort(
          (a, b) => (b.rating?.count || 0) - (a.rating?.count || 0),
        );
        break;

      default:
        break;
    }

    setFilteredProducts(sortedProducts);
    setSelectedSort(type);
    setSortVisible(false);
  };

  // Filter
  const handleFilter = category => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(item => item.category === category);

      setFilteredProducts(filtered);
    }

    setFilterVisible(false);
  };

  const categories = [
    'all',
    "men's clothing",
    "women's clothing",
    'electronics',
    'jewelery',
  ];

  return (
    <View style={styles.container}>
      {/* <Header onSearch={handleSearch} /> */}

      <Header onSearch={handleSearch} navigation={navigation} />
      <Text style={styles.resultText}>
        Showing <Text style={styles.blueText}>{filteredProducts.length}</Text>{' '}
        results
      </Text>

      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          numColumns={2}
          keyExtractor={item => item.toString()}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          renderItem={() => <SkeletonCard />}
        />
      ) : (
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <CommonCard item={item} />}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Bottom Bar */}

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => setSortVisible(true)}
        >
          <Image
            source={require('../../assets/icons/sort.png')}
            style={styles.bottomIcon}
          />

          <Text style={styles.bottomText}>Sort by</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => setFilterVisible(true)}
        >
          <Image
            source={require('../../assets/icons/filter.png')}
            style={styles.bottomIcon}
          />

          <Text style={styles.bottomText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Sort Modal */}

      <Modal
        isVisible={sortVisible}
        onBackdropPress={() => setSortVisible(false)}
        style={styles.modal}
      >
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Sort by</Text>

          <TouchableOpacity
            style={styles.option}
            onPress={() => handleSort('newest')}
          >
            <Text
              style={[
                styles.optionText,
                selectedSort === 'newest' && styles.selectedText,
              ]}
            >
              Newest arrivals
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => handleSort('low')}
          >
            <Text
              style={[
                styles.optionText,
                selectedSort === 'low' && styles.selectedText,
              ]}
            >
              Price - low to high
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => handleSort('high')}
          >
            <Text
              style={[
                styles.optionText,
                selectedSort === 'high' && styles.selectedText,
              ]}
            >
              Price - high to low
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => handleSort('discount')}
          >
            <Text
              style={[
                styles.optionText,
                selectedSort === 'discount' && styles.selectedText,
              ]}
            >
              Offers and discounts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => handleSort('bestseller')}
          >
            <Text
              style={[
                styles.optionText,
                selectedSort === 'bestseller' && styles.selectedText,
              ]}
            >
              Best sellers
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Filter Modal */}

      <Modal
        isVisible={filterVisible}
        onBackdropPress={() => setFilterVisible(false)}
        style={styles.modal}
      >
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Filters</Text>

          {categories.map(item => (
            <TouchableOpacity
              key={item}
              style={styles.option}
              onPress={() => handleFilter(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  resultText: {
    fontSize: 13,
    color: '#444',
    paddingHorizontal: 16,
    marginVertical: 10,
  },

  blueText: {
    color: '#3646FF',
    fontWeight: '700',
  },

  row: {
    justifyContent: 'space-between',
  },

  listContainer: {
    paddingHorizontal: 12,
    paddingBottom: 100,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
  },

  bottomButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  divider: {
    width: 1,
    height: 25,
    backgroundColor: '#ddd',
  },

  bottomIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 8,
  },

  bottomText: {
    fontSize: 15,
    fontWeight: '600',
  },

  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },

  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3646FF',
    marginBottom: 20,
  },

  option: {
    paddingVertical: 14,
  },

  optionText: {
    fontSize: 16,
    color: '#111',
  },
});
