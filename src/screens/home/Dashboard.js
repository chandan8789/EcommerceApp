import React, { useEffect, useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

import Header from '../../compoents/Header';
import CommonCard from '../../compoents/CommonCard';
import SkeletonCard from '../../compoents/SkeletonCard';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  // Sort State
  const [selectedSort, setSelectedSort] = useState('');

  // Filter States
  const [activeFilter, setActiveFilter] = useState('Suggested');
  const [selectedFilters, setSelectedFilters] = useState({
    gender: [],
    priceRange: [],
    newArrivals: false,
    discounts: [],
  });

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

  // Real-time Filter + Sort
  const applyFiltersAndSort = useMemo(() => {
    let result = [...products];

    // === FILTERS ===
    if (selectedFilters.gender.length > 0) {
      result = result.filter(item => {
        if (
          selectedFilters.gender.includes('Men') &&
          item.category === "men's clothing"
        )
          return true;
        if (
          selectedFilters.gender.includes('Women') &&
          item.category === "women's clothing"
        )
          return true;
        return false;
      });
    }

    if (selectedFilters.priceRange.length > 0) {
      result = result.filter(item => {
        return selectedFilters.priceRange.some(range => {
          if (range === 'Under 700') return item.price < 700;
          if (range === '700-1500')
            return item.price >= 700 && item.price <= 1500;
          if (range === 'Above 1500') return item.price > 1500;
          return false;
        });
      });
    }

    if (selectedFilters.discounts.length > 0) {
      result = result.filter(item => item.price < 50); // Mock discount
    }

    if (selectedFilters.newArrivals) {
      result = result.sort((a, b) => b.id - a.id);
    }

    // === SORT ===
    switch (selectedSort) {
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case 'bestseller':
        result.sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [selectedFilters, selectedSort, products]);

  // Toggle Filter
  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => {
      const current = prev[category] || [];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      gender: [],
      priceRange: [],
      newArrivals: false,
      discounts: [],
    });
    setSelectedSort('');
  };

  const applyFilterAndClose = () => {
    setFilterVisible(false);
  };

  const handleSort = type => {
    setSelectedSort(type);
    setSortVisible(false);
  };

  // Filter Sidebar Items
  const filterCategories = [
    { id: 'Suggested', label: 'Suggested filters' },
    { id: 'Gender', label: 'Gender' },
    { id: 'Price', label: 'Price' },
    { id: 'Brand', label: 'Brand' },
    { id: 'Discounts', label: 'Discounts' },
  ];

  const genderOptions = ['Men', 'Women', 'Boys', 'Girls', 'Unisex'];
  const priceOptions = ['Under 700', '700-1500', 'Above 1500'];
  const discountOptions = ['50% off', 'Buy 1 Get 1', 'Under ₹700'];

  return (
    <View style={styles.container}>
      <Header onSearch={() => {}} navigation={navigation} />

      <Text style={styles.resultText}>
        Showing <Text style={styles.blueText}>{filteredProducts.length}</Text>{' '}
        results
      </Text>

      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          numColumns={2}
          renderItem={() => <SkeletonCard />}
        />
      ) : (
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CommonCard
              item={item}
              onPress={() =>
                navigation.navigate('ProductDetails', { product: item })
              }
            />
          )}
        />
      )}

      {/* Bottom Bar - Both Sort & Filter */}
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

      {/* ==================== SORT MODAL ==================== */}
      <Modal
        isVisible={sortVisible}
        onBackdropPress={() => setSortVisible(false)}
        style={styles.modal}
      >
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Sort by</Text>

          {[
            { key: 'newest', label: 'Newest arrivals' },
            { key: 'low', label: 'Price - low to high' },
            { key: 'high', label: 'Price - high to low' },
            { key: 'discount', label: 'Offers and discounts' },
            { key: 'bestseller', label: 'Best sellers' },
          ].map(item => (
            <TouchableOpacity
              key={item.key}
              style={styles.option}
              onPress={() => handleSort(item.key)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedSort === item.key && styles.selectedText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* ==================== FILTER MODAL ==================== */}
      <Modal
        isVisible={filterVisible}
        onBackdropPress={() => setFilterVisible(false)}
        style={styles.modal}
        backdropOpacity={0.7}
      >
        <View style={styles.filterContainer}>
          {/* Left Sidebar */}
          <View style={styles.sidebar}>
            <Text style={styles.filterTitle}>Filters</Text>
            {filterCategories.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.sidebarItem,
                  activeFilter === item.id && styles.sidebarItemActive,
                ]}
                onPress={() => setActiveFilter(item.id)}
              >
                <Text
                  style={[
                    styles.sidebarText,
                    activeFilter === item.id && styles.sidebarTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Right Content */}
          <View style={styles.contentArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {activeFilter === 'Suggested' && (
                <View>
                  <Text style={styles.sectionTitle}>
                    Choose from the mostly used filters
                  </Text>
                  <View style={styles.chipContainer}>
                    <TouchableOpacity
                      style={[
                        styles.chip,
                        selectedFilters.newArrivals && styles.chipActive,
                      ]}
                      onPress={() =>
                        setSelectedFilters(prev => ({
                          ...prev,
                          newArrivals: !prev.newArrivals,
                        }))
                      }
                    >
                      <Text
                        style={
                          selectedFilters.newArrivals
                            ? styles.chipTextActive
                            : styles.chipText
                        }
                      >
                        New arrivals
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {activeFilter === 'Gender' && (
                <View>
                  <Text style={styles.sectionTitle}>Select gender</Text>
                  <View style={styles.chipContainer}>
                    {genderOptions.map(gender => (
                      <TouchableOpacity
                        key={gender}
                        style={[
                          styles.chip,
                          selectedFilters.gender.includes(gender) &&
                            styles.chipActive,
                        ]}
                        onPress={() => toggleFilter('gender', gender)}
                      >
                        <Text
                          style={
                            selectedFilters.gender.includes(gender)
                              ? styles.chipTextActive
                              : styles.chipText
                          }
                        >
                          {gender}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {activeFilter === 'Price' && (
                <View>
                  <Text style={styles.sectionTitle}>Select price range</Text>
                  <View style={styles.chipContainer}>
                    {priceOptions.map(price => (
                      <TouchableOpacity
                        key={price}
                        style={[
                          styles.chip,
                          selectedFilters.priceRange.includes(price) &&
                            styles.chipActive,
                        ]}
                        onPress={() => toggleFilter('priceRange', price)}
                      >
                        <Text
                          style={
                            selectedFilters.priceRange.includes(price)
                              ? styles.chipTextActive
                              : styles.chipText
                          }
                        >
                          {price}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {activeFilter === 'Discounts' && (
                <View>
                  <Text style={styles.sectionTitle}>Discounts</Text>
                  <View style={styles.chipContainer}>
                    {discountOptions.map(discount => (
                      <TouchableOpacity
                        key={discount}
                        style={[
                          styles.chip,
                          selectedFilters.discounts.includes(discount) &&
                            styles.chipActive,
                        ]}
                        onPress={() => toggleFilter('discounts', discount)}
                      >
                        <Text
                          style={
                            selectedFilters.discounts.includes(discount)
                              ? styles.chipTextActive
                              : styles.chipText
                          }
                        >
                          {discount}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Bottom Action Buttons */}
            <View style={styles.bottomButtons}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearAllFilters}
              >
                <Text style={styles.clearButtonText}>Clear all</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilterAndClose}
              >
                <Text style={styles.applyButtonText}>Apply filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  resultText: {
    fontSize: 13,
    color: '#444',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  blueText: { color: '#3646FF', fontWeight: '700' },
  row: { justifyContent: 'space-between' },
  listContainer: { paddingHorizontal: 12, paddingBottom: 100 },

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
  divider: { width: 1, height: 25, backgroundColor: '#ddd' },
  bottomIcon: { width: 18, height: 18, resizeMode: 'contain', marginRight: 8 },
  bottomText: { fontSize: 15, fontWeight: '600' },

  modal: { margin: 0, justifyContent: 'flex-end' },

  // Sort Modal Styles
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
  option: { paddingVertical: 14 },
  optionText: { fontSize: 16, color: '#111' },
  selectedText: { color: '#3646FF', fontWeight: '600' },

  // Filter Modal Styles
  filterContainer: {
    flexDirection: 'row',
    height: '88%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  sidebar: { width: '38%', backgroundColor: '#f8f9fa', paddingTop: 20 },
  filterTitle: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  sidebarItem: { paddingVertical: 14, paddingHorizontal: 16 },
  sidebarItemActive: {
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#3646FF',
  },
  sidebarText: { fontSize: 15, color: '#555' },
  sidebarTextActive: { color: '#3646FF', fontWeight: '600' },

  contentArea: { flex: 1, padding: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  chipActive: { backgroundColor: '#3646FF', borderColor: '#3646FF' },
  chipText: { fontSize: 14, color: '#333' },
  chipTextActive: { color: '#fff' },

  bottomButtons: { flexDirection: 'row', marginTop: 20, gap: 12 },
  clearButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#3646FF',
    alignItems: 'center',
  },
  clearButtonText: { color: '#3646FF', fontWeight: '600' },
  applyButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: '#3646FF',
    alignItems: 'center',
  },
  applyButtonText: { color: '#fff', fontWeight: '600' },
});

export default Dashboard;
