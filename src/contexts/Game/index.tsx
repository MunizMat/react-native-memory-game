import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { icons } from '../../constants/icons';
import { shuffleArray } from '../../utils/shuffleArray';
import { GameDifficulty, IconProps } from '../../types';
import { getMatchingCards } from '../../utils/getMatchingCards';
import { useSettings } from '../Settings';

interface GameContextProps {
  handleCardPress: (icon: IconProps) => void;
  level: number;
  cards: IconProps[];
  startGame: () => void;
  restartGame: () => void;
  gameHasStarted: boolean;
  previewSeconds: number;
}

interface GameProviderProps {
  children: ReactNode;
}

const GameContext = createContext<GameContextProps>({} as GameContextProps);

export const GameProvider: FC<GameProviderProps> = ({ children }) => {
  const { gameDifficulty } = useSettings().settings;
  const [level, setLevel] = useState(1);

  /* ---------- Constants ---------- */
  const maxLevel = 6;

  const gameDifficultySeconds: Record<GameDifficulty, number> = {
    easy: 4,
    medium: 2,
    hard: 1,
  };

  const initialCards = icons.slice(maxLevel - level).map((icon) => ({
    ...icon,
    visible: false,
    uncovered: false,
    id: `${icon.name}`,
  }));

  const initialCardsDuplicate = initialCards.map((card) => ({
    ...card,
    id: `${card.name}-duplicate`,
  }));

  /* ---------- Memos ---------- */
  const allCards = useMemo(
    () => shuffleArray([...initialCards, ...initialCardsDuplicate]),
    [level],
  );

  /* ---------- States ---------- */
  const [attempts, setAttempts] = useState(3);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [cards, setCards] = useState<IconProps[]>(allCards);

  /* ---------- Refs ---------- */

  const selectedCards = useRef<IconProps[]>([]);

  const uncoveredCards = cards.filter((card) => card.uncovered);
  const previewSeconds = gameDifficultySeconds[gameDifficulty];

  const handleAttempts = () => {
    const matchingCards = getMatchingCards(selectedCards.current);

    selectedCards.current = [];

    setTimeout(() => {
      if (matchingCards.length) {
        setCards(
          cards.map((card) =>
            card.name === matchingCards[0].name
              ? { ...card, uncovered: true }
              : { ...card, visible: false },
          ),
        );
      } else setCards(cards.map((card) => ({ ...card, visible: false })));
      setAttempts(3);
    }, 2000);
  };

  const showCards = () => {
    setCards(
      shuffleArray(allCards).map((card) => ({ ...card, uncovered: true })),
    );
    setTimeout(() => {
      setCards((crds) => crds.map((card) => ({ ...card, uncovered: false })));
    }, previewSeconds * 1000);
  };

  const startGame = () => {
    setGameHasStarted(true);
    showCards();
  };

  const restartGame = () => {
    setLevel(1);
    showCards();
  };

  useEffect(() => {
    showCards();
  }, []);

  useEffect(() => {
    if (uncoveredCards.length === cards.length - 2) {
      setCards(cards.map((card) => ({ ...card, uncovered: true })));
      if (level !== maxLevel)
        setTimeout(() => {
          setLevel(level + 1);
        }, previewSeconds * 1000);
    }

    if (attempts) return;

    handleAttempts();
  }, [attempts]);

  useEffect(() => {
    showCards();
  }, [level]);

  const handleCardPress = (icon: IconProps) => {
    if (!attempts) return;

    selectedCards.current.push(icon);
    setAttempts(attempts - 1);

    setCards(
      cards.map((card) =>
        card.id === icon.id ? { ...card, visible: !card.visible } : card,
      ),
    );
  };

  const value = useMemo(
    () => ({
      handleCardPress,
      level,
      cards,
      gameHasStarted,
      startGame,
      restartGame,
      previewSeconds,
      gameDifficulty,
    }),
    [
      handleCardPress,
      cards,
      level,
      gameHasStarted,
      startGame,
      restartGame,
      previewSeconds,
      gameDifficulty,
    ],
  );
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  return context;
};
