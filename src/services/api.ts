import axios from 'axios';

const ALADHAN_API_BASE = 'https://api.aladhan.com/v1';
const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

export interface QuranVerse {
  number: number;
  text: string;
  translation?: string;
  surah: {
    name: string;
    englishName: string;
    englishNameTranslation: string;
    number: number;
  };
  numberInSurah: number;
}

export const getPrayerTimes = async (lat: number, lng: number) => {
  try {
    const date = new Date();
    const response = await axios.get(`${ALADHAN_API_BASE}/timings/${Math.floor(date.getTime() / 1000)}`, {
      params: {
        latitude: lat,
        longitude: lng,
        method: 2, // Islamic Society of North America (ISNA) - generic default, can be changed
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    throw error;
  }
};

export const getDailyVerse = async () => {
  try {
    // Random verse for "Daily Ayat"
    // There are 6236 verses in the Quran.
    const randomVerse = Math.floor(Math.random() * 6236) + 1;
    
    // Fetch Arabic and Bengali in parallel
    const [arabicResponse, bengaliResponse] = await Promise.all([
      axios.get(`${QURAN_API_BASE}/ayah/${randomVerse}`),
      axios.get(`${QURAN_API_BASE}/ayah/${randomVerse}/bn.bengali`)
    ]);

    return {
      ...arabicResponse.data.data,
      translation: bengaliResponse.data.data.text,
    };
  } catch (error) {
    console.error('Error fetching daily verse:', error);
    // Fallback to a known verse (e.g., Al-Fatiha 1:1) if random fails
    try {
      const fallbackVerse = 1;
      const [arabicResponse, bengaliResponse] = await Promise.all([
        axios.get(`${QURAN_API_BASE}/ayah/${fallbackVerse}`),
        axios.get(`${QURAN_API_BASE}/ayah/${fallbackVerse}/bn.bengali`)
      ]);
      return {
        ...arabicResponse.data.data,
        translation: bengaliResponse.data.data.text,
      };
    } catch (fallbackError) {
      throw error;
    }
  }
};

export const searchQuran = async (query: string, language: 'bn' | 'en' = 'bn') => {
  try {
    // Search endpoint is limited in the free API, but we can try basic keyword search
    // Note: The Quran Cloud API search is a bit restrictive. 
    // For a better experience, we might search specifically in a translation edition.
    
    const edition = language === 'bn' ? 'bn.bengali' : 'en.asad';
    const encodedQuery = encodeURIComponent(query);
    const response = await axios.get(`${QURAN_API_BASE}/search/${encodedQuery}/all/${edition}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // 404 likely means no results found for the query
      return { matches: [] };
    }
    console.error('Error searching Quran:', error);
    throw error;
  }
};
