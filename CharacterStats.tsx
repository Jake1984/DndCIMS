import React from "react";
import { Character } from "./types";
import { getModifier } from "./CharacterManagerUtils";
import { updateCharacter } from "./CharacterManagerActions";
import { handlePortraitUpload } from "./CharacterManagerHelpers";

interface CharacterStatsProps {
  character: Character;
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
}

const CharacterStats: React.FC<CharacterStatsProps> = ({ character, setCharacters }) => {
  // Ensure character is defined
  if (!character) {
    return <div>Loading Character Stats...</div>;
  }

  return (
    <div className="character-stats">
      <h2>Character Stats</h2>
      
      <div className="character-stats-container">
        {/* Column 1: Character Info and Portrait */}
        <div className="column">
          {/* Basic Character Info */}
          <div className="character-info">
            <h3>Character Info</h3>
            
            {/* Portrait Section - Rearranged with button below portrait */}
            <div className="portrait-section">
              {character.portrait ? (
                <img src={character.portrait} alt="Character Portrait" className="character-portrait" />
              ) : (
                <div className="empty-portrait">No Portrait</div>
              )}
              
              {/* Choose Portrait button moved below the portrait/placeholder */}
              <button className="choose-file-button" onClick={() => document.getElementById('portraitUpload')?.click()}>
                <img src="images/choose.png" alt="Choose Portrait" /> Choose Portrait
              </button>
              <input
                type="file"
                id="portraitUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handlePortraitUpload(e, character.id, [character], setCharacters)}
              />
            </div>
            
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                value={character.name}
                onChange={(e) => updateCharacter(character.id, "name", e.target.value, setCharacters)}
              />
            </div>
            <div className="form-group">
              <label>Class</label>
              <input 
                type="text" 
                value={character.classType}
                onChange={(e) => updateCharacter(character.id, "classType", e.target.value, setCharacters)}
              />
            </div>
            <div className="form-group">
              <label>Level</label>
              <input 
                type="text" 
                value={character.level}
                onChange={(e) => updateCharacter(character.id, "level", e.target.value, setCharacters)}
              />
            </div>
            <div className="form-group">
              <label>Race</label>
              <input 
                type="text" 
                value={character.race}
                onChange={(e) => updateCharacter(character.id, "race", e.target.value, setCharacters)}
              />
            </div>
            <div className="form-group">
              <label>Alignment</label>
              <input 
                type="text" 
                value={character.alignment}
                onChange={(e) => updateCharacter(character.id, "alignment", e.target.value, setCharacters)}
              />
            </div>
            <div className="form-group">
              <label>HP</label>
              <input 
                type="text" 
                value={character.hp}
                onChange={(e) => updateCharacter(character.id, "hp", e.target.value, setCharacters)}
              />
            </div>
            
            {/* Background & Personality */}
            <div className="background-section">
              <h3>Background & Personality</h3>
              <div className="form-group">
                <label>Background</label>
                <textarea 
                  value={character.background}
                  onChange={(e) => updateCharacter(character.id, "background", e.target.value, setCharacters)}
                />
              </div>
              <div className="form-group">
                <label>Personality</label>
                <textarea 
                  value={character.personality}
                  onChange={(e) => updateCharacter(character.id, "personality", e.target.value, setCharacters)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Ability Scores, Saving Throws and Combat Stats */}
        <div className="column">
          {/* Ability Scores Section */}
          <div className="stats-section">
            <h3>Ability Scores</h3>
            {["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"].map((stat) => (
              <div key={stat} className="stat-row form-group">
                <label>{stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
                <input
                  type="number"
                  value={character[stat]}
                  onChange={(e) => updateCharacter(character.id, stat as keyof Character, parseInt(e.target.value), setCharacters)}
                />
                <span>Modifier: {getModifier(character[stat])}</span>
              </div>
            ))}
          </div>

          {/* Saving Throws Section */}
          <div className="stats-section">
            <h3>Saving Throws</h3>
            {["fortitude", "reflex", "will"].map((save) => (
              <div key={save} className="stat-row form-group">
                <label>{save.charAt(0).toUpperCase() + save.slice(1)}</label>
                <input
                  type="number"
                  value={character[save]}
                  onChange={(e) => updateCharacter(character.id, save as keyof Character, parseInt(e.target.value), setCharacters)}
                />
                <span>Total: {character[save]}</span>
              </div>
            ))}
          </div>

          {/* Combat Stats Section */}
          <div className="stats-section">
            <h3>Combat Stats</h3>
            <div className="stat-row form-group">
              <label>Initiative</label>
              <input
                type="number"
                value={character.initiativeBonus}
                onChange={(e) => updateCharacter(character.id, "initiativeBonus", parseInt(e.target.value), setCharacters)}
              />
            </div>
            <div className="stat-row form-group">
              <label>Base Attack Bonus</label>
              <input
                type="number"
                value={character.bab}
                onChange={(e) => updateCharacter(character.id, "bab", e.target.value, setCharacters)}
              />
            </div>
            <div className="stat-row form-group">
              <label>Armor Class</label>
              <input
                type="number"
                value={character.armorBonus}
                onChange={(e) => updateCharacter(character.id, "armorBonus", parseInt(e.target.value), setCharacters)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterStats;