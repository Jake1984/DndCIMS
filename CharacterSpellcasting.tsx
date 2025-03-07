import React from "react";
import { Character } from "./types";
import { updateCharacter } from "./CharacterManagerActions";
import { 
  handleAddSpell, 
  handleRemoveSpell, 
  handleAddSpellSlot, 
  handleRemoveSpellSlot,
  handleAddCastingProgression 
} from "./CharacterManagerHandlers";

interface CharacterSpellcastingProps {
  character: Character;
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
}

const CharacterSpellcasting: React.FC<CharacterSpellcastingProps> = ({ 
  character, 
  setCharacters 
}) => {
  if (!character) return <div>Loading spellcasting information...</div>;

  // Add confirmation handlers
  const handleConfirmRemoveSpellSlot = (index: number) => {
    if (window.confirm("Are you sure you want to remove this spell slot?")) {
      handleRemoveSpellSlot(character, index, setCharacters);
    }
  };

  const handleConfirmRemoveSpell = (index: number) => {
    if (window.confirm("Are you sure you want to remove this spell?")) {
      handleRemoveSpell(character, index, setCharacters);
    }
  };

  return (
    <div className="character-section">
      <h2>Spellcasting & Psionics</h2>
      
      <div className="spellcasting-section">
        <div className="section-header">
          <h3>Spell Slots / Power Points</h3>
          <button className="add-slot" onClick={() => handleAddSpellSlot(character, setCharacters)}>
            <img src="images/add.png" alt="Add" /> Add Slot
          </button>
        </div>

        <div className="spell-slots">
          {character.spellSlots.length === 0 ? (
            <p>No spell slots added yet.</p>
          ) : (
            character.spellSlots.map((slot, index) => (
              <div key={index} className="form-group spell-slot">
                <label>Level</label>
                <input 
                  type="text" 
                  value={slot.level}
                  onChange={(e) => {
                    const updatedSlots = [...character.spellSlots];
                    updatedSlots[index].level = e.target.value;
                    updateCharacter(character.id, "spellSlots", updatedSlots, setCharacters);
                  }}
                />
                <label>Type</label>
                <select
                  value={slot.type || "Arcane"}
                  onChange={(e) => {
                    const updatedSlots = [...character.spellSlots];
                    updatedSlots[index].type = e.target.value;
                    updateCharacter(character.id, "spellSlots", updatedSlots, setCharacters);
                  }}
                >
                  <option value="Arcane">Arcane</option>
                  <option value="Divine">Divine</option>
                  <option value="Psionic">Psionic</option>
                </select>
                <label>Available / Total</label>
                <input 
                  type="text" 
                  value={slot.available}
                  onChange={(e) => {
                    const updatedSlots = [...character.spellSlots];
                    updatedSlots[index].available = e.target.value;
                    updateCharacter(character.id, "spellSlots", updatedSlots, setCharacters);
                  }}
                />
                <span>/</span>
                <input 
                  type="text" 
                  value={slot.total}
                  onChange={(e) => {
                    const updatedSlots = [...character.spellSlots];
                    updatedSlots[index].total = e.target.value;
                    updateCharacter(character.id, "spellSlots", updatedSlots, setCharacters);
                  }}
                />
                <button className="remove-button" onClick={() => handleConfirmRemoveSpellSlot(index)}>
                  <img src="images/remove.png" alt="Remove" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="section-header">
          <h3>Known Spells & Powers</h3>
          <button className="add-spell" onClick={() => handleAddSpell(character, setCharacters)}>
            <img src="images/add.png" alt="Add" /> Add Spell
          </button>
        </div>

        <div className="known-spells">
          {character.knownSpells.length === 0 ? (
            <p>No spells or powers added yet.</p>
          ) : (
            character.knownSpells.map((spell, index) => (
              <div key={index} className="form-group spell-entry">
                <label>Level</label>
                <input 
                  type="text" 
                  value={spell.level}
                  onChange={(e) => {
                    const updatedSpells = [...character.knownSpells];
                    updatedSpells[index].level = e.target.value;
                    updateCharacter(character.id, "knownSpells", updatedSpells, setCharacters);
                  }}
                />
                <label>Name</label>
                <input 
                  type="text" 
                  value={spell.name}
                  onChange={(e) => {
                    const updatedSpells = [...character.knownSpells];
                    updatedSpells[index].name = e.target.value;
                    updateCharacter(character.id, "knownSpells", updatedSpells, setCharacters);
                  }}
                />
                <label>School/Domain/Discipline</label>
                <input 
                  type="text" 
                  value={spell.schoolDomain || ""}
                  onChange={(e) => {
                    const updatedSpells = [...character.knownSpells];
                    updatedSpells[index].schoolDomain = e.target.value;
                    updateCharacter(character.id, "knownSpells", updatedSpells, setCharacters);
                  }}
                />
                <label>Description</label>
                <textarea 
                  value={spell.description || ""}
                  onChange={(e) => {
                    const updatedSpells = [...character.knownSpells];
                    updatedSpells[index].description = e.target.value;
                    updateCharacter(character.id, "knownSpells", updatedSpells, setCharacters);
                  }}
                />
                <button className="remove-button" onClick={() => handleConfirmRemoveSpell(index)}>
                  <img src="images/remove.png" alt="Remove" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterSpellcasting;
