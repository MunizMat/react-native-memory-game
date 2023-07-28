import { ColorType } from 'native-base/lib/typescript/components/types';

export interface IconProps {
  name: string;
  type: unknown;
  color: ColorType;
  visible: boolean;
  uncovered: boolean;
  id: string;
}

export type CardIconState = 'hidden' | 'visible';

export type GameDifficulty = 'easy' | 'medium' | 'hard';
