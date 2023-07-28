import { IconProps } from '../types';

export const getMatchingCards = (cards: IconProps[]): IconProps[] => {
  const groupedIcons: { [name: string]: IconProps[] } = {};

  cards.forEach((icon) => {
    groupedIcons[icon.name] = groupedIcons[icon.name]
      ? [...groupedIcons[icon.name], icon]
      : [icon];
  });

  const matchingIcons = Object.values(groupedIcons).find(
    (group) => group.length === 2,
  );

  return matchingIcons || [];
};
