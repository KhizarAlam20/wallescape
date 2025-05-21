import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { ArrowLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { ColorCode } from '../../assets/Color/ColorCode';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  WallpaperPreview: { wallpaperUrl: string };
};

type WallpaperPreviewScreenRouteProp = RouteProp<RootStackParamList, 'WallpaperPreview'>;

interface WallpaperPreviewProps {
  route: WallpaperPreviewScreenRouteProp;
}

const WallpaperPreview: React.FC<WallpaperPreviewProps> = ({ route }) => {
  const navigation = useNavigation();
  const { wallpaperUrl } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: wallpaperUrl }}
        style={styles.wallpaper}
        resizeMode="cover"
      />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={24} color={ColorCode.LIGHT.WHITE} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.favoriteButton}>
          <HeartIcon size={24} color={ColorCode.LIGHT.WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorCode.LIGHT.BACKGROUND,
  },
  wallpaper: {
    width: width,
    height: height,
    position: 'absolute',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 48,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WallpaperPreview; 