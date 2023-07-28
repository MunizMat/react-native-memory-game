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

interface GameContextProps {
  handleCardPress: (icon: IconProps) => void;
  level: number;
  cards: IconProps[];
  startGame: () => void;
  restartGame: () => void;
  gameHasStarted: boolean;
  previewSeconds: number;
  setPreviewSeconds: React.Dispatch<React.SetStateAction<number>>;
  handlePreviewSecondsChange: (text: string) => string;
  setGameDifficulty: React.Dispatch<React.SetStateAction<GameDifficulty>>;
  gameDifficulty: GameDifficulty;
}

interface GameProviderProps {
  children: ReactNode;
}

const GameContext = createContext<GameContextProps>({} as GameContextProps);

export const GameProvider: FC<GameProviderProps> = ({ children }) => {
  const [level, setLevel] = useState(1);

  /* ---------- Constants ---------- */
  const maxLevel = 6;

  const minPreviewSeconds = 0.1;
  const maxPreviewSeconds = 5;

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
  const [previewSeconds, setPreviewSeconds] = useState(3);
  const [gameDifficulty, setGameDifficulty] = useState<GameDifficulty>('easy');

  /* ---------- Refs ---------- */

  const selectedCards = useRef<IconProps[]>([]);

  const uncoveredCards = cards.filter((card) => card.uncovered);

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

  const handlePreviewSecondsChange = (text: string) => {
    let newSeconds = Number(text);

    if (isNaN(newSeconds)) newSeconds = 3;

    if (newSeconds > maxPreviewSeconds) newSeconds = maxPreviewSeconds;

    if (newSeconds < minPreviewSeconds) newSeconds = minPreviewSeconds;

    setPreviewSeconds(newSeconds);
    return newSeconds.toString();
  };

  const value = useMemo(
    () => ({
      handleCardPress,
      level,
      cards,
      gameHasStarted,
      startGame,
      restartGame,
      setPreviewSeconds,
      previewSeconds,
      handlePreviewSecondsChange,
      setGameDifficulty,
      gameDifficulty,
    }),
    [
      handleCardPress,
      cards,
      level,
      gameHasStarted,
      startGame,
      restartGame,
      setPreviewSeconds,
      previewSeconds,
      handlePreviewSecondsChange,
      setGameDifficulty,
      gameDifficulty,
    ],
  );
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  return context;
};
