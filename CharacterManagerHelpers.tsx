import { Character } from "./CharacterManager";

export const handleImageUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  charId: number,
  field: string,
  characters: Character[],
  updateCharacter: (
    id: number,
    field: keyof Character,
    value: any,
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
  ) => void,
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>,
  itemType?: string,
  itemId?: number
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const imageData = e.target?.result as string;

    const charIndex = characters.findIndex((c) => c.id === charId);
    if (charIndex === -1) return;

    const updatedCharacters = [...characters];

    if (field === "portrait") {
      updatedCharacters[charIndex].portrait = imageData;
    } else if (itemType && itemId !== undefined) {
      let updatedList;
      let targetField;

      switch (itemType) {
        case "weapon":
          updatedList = [...updatedCharacters[charIndex].equippedWeapons];
          targetField = "equippedWeapons";
          break;
        case "armor":
          updatedList = [...updatedCharacters[charIndex].equippedArmor];
          targetField = "equippedArmor";
          break;
        case "item":
          updatedList = [...updatedCharacters[charIndex].equippedItems];
          targetField = "equippedItems";
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
        updatedCharacters[charIndex][targetField] = updatedList;
      }
    }

    setCharacters(updatedCharacters);
  };
  reader.readAsDataURL(file);
};

export const handlePortraitUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  charId: number,
  characters: Character[],
  updateCharacter: (id: number, field: keyof Character, value: any, setCharacters: React.Dispatch<React.SetStateAction<Character[]>>) => void,
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
  handleImageUpload(event, charId, "portrait", characters, updateCharacter, setCharacters);
};