import React from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  useColorMode,
} from 'native-base';
import { useGame } from '../../contexts/Game';
import { Card } from '../../components/Card';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export const Game = () => {
  const {
    level,
    handleCardPress,
    cards,
    startGame,
    gameHasStarted,
    restartGame,
  } = useGame();
  const { colorMode } = useColorMode();

  return (
    <Box padding={8} flex={1} alignItems="center" justifyContent="flex-start">
      <VStack w="full" alignItems="flex-start">
        <Text fontSize="4xl">Memory Game</Text>
        <Text fontSize="sm">By Matheus Muniz</Text>

        {gameHasStarted && (
          <HStack w="full" justifyContent="space-between" alignItems="center">
            <Text alignSelf="center" fontSize="lg" marginY={5}>
              {`Level ${level}`}
            </Text>
            <Button
              variant="subtle"
              bg={colorMode === 'dark' ? 'dark.50' : 'gray.300'}
              _text={{
                color: colorMode === 'dark' ? 'white' : 'black',
                fontSize: 'md',
              }}
              _pressed={{ bg: colorMode === 'dark' ? 'dark.200' : 'gray.400' }}
              rightIcon={
                <MaterialCommunityIcons
                  color={colorMode === 'dark' ? 'white' : 'black'}
                  name="restart"
                  size={20}
                />
              }
              onPress={() => restartGame()}
            >
              Restart
            </Button>
          </HStack>
        )}
      </VStack>
      {gameHasStarted && (
        <Flex
          width="full"
          direction="row"
          wrap="wrap"
          justify="center"
          alignItems="center"
          style={{ gap: 20 }}
        >
          {cards.map((icon) => (
            <Card
              onPress={() => handleCardPress(icon)}
              key={icon.id}
              iconProps={icon}
            />
          ))}
        </Flex>
      )}
      {!gameHasStarted && (
        <Flex h="1/2" align="center" justify="center">
          <Button
            _light={{
              bg: 'gray.300',
              _text: { color: 'black' },
              _pressed: { bg: 'gray.400' },
            }}
            _dark={{
              bg: 'dark.50',
              _text: { color: 'white' },
              _pressed: { bg: 'dark.200' },
            }}
            _text={{ fontSize: '2xl' }}
            onPress={startGame}
            rounded="lg"
            px={16}
            py={4}
            rightIcon={
              <Ionicons
                name="game-controller"
                size={30}
                color={colorMode === 'dark' ? 'white' : 'black'}
                style={{ marginLeft: 10 }}
              />
            }
          >
            Start Game
          </Button>
        </Flex>
      )}
    </Box>
  );
};
