import React from "react";

const CharacterSpellcasting = ({ activeCharacter, handleAddSpell, handleRemoveSpell, handleAddSlot, handleRemoveSlot, handleAddClass }) => {
  if (!activeCharacter) return null;

  return (
    <div className="character-spellcasting">
      <div className="spellcasting-section">
        <h3>Spellcasting & Psionics</h3>

        <div className="spellcasting-classes">
        <p>{(activeCharacter.spellcastingClasses?.length || 0) > 0 ? "" : "No spellcasting classes added yet."}</p>
          <button className="add-btn" onClick={handleAddClass}>
            <img src="add.png" alt="Add Class" />
          </button>
        </div>

        <h3>Spell Slots / Power Points</h3>
        <div className="spell-slots">
        {(activeCharacter.spellSlots || []).map((slot, index) => (
            <div key={index} className="spell-slot">
              <input type="number" value={slot.level} readOnly />
              <input type="number" value={slot.current} readOnly />
              <span>/</span>
              <input type="number" value={slot.max} readOnly />
              <button className="remove-btn" onClick={() => handleRemoveSlot(index)}>
                <img src="remove.png" alt="Remove" />
              </button>
            </div>
          ))}
          <button className="add-btn" onClick={handleAddSlot}>
            <img src="add.png" alt="Add Slot" />
          </button>
        </div>

        <h3>Known Spells & Powers</h3>
        <div className="known-spells">
        {(activeCharacter.knownSpells || []).map((spell, index) => (
            <div key={index} className="spell-entry">
              <input type="number" placeholder="Level" value={spell.level} readOnly />
              <input type="text" placeholder="Name" value={spell.name} readOnly />
              <input type="text" placeholder="School/Domain/Discipline" value={spell.school} readOnly />
              <textarea placeholder="Description" value={spell.description} readOnly />
              <button className="remove-btn" onClick={() => handleRemoveSpell(index)}>
                <img src="remove.png" alt="Remove" />
              </button>
            </div>
          ))}
          <button className="add-btn" onClick={handleAddSpell}>
            <img src="add.png" alt="Add Spell / Power" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterSpellcasting;
