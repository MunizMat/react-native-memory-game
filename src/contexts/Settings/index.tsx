import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AppSettings } from '../../types';
import { Storage } from '../../services/Storage';

interface SettingsContextProps {
  settings: AppSettings;
  setSettings: (settings: AppSettings) => void;
  updateSettings: (settings: AppSettings) => void;
}

interface SettingsProviderProps {
  children: ReactNode;
}

const SettingsContext = createContext<SettingsContextProps>(
  {} as SettingsContextProps,
);

export const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
  const defaultSettings = {
    gameDifficulty: 'easy',
    colorMode: 'dark',
  } as const;

  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  const loadSettings = async () => {
    try {
      const settings = await Storage.getSettings();
      if (!settings) return;
      const { gameDifficulty, colorMode } = settings;
      const { gameDifficulty: defaultDifficulty, colorMode: defaultColorMode } =
        defaultSettings;

      setSettings({
        gameDifficulty: gameDifficulty || defaultDifficulty,
        colorMode: colorMode || defaultColorMode,
      } as AppSettings);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSettings = async (settings: AppSettings) => {
    try {
      const updatedSettings = await Storage.saveSettings(settings);
      if (!updatedSettings) return;
      setSettings(updatedSettings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const value = useMemo(
    () => ({ settings, setSettings, updateSettings }),
    [settings, setSettings, updateSettings],
  );
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  return context;
};
