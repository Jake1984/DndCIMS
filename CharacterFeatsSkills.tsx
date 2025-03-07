import React from "react";
import { Character } from "./types";
import { handleAddSkill, handleRemoveSkill, handleAddFeat, handleRemoveFeat } from "./CharacterManagerHandlers";
import { updateCharacter } from "./CharacterManagerActions";

interface CharacterFeatsSkillsProps {
  character: Character;
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
}

const CharacterFeatsSkills: React.FC<CharacterFeatsSkillsProps> = ({
  character,
  setCharacters
}) => {
  if (!character) {
    return <p>Loading Character...</p>;
  }

  // Add confirmation handler for skill removal
  const handleConfirmRemoveSkill = (index: number) => {
    if (window.confirm("Are you sure you want to remove this skill?")) {
      handleRemoveSkill(character, index, setCharacters);
    }
  };

  // Add confirmation handler for feat removal
  const handleConfirmRemoveFeat = (index: number) => {
    if (window.confirm("Are you sure you want to remove this feat?")) {
      handleRemoveFeat(character, index, setCharacters);
    }
  };

  return (
    <div className="character-section">
      <h2>Feats & Skills</h2>

      {/* Skills Section */}
      <div className="form-section">
        <div className="section-header">
          <h3>Skills</h3>
          <button className="add-skill" onClick={() => handleAddSkill(character, setCharacters)}>
            <img src="images/add.png" alt="Add" /> Add Skill
          </button>
        </div>
        <div className="skills-list">
          {character.skills.length === 0 ? (
            <p>No skills added yet.</p>
          ) : (
            character.skills.map((skill, index) => (
              <div key={index} className="form-group">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => {
                    const updatedSkills = [...character.skills];
                    updatedSkills[index].name = e.target.value;
                    updateCharacter(character.id, "skills", updatedSkills, setCharacters);
                  }}
                />
                <select
                  value={skill.ability}
                  onChange={(e) => {
                    const updatedSkills = [...character.skills];
                    updatedSkills[index].ability = e.target.value as keyof Character;
                    updateCharacter(character.id, "skills", updatedSkills, setCharacters);
                  }}
                >
                  <option value="strength">STR</option>
                  <option value="dexterity">DEX</option>
                  <option value="constitution">CON</option>
                  <option value="intelligence">INT</option>
                  <option value="wisdom">WIS</option>
                  <option value="charisma">CHA</option>
                </select>
                <input
                  type="number"
                  value={skill.bonus}
                  onChange={(e) => {
                    const updatedSkills = [...character.skills];
                    updatedSkills[index].bonus = Number(e.target.value);
                    updateCharacter(character.id, "skills", updatedSkills, setCharacters);
                  }}
                />
                <button className="remove-button" onClick={() => handleConfirmRemoveSkill(index)}>
                  <img src="images/remove.png" alt="Remove" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Feats Section */}
      <div className="form-section feats-section">
        <div className="section-header">
          <h3>Feats & Abilities</h3>
          <button className="add-feat" onClick={() => handleAddFeat(character, setCharacters)}>
            <img src="images/add.png" alt="Add" /> Add Feat
          </button>
        </div>
        <div className="feats-list">
          {character.feats.length === 0 ? (
            <p>No feats or abilities added yet.</p>
          ) : (
            character.feats.map((feat, index) => (
              <div key={index} className="form-group">
                <input
                  type="text"
                  value={feat.name}
                  onChange={(e) => {
                    const updatedFeats = [...character.feats];
                    updatedFeats[index].name = e.target.value;
                    updateCharacter(character.id, "feats", updatedFeats, setCharacters);
                  }}
                />
                <textarea
                  value={feat.description || ""}
                  onChange={(e) => {
                    const updatedFeats = [...character.feats];
                    updatedFeats[index].description = e.target.value;
                    updateCharacter(character.id, "feats", updatedFeats, setCharacters);
                  }}
                />
                <button className="remove-button" onClick={() => handleConfirmRemoveFeat(index)}>
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

export default CharacterFeatsSkills;
