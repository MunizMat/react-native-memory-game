import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings } from '../../types';

export class Storage {
  static async saveSettings({ gameDifficulty, colorMode }: AppSettings) {
    try {
      await AsyncStorage.multiSet([
        ['gameDifficulty', gameDifficulty],
        ['colorMode', colorMode],
      ]);
      return { gameDifficulty, colorMode };
    } catch (error) {
      console.log(error);
    }
  }

  static async getSettings() {
    try {
      const [gameDifficulty, colorMode] = await AsyncStorage.multiGet([
        'gameDifficulty',
        'colorMode',
      ]);

      return {
        gameDifficulty: gameDifficulty[1],
        colorMode: colorMode[1],
      };
    } catch (error) {
      console.log(error);
    }
  }
}
