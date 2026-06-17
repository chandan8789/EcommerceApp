import React, { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setProducts,
  setLoading,
  setSearchQuery,
  setSelectedSort,
  toggleFilter,
  toggleNewArrivals,
  clearAllFilters,
  selectFilteredProducts,
} from '../../store/slices/productsSlice';
import { toggleWishlist, selectWishlistItems } from '../../store/slices/wishlistSlice';

const Dashboard = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const filteredProducts = useAppSelector(selectFilteredProducts);
  const loading = useAppSelector(state => state.products.loading);
  const selectedSort = useAppSelector(state => state.products.selectedSort);
  const selectedFilters = useAppSelector(state => state.products.selectedFilters);
  const likedProducts = useAppSelector(selectWishlistItems);

  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Suggested');

  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        dispatch(setProducts(data));
      } catch (error) {
        console.log('API Error:', error);
        dispatch(setLoading(false));
      }
    };

    getProducts();
  }, [dispatch]);

  const handleSearch = text => {
    dispatch(setSearchQuery(text));
  };

  const handleSort = type => {
    dispatch(setSelectedSort(type));
    setSortVisible(false);
  };

  const handleLike = product => {
    dispatch(toggleWishlist(product));
  };

  const handleClearAllFilters = () => {
    dispatch(clearAllFilters());
  };

  const filterCategories = [
    { id: 'Suggested', label: 'Suggested filters' },
    { id: 'Gender', label: 'Gender' },
    { id: 'Price', label: 'Price' },
    { id: 'Brand', label: 'Brand' },
    { id: 'Discounts', label: 'Discounts' },
  ];

  const genderOptions = ['Men', 'Women', 'Unisex'];
  const priceOptions = ['Under 700', '700-1500', 'Above 1500'];
  const discountOptions = ['50% off', 'Buy 1 Get 1', 'Under ₹700'];

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        onSearch={handleSearch}
        onWishlistPress={() => navigation.navigate('Like')}
      />

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
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          extraData={selectedFilters}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products match your filters</Text>
            </View>
          }
          renderItem={({ item }) => (
            <CommonCard
              item={item}
              isLiked={likedProducts.some(product => product.id === item.id)}
              onLike={() => handleLike(item)}
              onPress={() =>
                navigation.navigate('ProductDetails', { product: item })
              }
            />
          )}
        />
      )}

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

      <Modal
        isVisible={sortVisible}
        onBackdropPress={() => setSortVisible(false)}
        style={styles.modal}
      >
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Sort By</Text>
          {[
            { label: 'Newest arrivals', value: 'newest' },
            { label: 'Price - low to high', value: 'low' },
            { label: 'Price - high to low', value: 'high' },
            { label: 'Offers and discounts', value: 'discount' },
            { label: 'Best sellers', value: 'bestseller' },
          ].map(item => (
            <TouchableOpacity
              key={item.value}
              style={styles.option}
              onPress={() => handleSort(item.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedSort === item.value && styles.selectedText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <Modal
        isVisible={filterVisible}
        onBackdropPress={() => setFilterVisible(false)}
        style={styles.modal}
        backdropOpacity={0.7}
      >
        <View style={styles.filterContainer}>
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
                      onPress={() => dispatch(toggleNewArrivals())}
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
                        onPress={() =>
                          dispatch(toggleFilter({ category: 'gender', value: gender }))
                        }
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
                  <Text style={styles.sectionTitle}>Select price range (₹)</Text>
                  <View style={styles.chipContainer}>
                    {priceOptions.map(price => (
                      <TouchableOpacity
                        key={price}
                        style={[
                          styles.chip,
                          selectedFilters.priceRange.includes(price) &&
                            styles.chipActive,
                        ]}
                        onPress={() =>
                          dispatch(
                            toggleFilter({ category: 'priceRange', value: price }),
                          )
                        }
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
                        onPress={() =>
                          dispatch(
                            toggleFilter({ category: 'discounts', value: discount }),
                          )
                        }
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

              {activeFilter === 'Brand' && (
                <View>
                  <Text style={styles.sectionTitle}>Brands (Coming Soon)</Text>
                  <Text style={{ color: '#888', marginTop: 10 }}>
                    Brand filtering will be available soon.
                  </Text>
                </View>
              )}
            </ScrollView>

            <View style={styles.bottomButtons}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearAllFilters}
              >
                <Text style={styles.clearButtonText}>Clear all</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setFilterVisible(false)}
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

export default Dashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  resultText: {
    fontSize: 14,
    color: '#444',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  blueText: { color: '#3646FF', fontWeight: '700' },
  row: { justifyContent: 'space-between' },
  listContainer: { paddingHorizontal: 12, paddingBottom: 100 },
  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: '#777', fontSize: 15 },

  bottomBar: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    height: 55,
    backgroundColor: '#FFF',
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
  divider: { width: 1, height: 25, backgroundColor: '#DDD' },
  bottomIcon: { width: 18, height: 18, resizeMode: 'contain', marginRight: 8 },
  bottomText: { fontSize: 15, fontWeight: '600', color: '#111' },

  modal: { justifyContent: 'flex-end', margin: 0 },
  sheet: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3646FF',
    marginBottom: 15,
  },
  option: { paddingVertical: 14 },
  optionText: { fontSize: 16, color: '#111' },
  selectedText: { color: '#3646FF', fontWeight: '700' },

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
