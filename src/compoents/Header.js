import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';

import { useAppSelector } from '../store/hooks';
import { selectTotalCartCount } from '../store/slices/cartSlice';

const Header = ({ onSearch, navigation, onWishlistPress }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  const totalCartCount = useAppSelector(selectTotalCartCount);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchText);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, onSearch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {showSearch ? (
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search Products..."
              value={searchText}
              onChangeText={setSearchText}
              style={styles.input}
              autoFocus
            />

            <TouchableOpacity
              onPress={() => {
                setShowSearch(false);
                setSearchText('');
                onSearch && onSearch('');
              }}
            >
              <Text style={styles.cancel}>✕</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.leftSection}>
              <TouchableOpacity style={styles.backButton}>
                <Image
                  source={require('../assets/icons/arrow.png')}
                  style={styles.backIcon}
                />
              </TouchableOpacity>

              <View style={styles.titleContainer}>
                <Image
                  source={require('../assets/icons/logo.png')}
                  style={styles.logo}
                />

                <Text style={styles.title}>T-Shirts</Text>
              </View>
            </View>

            <View style={styles.rightSection}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setShowSearch(true)}
              >
                <Image
                  source={require('../assets/icons/search.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={onWishlistPress}
              >
                <Image
                  source={require('../assets/icons/heart.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate('Bags')}
              >
                <Image
                  source={require('../assets/icons/order.png')}
                  style={styles.icon}
                />

                {totalCartCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalCartCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F8F8F8',
  },

  container: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#F8F8F8',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },

  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    position: 'relative',
  },

  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },

  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#3646FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    elevation: 2,
  },

  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },

  cancel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
});
