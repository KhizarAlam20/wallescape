//OLD CODE


import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Square2StackIcon, HeartIcon, InboxIcon } from 'react-native-heroicons/outline';
import { Square2StackIcon as Square2StackIconSolid, HeartIcon as HeartIconSolid, InboxIcon as InboxIconSolid } from 'react-native-heroicons/solid';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CategoryScreen from '../screens/CategoryScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import WallpaperPreview from '../screens/WallpaperPreview';
import SplashScreen from '../screens/SplashScreen';
import AppHeader from './AppHeader';
import { ColorCode } from '../../assets/Color/ColorCode';

type TabKey = 'Discover' | 'Category' | 'Favourites';
type RootStackParamList = {
  Main: undefined;
  WallpaperPreview: { wallpaperUrl: string };
};

const Stack = createStackNavigator<RootStackParamList>();
const INITIAL_TAB: TabKey = 'Discover';

const TABS = [
  { 
    key: 'Category' as TabKey, 
    label: 'Category', 
    outlineIcon: InboxIcon, 
    solidIcon: InboxIconSolid, 
    screen: CategoryScreen 
  },
  { 
    key: 'Discover' as TabKey, 
    label: 'Discover', 
    outlineIcon: Square2StackIcon, 
    solidIcon: Square2StackIconSolid, 
    screen: DiscoverScreen 
  },
  { 
    key: 'Favourites' as TabKey, 
    label: 'Favourites', 
    outlineIcon: HeartIcon, 
    solidIcon: HeartIconSolid, 
    screen: FavouritesScreen 
  },
];

const TabNavigator = () => {
  const [activeTab, setActiveTab] = useState<TabKey>(INITIAL_TAB);
  const [showSplash, setShowSplash] = useState(true);
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const ActiveScreen = TABS.find(tab => tab.key === activeTab)?.screen || DiscoverScreen;
  
  // Animation values for each tab
  const animatedValues = TABS.reduce<Record<TabKey, Animated.Value>>((acc, tab) => {
    acc[tab.key] = new Animated.Value(tab.key === activeTab ? 1 : 0);
    return acc;
  }, {} as Record<TabKey, Animated.Value>);

  useEffect(() => {
    // Animate tab transitions
    TABS.forEach(tab => {
      Animated.timing(animatedValues[tab.key], {
        toValue: tab.key === activeTab ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }, [activeTab]);

  const handleTabPress = (tabKey: TabKey) => {
    setActiveTab(tabKey);
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const renderTabs = () => (
    <>
      {TABS.map(tab => {
        const isActive = activeTab === tab.key;
        const Icon = isActive ? tab.solidIcon : tab.outlineIcon;
        
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => handleTabPress(tab.key)}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              <Icon 
                size={tab.key === 'Discover' ? 26 : 24} 
                color={isActive ? ColorCode.LIGHT.WHITE : ColorCode.LIGHT.WHITE} 
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <View style={styles.container}>
      <AppHeader 
        onProfilePress={() => console.log('Profile pressed')}
        onThemePress={() => console.log('Theme pressed')}
      />
      <ActiveScreen />
      
      <View style={styles.tabBarContainer}>
        {Platform.OS === 'ios' ? (
          <BlurView
            style={styles.tabBar}
            blurType="dark"
            blurAmount={90}
            reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.8)"
          >
            <View style={styles.tabBarInner}>
              {renderTabs()}
            </View>
          </BlurView>
        ) : (
          <View style={[styles.tabBar, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}>
            <View style={styles.tabBarInner}>
              {renderTabs()}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const NavigationTabs = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: ColorCode.LIGHT.BACKGROUND }
        }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="WallpaperPreview" component={WallpaperPreview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorCode.LIGHT.BACKGROUND,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 96,
    marginBottom: 40,
  },
  tabBar: {
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  tabBarInner: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 8,
    paddingHorizontal: 14,
    height: 55,
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderRadius: 12,
    flex: 1,
    height: '100%',
    maxWidth: 80,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 6,
    color: ColorCode.LIGHT.GREEN,
  }
});

export default NavigationTabs;