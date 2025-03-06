import { Character, Skill, Feat, CastingProgression, Power, Equipment } from "./CharacterManager";
import { updateCharacter } from "./CharacterManagerActions";

export const handleAddSkill = (activeChar, setCharacters) => {
  if (activeChar) {
    const newSkill = { name: "", ability: "strength", bonus: 0 };
    const updatedSkills = [...activeChar.skills, newSkill];
    updateCharacter(activeChar.id, "skills", updatedSkills, setCharacters);
  }
};

export const handleRemoveSkill = (activeChar, index, setCharacters) => {
  if (activeChar) {
    const updatedSkills = activeChar.skills.filter((_, i) => i !== index);
    updateCharacter(activeChar.id, "skills", updatedSkills, setCharacters);
  }
};

export const handleAddFeat = (activeChar, setCharacters) => {
  if (activeChar) {
    const newFeat = { id: Date.now(), name: "", description: "" };
    const updatedFeats = [...activeChar.feats, newFeat];
    updateCharacter(activeChar.id, "feats", updatedFeats, setCharacters);
  }
};

export const handleRemoveFeat = (activeChar, index, setCharacters) => {
  if (activeChar) {
    const updatedFeats = activeChar.feats.filter((_, i) => i !== index);
    updateCharacter(activeChar.id, "feats", updatedFeats, setCharacters);
  }
};

export const handleAddSpellSlot = (activeChar, classIndex, setCharacters) => {
  if (activeChar) {
    const updatedProgressions = [...activeChar.castingProgressions];
    updatedProgressions[classIndex].spellSlots.push({ level: 1, available: 0, total: 0 });
    updateCharacter(activeChar.id, "castingProgressions", updatedProgressions, setCharacters);
  }
};

export const handleRemoveSpellSlot = (activeChar, classIndex, slotIndex, setCharacters) => {
  if (activeChar) {
    const updatedProgressions = [...activeChar.castingProgressions];
    updatedProgressions[classIndex].spellSlots.splice(slotIndex, 1);
    updateCharacter(activeChar.id, "castingProgressions", updatedProgressions, setCharacters);
  }
};

export const handleAddSpell = (activeChar, setCharacters) => {
  if (activeChar) {
    const newSpell = { level: "", name: "", schoolDomain: "", description: "" };
    const updatedSpells = [...activeChar.knownSpells, newSpell];
    updateCharacter(activeChar.id, "knownSpells", updatedSpells, setCharacters);
  }
};

export const handleRemoveSpell = (activeChar, index, setCharacters) => {
  if (activeChar) {
    const updatedSpells = activeChar.knownSpells.filter((_, i) => i !== index);
    updateCharacter(activeChar.id, "knownSpells", updatedSpells, setCharacters);
  }
};

export const handleAddCastingProgression = (activeChar, setCharacters) => {
  if (activeChar) {
    const newProgression = { className: "", spellSlots: [] };
    const updatedProgressions = [...(activeChar.castingProgressions || []), newProgression];
    updateCharacter(activeChar.id, "castingProgressions", updatedProgressions, setCharacters);
  }
};

export const handleRemoveCastingProgression = (activeChar, index, setCharacters) => {
  if (activeChar) {
    const updatedProgressions = activeChar.castingProgressions.filter((_, i) => i !== index);
    updateCharacter(activeChar.id, "castingProgressions", updatedProgressions, setCharacters);
  }
};

export const handleEquipmentImageUpload = (event, equipment, type, activeChar, setCharacters) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCharacters(prevCharacters => 
        prevCharacters.map(char => 
          char.id === activeChar.id 
            ? { 
                ...char, 
                [type]: char[type].map(item => 
                  item.id === equipment.id ? { ...item, thumbnail: reader.result } : item
                )
              } 
            : char
        )
      );
    };
    reader.readAsDataURL(file);
  }
};

export const handleRemoveEquipment = (
  charId: number,
  itemId: number,
  itemType: "weapon" | "armor" | "item",
  characters: Character[],
  updateCharacter: (id: number, field: keyof Character, value: any, setCharacters: React.Dispatch<React.SetStateAction<Character[]>>) => void,
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
  if (!window.confirm("Are you sure you want to remove this item?")) return;

  const charIndex = characters.findIndex((c) => c.id === charId);
  if (charIndex === -1) return;

  const updatedCharacters = [...characters];

  switch (itemType) {
    case "weapon":
      updatedCharacters[charIndex].equippedWeapons = updatedCharacters[charIndex].equippedWeapons.filter((w) => w.id !== itemId);
      break;
    case "armor":
      updatedCharacters[charIndex].equippedArmor = updatedCharacters[charIndex].equippedArmor.filter((a) => a.id !== itemId);
      break;
    case "item":
      updatedCharacters[charIndex].equippedItems = updatedCharacters[charIndex].equippedItems.filter((i) => i.id !== itemId);
      break;
  }

  setCharacters(updatedCharacters);
};