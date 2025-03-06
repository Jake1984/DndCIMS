import React from "react";

const CharacterStats = ({ character = {}, setCharacters }) => {
  // Ensure character is defined and has default structure
  if (!character || Object.keys(character).length === 0) {
    return <div>Loading Character Stats...</div>;
  }

  const getModifier = (score) => Math.floor((score - 10) / 2);

  return (
    <div className="character-stats">
      <h2>Character Stats</h2>
      <p>Strength: {character.strength}</p>
      <p>Dexterity: {character.dexterity}</p>
      <p>Constitution: {character.constitution}</p>
      <p>Intelligence: {character.intelligence}</p>
      <p>Wisdom: {character.wisdom}</p>
      <p>Charisma: {character.charisma}</p>
      {Object.entries(character).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {value}
        </p>
      ))}
      <div className="stats-section">
        <h3>Ability Scores</h3>
        {Object.entries(character.abilityScores).map(([key, value]) => (
          <div key={key} className="stat-row">
            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            <input type="number" value={value} readOnly />
            <span>Modifier: {getModifier(value)}</span>
          </div>
        ))}
      </div>

      <div className="stats-section">
        <h3>Saving Throws</h3>
        {Object.entries(character.savingThrows).map(([key, value]) => (
          <div key={key} className="stat-row">
            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            <input type="number" value={value} readOnly />
            <span>Total: {getModifier(value)}</span>
          </div>
        ))}
      </div>

      <div className="stats-section">
        <h3>Combat Stats</h3>
        <div className="stat-row">
          <span>Initiative</span>
          <input type="number" value={character.combatStats.initiative} readOnly />
        </div>
        <div className="stat-row">
          <span>Base Attack Bonus</span>
          <input type="number" value={character.combatStats.baseAttackBonus} readOnly />
        </div>
        <div className="stat-row">
          <span>Armor Class</span>
           <input type="number" value={character.combatStats.armorClass} readOnly />
        </div>
      </div>
    </div>
  );
};

export default CharacterStats;
