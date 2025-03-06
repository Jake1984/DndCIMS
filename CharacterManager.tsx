// CharacterManager.tsx
import React, { useState, useEffect } from "react";
import CharacterStats from "./CharacterStats";
import CharacterFeatsSkills from "./CharacterFeatsSkills";
import CharacterSpellcasting from "./CharacterSpellcasting";
import CharacterInventory from "./CharacterInventory";
import { saveCharacters, loadCharacters } from "./CharacterManagerUtils";

const CharacterManager = () => {
  const [characters, setCharacters] = useState(() => loadCharacters());
  const [activeCharacterIndex, setActiveCharacterIndex] = useState<number | null>(0);

  useEffect(() => {
    saveCharacters(characters);
  }, [characters]);

  const addCharacter = () => {
    const newCharacter = {
      id: Date.now(),
      name: "New Character",
      classType: "",
      level: 1,
      alignment: "N",
      stats: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
      skills: [],
      feats: [],
      spellcasting: { knownSpells: [], spellSlots: [] },
      inventory: { weapons: [], armor: [], magicItems: [], items: [] },
    };
    setCharacters([...characters, newCharacter]);
    setActiveCharacterIndex(characters.length);
  };

  const deleteCharacter = (index: number) => {
    const updatedCharacters = characters.filter((_, i) => i !== index);
    setCharacters(updatedCharacters);
    setActiveCharacterIndex(updatedCharacters.length ? 0 : null);
  };

  return (
    <div className="character-manager">
      <h1>Character & Party Manager</h1>
      <div className="character-tabs">
        {characters.map((char, index) => (
          <button key={char.id} className={index === activeCharacterIndex ? "active" : ""} onClick={() => setActiveCharacterIndex(index)}>
            {char.name}
          </button>
        ))}
        <button onClick={addCharacter}>New Character</button>
      </div>
      {activeCharacterIndex !== null && (
        <div className="character-container">
          <CharacterStats character={characters[activeCharacterIndex]} setCharacters={setCharacters} />
          <CharacterFeatsSkills character={characters[activeCharacterIndex]} setCharacters={setCharacters} />
          <CharacterSpellcasting character={characters[activeCharacterIndex]} setCharacters={setCharacters} />
          <CharacterInventory character={characters[activeCharacterIndex]} setCharacters={setCharacters} />
          <button onClick={() => deleteCharacter(activeCharacterIndex)}>Delete Character</button>
        </div>
      )}
    </div>
  );
};

export default CharacterManager;
