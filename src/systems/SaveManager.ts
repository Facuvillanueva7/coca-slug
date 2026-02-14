import { AUDIO_DEFAULTS } from '../config/gameConfig';

export interface SaveData {
  audio: { master: number; sfx: number; music: number };
  highScore: number;
}

const KEY = 'coca-slug-save';

export class SaveManager {
  static load(): SaveData {
    try {
      const data = localStorage.getItem(KEY);
      if (!data) return { audio: { ...AUDIO_DEFAULTS }, highScore: 0 };
      return JSON.parse(data) as SaveData;
    } catch {
      return { audio: { ...AUDIO_DEFAULTS }, highScore: 0 };
    }
  }

  static save(data: SaveData): void {
    localStorage.setItem(KEY, JSON.stringify(data));
  }
}
