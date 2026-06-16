import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const Bags = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../../assets/icons/arrow.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Bag</Text>

        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../../assets/icons/heart.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.oopsText}>OOPS ☹️</Text>

        <Text style={styles.emptyText}>Your bag is empty.</Text>

        <Image
          source={require('../../assets/images/empty.png')}
          style={styles.bagImage}
          resizeMode="contain"
        />

        <Text style={styles.addText}>Add items to your bag now</Text>

        <TouchableOpacity
          style={styles.startButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.startButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Bags;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  iconButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
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
    color: '#111',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  oopsText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111',
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
  },

  bagImage: {
    width: 260,
    height: 220,
    marginBottom: 25,
  },

  addText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 30,
  },

  startButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#3F51FF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
