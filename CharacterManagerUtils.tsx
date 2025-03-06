export const getModifier = (score: number) => Math.floor((score - 10) / 2);

export const saveCharacters = (characters: Character[]) => {
    localStorage.setItem("characters", JSON.stringify(characters));
};
