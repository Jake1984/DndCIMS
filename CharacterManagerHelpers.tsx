import { Character } from "./types";
import { updateCharacter } from "./CharacterManagerActions";

export const handleImageUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  charId: number,
  field: keyof Character,
  characters: Character[],
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>,
  itemType?: string,
  itemId?: number
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const imageData = e.target?.result as string;

    if (itemType && itemId !== undefined) {
      const charIndex = characters.findIndex((c) => c.id === charId);
      if (charIndex === -1) return;

      const updatedCharacters = [...characters];
      let updatedList;
      let targetField;

      switch (itemType) {
        case "equippedWeapons":
        case "equippedArmor":
        case "equippedItems":
          updatedList = [...updatedCharacters[charIndex][itemType]];
          targetField = itemType;
          break;
        default:
          return;
      }

      const itemIndex = updatedList.findIndex((i) => i.id === itemId);
      if (itemIndex !== -1) {
        updatedList[itemIndex] = {
          ...updatedList[itemIndex],
          thumbnail: imageData
        };
        updateCharacter(charId, targetField as keyof Character, updatedList, setCharacters);
      }
    } else {
      updateCharacter(charId, field, imageData, setCharacters);
    }
  };
  reader.readAsDataURL(file);
};

export const handlePortraitUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  charId: number,
  characters: Character[],
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
  handleImageUpload(event, charId, "portrait", characters, setCharacters);
};