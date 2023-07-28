import { IconProps } from '../types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export const icons: Omit<IconProps, 'uncovered' | 'visible' | 'id'>[] = [
  {
    color: 'primary.300',
    name: 'logo-react',
    type: Ionicons,
  },
  {
    color: 'info.600',
    name: 'language-typescript',
    type: MaterialCommunityIcons,
  },
  {
    color: 'warning.400',
    name: 'language-swift',
    type: MaterialCommunityIcons,
  },
  {
    color: 'rose.800',
    name: 'language-ruby',
    type: MaterialCommunityIcons,
  },
  {
    color: 'info.700',
    name: 'language-c',
    type: MaterialCommunityIcons,
  },
  {
    color: 'violet.500',
    name: 'language-csharp',
    type: MaterialCommunityIcons,
  },
  {
    color: 'indigo.300',
    name: 'language-php',
    type: MaterialCommunityIcons,
  },
  {
    color: 'yellow.300',
    name: 'language-javascript',
    type: MaterialCommunityIcons,
  },
  {
    color: 'primary.400',
    name: 'language-go',
    type: MaterialCommunityIcons,
  },
  {
    color: 'orange.600',
    name: 'git',
    type: MaterialCommunityIcons,
  },
  {
    color: 'white',
    name: 'github',
    type: MaterialCommunityIcons,
  },
];
