import { Box, Icon, Pressable, Text, useColorMode } from 'native-base';
import React, { FC } from 'react';
import { IconProps } from '../../types';

interface CardProps {
  iconProps: IconProps;
  onPress: () => void;
  disabled?: boolean;
}
export const Card: FC<CardProps> = ({ iconProps, onPress, disabled }) => {
  const { name, color, type, visible, uncovered } = iconProps;
  const { colorMode } = useColorMode();

  if (uncovered)
    return (
      <Box
        padding={2}
        rounded={10}
        bg={colorMode === 'dark' ? 'light.600' : 'gray.300'}
      >
        <Icon as={type} name={name} color={color} size={10} />
      </Box>
    );
  return (
    <Pressable
      disabled={disabled}
      bg={colorMode === 'dark' ? 'light.600' : 'gray.300'}
      padding={2}
      rounded={10}
      onPress={onPress}
      borderColor={colorMode === 'dark' ? 'white' : 'black'}
      borderWidth={visible ? 1 : 0}
    >
      <Box>
        {!visible ? (
          <Text marginX={4} fontSize="3xl">
            ?
          </Text>
        ) : (
          <Icon as={type} name={name} color={color} size={10} />
        )}
      </Box>
    </Pressable>
  );
};
