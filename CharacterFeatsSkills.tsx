import React from "react";
import { Character } from "../types/CharacterTypes"; // Adjust path if needed

type CharacterFeatsSkillsProps = {
  character: Character;
  updateCharacter: (field: keyof Character, value: any) => void;
};

const CharacterFeatsSkills: React.FC<CharacterFeatsSkillsProps> = ({
  character,
  updateCharacter
}) => {
  console.log("CharacterFeatsSkills Loaded", character); // Debugging

  if (!character) {
    return <p>Loading Character...</p>; // Prevent crashes if character is missing
  }

  // Ensure feats and skills are initialized
  const feats = character.feats || [];
  const skills = character.skills || [];

  console.log("Feats Data:", feats); // Additional debug info

  // Function to add a new feat
  const addFeat = () => {
    const newFeat = { name: "New Feat" };
    updateCharacter({ ...character, feats: [...feats, newFeat] });
  };

  // Function to remove a feat
  const removeFeat = (index: number) => {
    const updatedFeats = feats.filter((_, i) => i !== index);
    updateCharacter({ ...character, feats: updatedFeats });
  };

  // Function to add a new skill
  const addSkill = () => {
    const newSkillName = prompt("Enter new skill name:");
    if (newSkillName) {
      updateCharacter("skills", [
        ...skills,
        { name: newSkillName, value: 0, modifier: 0 }
      ]);
    }
  };

  // Function to update a skill’s value
  const updateSkill = (index: number, value: string) => {
    const updatedSkills = skills.map((skill, i) =>
      i === index ? { ...skill, value: Number(value) } : skill
    );
    updateCharacter("skills", updatedSkills);
  };

  // Function to remove a skill
  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    updateCharacter("skills", updatedSkills);
  };

  return (
    <div className="character-section">
      <h2>Feats & Abilities</h2>

      {/* Feats Section */}
      <h3>Feats</h3>
      {feats.length === 0 ? (
        <p>No feats added yet.</p>
      ) : (
        <ul>
          {feats.map((feat, index) => (
            <li key={index}>
              {feat.name}
              <button onClick={() => removeFeat(index)}>❌</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={addFeat}>➕ Add Feat</button>

      {/* Skills Section */}
      <h3>Skills</h3>
      {skills.length > 0 ? (
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>
              {skill.name}:{" "}
              <input
                type="number"
                value={skill.value}
                onChange={(e) => updateSkill(index, e.target.value)}
              />
              {" ("}
              {skill.modifier >= 0 ? "+" : ""}
              {skill.modifier})
              <button onClick={() => removeSkill(index)}>❌</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No skills available.</p>
      )}
      <button onClick={addSkill}>➕ Add Skill</button>
    </div>
  );
};

export default CharacterFeatsSkills;
