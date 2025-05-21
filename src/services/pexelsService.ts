import axios from 'axios';

const PEXELS_API_KEY = 'pAFuS2WlBJ7i5r3zLLLO5OnY5DtX8vdfRps0rISA7i4iim15lzjDfOl0'; // You'll need to replace this with your actual API key
const PEXELS_API_URL = 'https://api.pexels.com/v1';

export interface PexelsPhoto {
  id: number;
  src: {
    medium: string;
    large2x: string;
  };
  photographer: string;
}

export interface PexelsResponse {
  photos: PexelsPhoto[];
  page: number;
  per_page: number;
  total_results: number;
}

export const fetchWallpapers = async (page: number = 1, perPage: number = 20): Promise<PexelsResponse> => {
  try {
    const response = await axios.get(`${PEXELS_API_URL}/search`, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      params: {
        query: 'nature landscape',
        orientation: 'portrait',
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching wallpapers:', error);
    throw error;
  }
}; 