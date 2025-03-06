import { Character } from "./CharacterManager";

// Helper to save characters to localStorage
const saveCharacters = (characters: Character[]) => {
  localStorage.setItem("characters", JSON.stringify(characters));
};

export const addCharacter = (
  characters: Character[],
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
  const newCharacter: Character = {
    id: Date.now(), // Generates a unique ID
    name: "New Character",
    classType: "",
    level: 1,
    race: "",
    alignment: "N",
    deity: "",
    hp: 1,
    portrait: null,
    background: "",
    personality: "",
    strength: 9,
    dexterity: 9,
    constitution: 9,
    intelligence: 9,
    wisdom: 9,
    charisma: 9,
    bab: 1,
    initiativeBonus: 0,
    fortitude: 0,
    reflex: 0,
    will: 0,
    skills: [],
    feats: [],
    domains: [],
    spellSlots: [],
    knownSpells: [],
    castingProgressions: [],
    weapons: [],
    armor: [],
    magicItems: [],
    inventory: [],
  };

  const updatedCharacters = [...characters, newCharacter];
  setCharacters(updatedCharacters);
  localStorage.setItem("characters", JSON.stringify(updatedCharacters));
};

export const deleteCharacter = (
  id: number,
  characters: Character[],
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>,
  setActiveCharacter: React.Dispatch<React.SetStateAction<number | null>>
) => {
  const updatedCharacters = (characters ?? []).filter(char => char.id !== id);
  setCharacters(updatedCharacters);
  saveCharacters(updatedCharacters);
  if (updatedCharacters.length > 0) {
    setActiveCharacter(updatedCharacters[0].id);
  } else {
    setActiveCharacter(null);
  }
};

export const updateCharacter = (
  id: number,
  field: keyof Character,
  value: any,
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
  setCharacters(prevCharacters =>
    prevCharacters.map(char =>
      char.id === id ? { ...char, [field]: value } : char
    )
  );
};

export const addMagicItemToCharacter = (
  characterId: number,
  newMagicItem: { id: number; name: string; type: string; effect: string; thumbnail: string | null },
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
  setCharacters(prevCharacters =>
    prevCharacters.map(char =>
      char.id === characterId
        ? { ...char, magicItems: [...char.magicItems, newMagicItem] }
        : char
    )
  );
};

// Example usage
const characterId = 1; // Replace with the actual ID
const setCharacters = (characters: Character[]) => { /* Implementation */ };
const newMagicItem = { id: Date.now(), name: "", type: "magic", effect: "", thumbnail: null };
addMagicItemToCharacter(characterId, newMagicItem, setCharacters);