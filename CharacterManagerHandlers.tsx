import { Character, Skill, Feat, CastingProgression, Power } from "./types";
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

export const handleAddSpellSlot = (activeChar, setCharacters) => {
  if (activeChar) {
    const newSlot = { level: "1", available: "0", total: "0", type: "Arcane" };
    const updatedSlots = [...activeChar.spellSlots, newSlot];
    updateCharacter(activeChar.id, "spellSlots", updatedSlots, setCharacters);
  }
};

export const handleRemoveSpellSlot = (activeChar, index, setCharacters) => {
  if (activeChar) {
    const updatedSlots = activeChar.spellSlots.filter((_, i) => i !== index);
    updateCharacter(activeChar.id, "spellSlots", updatedSlots, setCharacters);
  }
};

export const handleAddSpell = (activeChar, setCharacters) => {
  if (activeChar) {
    const newSpell = { level: "1", name: "", schoolDomain: "", description: "" };
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
  if (activeChar && activeChar.castingProgressions) {
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

// Update the existing remove equipment handler to REMOVE the confirmation prompt
export const handleRemoveEquipment = (
  charId: number,
  itemId: number,
  itemType: "equippedWeapons" | "equippedArmor" | "equippedItems",
  characters: Character[],
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
  // Remove this confirmation line that was creating the double prompt:
  // if (!window.confirm("Are you sure you want to remove this item?")) return;

  const charIndex = characters.findIndex((c) => c.id === charId);
  if (charIndex === -1) return;

  const updatedCharacters = [...characters];
  updatedCharacters[charIndex][itemType] = updatedCharacters[charIndex][itemType].filter((item) => item.id !== itemId);
  setCharacters(updatedCharacters);
};