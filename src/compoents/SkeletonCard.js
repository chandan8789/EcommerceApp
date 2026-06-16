import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonCard = () => {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          width: '48%',
          marginBottom: 20,
        }}
      >
        <View
          style={{
            width: '100%',
            height: 220,
            borderRadius: 12,
          }}
        />

        <View
          style={{
            width: 100,
            height: 16,
            marginTop: 10,
            borderRadius: 4,
          }}
        />

        <View
          style={{
            width: 140,
            height: 12,
            marginTop: 8,
            borderRadius: 4,
          }}
        />

        <View
          style={{
            width: 80,
            height: 16,
            marginTop: 10,
            borderRadius: 4,
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
};

export default SkeletonCard;
