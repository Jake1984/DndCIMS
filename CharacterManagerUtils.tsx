import { Character } from "./types";

export const getModifier = (score: number) => Math.floor((score - 10) / 2);

export const saveCharacters = (characters: Character[]) => {
  localStorage.setItem("characters", JSON.stringify(characters));
};

export const loadCharacters = (): Character[] => {
  const characters = localStorage.getItem("characters");
  return characters ? JSON.parse(characters) : [];
};
