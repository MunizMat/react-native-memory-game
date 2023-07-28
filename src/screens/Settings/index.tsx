import React, { useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  HStack,
  Input,
  Radio,
  Switch,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import { useColorMode } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '../../contexts/Game';
import { GameDifficulty } from '../../types';

export const Settings = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { colors } = useTheme();
  const {
    handlePreviewSecondsChange,
    previewSeconds,
    setGameDifficulty,
    gameDifficulty,
  } = useGame();

  const [value, setValue] = useState(previewSeconds.toString());

  return (
    <Box padding={10} flex={1} alignItems="center" justifyContent="flex-start">
      <Flex
        width="full"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack alignItems="center" space={4}>
          <Text fontSize="2xl">Light mode</Text>
          <Ionicons
            size={30}
            color={colorMode === 'dark' ? colors.white : colors.black}
            name="sunny-outline"
          />
        </HStack>
        <Switch
          isChecked={colorMode === 'light'}
          onToggle={() => toggleColorMode()}
          size="md"
        />
      </Flex>
      <Divider my={4} />
      <Flex
        width="full"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <VStack maxW="2/3">
          <Text fontSize="2xl">Preview Seconds</Text>
          <Text fontSize="xs">
            Amount of seconds to view the cards before they are hidden (Min:
            0.1, Max: 5)
          </Text>
        </VStack>
        <Input
          style={{ fontSize: 25, textAlign: 'center' }}
          value={value}
          onChangeText={(text) => setValue(text)}
          onEndEditing={() => {
            const updatedSeconds = handlePreviewSecondsChange(value);
            setValue(updatedSeconds);
          }}
          variant="underlined"
          maxW={50}
        />
      </Flex>
      <Divider my={4} />
      <HStack alignItems="center" justifyContent="space-between" w="full">
        <Text fontSize="2xl">Dificulty</Text>
        <Radio.Group
          name="difficulty"
          value={gameDifficulty}
          onChange={(value) => setGameDifficulty(value as GameDifficulty)}
        >
          <Radio value="easy" my={1}>
            Easy
          </Radio>
          <Radio value="medium" my={1}>
            Medium
          </Radio>
          <Radio value="hard" my={1}>
            Hard
          </Radio>
        </Radio.Group>
      </HStack>
    </Box>
  );
};
