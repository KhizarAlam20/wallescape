import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SunIcon, TagIcon } from 'react-native-heroicons/outline';
import { ColorCode } from '../../assets/Color/ColorCode';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AppHeaderProps {
  onProfilePress?: () => void;
  onThemePress?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onProfilePress, onThemePress }) => {
  return (
    <View style={styles.headerContainer}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Profile Circle */}
          <TouchableOpacity 
            style={styles.profileCircle}
            onPress={onProfilePress}
            activeOpacity={0.7}
          >
            <Image
              source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          {/* App Name */}
          <Text style={styles.appName}>wallescape</Text>

          {/* Theme Toggle */}
          <TouchableOpacity 
            style={styles.themeButton}
            onPress={onThemePress}
            activeOpacity={0.7}
          >
            <SunIcon size={24} color={ColorCode.LIGHT.WHITE} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  safeArea: {
    backgroundColor: ColorCode.LIGHT.TRANSPARENT,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 44,
    paddingVertical: 12,
    backgroundColor: ColorCode.LIGHT.TRANSPARENT,
  },
  profileCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  appName: {
    fontSize: 20,
    color: ColorCode.LIGHT.WHITE,
    fontFamily: 'Lexend-Medium',
    letterSpacing: -1,
  },
  themeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppHeader; 