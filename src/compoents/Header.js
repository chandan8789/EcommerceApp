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

const Header = ({ onSearch }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchText);
    }, 500); // Debounce 500ms

    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {showSearch ? (
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search products..."
              value={searchText}
              onChangeText={setSearchText}
              style={styles.input}
              autoFocus
            />

            <TouchableOpacity
              onPress={() => {
                setShowSearch(false);
                setSearchText('');
                onSearch('');
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
                <Text style={styles.title}>T-shirts</Text>
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

              <TouchableOpacity style={styles.iconButton}>
                <Image
                  source={require('../assets/icons/heart.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}>
                <Image
                  source={require('../assets/icons/order.png')}
                  style={styles.icon}
                />
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
    backgroundColor: '#E5E5F199',
  },

  container: {
    height: 70,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E5E5F199',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },

  logo: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    width: 20,
    height: 20,
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
    marginLeft: 8,
  },

  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },

  cancel: {
    fontSize: 20,
    fontWeight: '600',
  },
});
