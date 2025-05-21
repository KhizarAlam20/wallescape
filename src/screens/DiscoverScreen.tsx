import { Text, View, FlatList, Image, Dimensions, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { s } from "react-native-wind"
import { ColorCode } from '../../assets/Color/ColorCode'
import { fetchWallpapers, PexelsPhoto } from '../services/pexelsService'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type RootStackParamList = {
  WallpaperPreview: { wallpaperUrl: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'WallpaperPreview'>;

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 96) / 2; // 96 = margin (40) * 2 + gap (16)
const HEADER_HEIGHT = 60; // Approximate height of AppHeader

const SkeletonLoader = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.skeletonContainer}>
      {[...Array(6)].map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.skeletonItem,
            { opacity }
          ]}
        />
      ))}
    </View>
  );
};

const WallpaperItem = ({ item }: { item: PexelsPhoto }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = () => {
    navigation.navigate('WallpaperPreview', { wallpaperUrl: item.src.large2x });
  };

  return (
    <TouchableOpacity 
      style={styles.wallpaperContainer}
      activeOpacity={0.9}
      onPress={handlePress}
    >
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <Image
          source={{ uri: item.src.medium }}
          style={styles.wallpaperImage}
          resizeMode="cover"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const DiscoverScreen: React.FC = () => {
  const [wallpapers, setWallpapers] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadWallpapers();
  }, []);

  const loadWallpapers = async () => {
    try {
      const response = await fetchWallpapers(page);
      setWallpapers(prev => [...prev, ...response.photos]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading wallpapers:', error);
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading) {
      setPage(prev => prev + 1);
      loadWallpapers();
    }
  };

  if (loading && wallpapers.length === 0) {
    return (
      <View style={[s`flex-1`, { backgroundColor: ColorCode.DARK.BLACK }]}>
        <SkeletonLoader />
      </View>
    );
  }

  return (
    <View style={[s`flex-1`, { backgroundColor: ColorCode.DARK.BLACK }]}>
      <FlatList
        data={wallpapers}
        renderItem={({ item }) => <WallpaperItem item={item} />}
        keyExtractor={(item, index) => `${item.id}-${page}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <SkeletonLoader /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 40,
    paddingTop: HEADER_HEIGHT + 80, // Add padding for AppHeader plus some extra space
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  wallpaperContainer: {
    width: COLUMN_WIDTH,
    height: COLUMN_WIDTH * 2,
    borderRadius: 24,
    overflow: 'hidden' as const,
    backgroundColor: ColorCode.DARK.ACTIVE,
  },
  wallpaperImage: {
    width: '100%',
    height: '100%',
  },
  skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingTop: HEADER_HEIGHT + 80,
  },
  skeletonItem: {
    width: COLUMN_WIDTH,
    height: COLUMN_WIDTH * 2,
    borderRadius: 24,
    backgroundColor: ColorCode.DARK.ACTIVE,
    marginBottom: 16,
  },
});

export default DiscoverScreen;

// A6FF1A