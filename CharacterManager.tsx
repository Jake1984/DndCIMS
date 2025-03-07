import React, { useState, useEffect } from "react";
import "./styles.css";
import CharacterStats from "./CharacterStats";
import CharacterFeatsSkills from "./CharacterFeatsSkills";
import CharacterSpellcasting from "./CharacterSpellcasting";
import CharacterInventory from "./CharacterInventory";
import { addCharacter, deleteCharacter, updateCharacter } from "./CharacterManagerActions";
import { Character } from "./types";
import { getModifier } from "./CharacterManagerUtils";

const CharacterManager: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeCharacterIndex, setActiveCharacterIndex] = useState<number | null>(0);
  
  // Load characters from localStorage on initial render
  useEffect(() => {
    const savedCharacters = JSON.parse(localStorage.getItem("characters") || "[]");
    if (savedCharacters.length > 0) {
      setCharacters(savedCharacters);
      setActiveCharacterIndex(0);
    }
  }, []);
  
  // Save characters to localStorage whenever they change
  useEffect(() => {
    if (characters.length > 0) {
      localStorage.setItem("characters", JSON.stringify(characters));
    }
  }, [characters]);

  // Handler for adding a new character
  const handleAddCharacter = () => {
    addCharacter(characters, setCharacters);
    setActiveCharacterIndex(characters.length);
  };

  // Handler for deleting a character
  const handleDeleteCharacter = (index: number) => {
    if (window.confirm("Are you sure you want to delete this character?")) {
      const charId = characters[index].id;
      deleteCharacter(charId, characters, setCharacters, setActiveCharacterIndex);
    }
  };

  // Handler for exporting characters
  const handleExport = () => {
    const dataStr = JSON.stringify(characters, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = "characters.json";
    
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // Handler for importing characters
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedCharacters = JSON.parse(e.target?.result as string) as Character[];
        if (Array.isArray(importedCharacters)) {
          // Ask if user wants to replace or append characters
          if (characters.length > 0) {
            if (window.confirm("Do you want to replace the existing characters? Click 'Cancel' to append instead.")) {
              setCharacters(importedCharacters);
            } else {
              setCharacters([...characters, ...importedCharacters]);
            }
          } else {
            setCharacters(importedCharacters);
          }
          setActiveCharacterIndex(0);
        } else {
          alert("Invalid character data format");
        }
      } catch (error) {
        console.error("Error parsing character file:", error);
        alert("Failed to parse character file. Please make sure it's valid JSON.");
      }
    };
    reader.readAsText(file);
    // Reset the file input so the same file can be imported again if needed
    event.target.value = '';
  };

  return (
    <div className="character-manager">
      <div className="manager-controls">
        <div className="character-tabs">
          {characters.map((char, index) => (
            <button 
              key={char.id} 
              className={index === activeCharacterIndex ? "active" : ""} 
              onClick={() => setActiveCharacterIndex(index)}
            >
              {char.name}
            </button>
          ))}
          <button onClick={handleAddCharacter}>New Character</button>
        </div>
        
        <div className="import-export">
          <button className="import" onClick={() => document.getElementById('import-file')?.click()}>
            <img src="images/open.png" alt="Import" /> Import Characters
          </button>
          <input
            type="file"
            id="import-file"
            accept=".json"
            style={{ display: "none" }}
            onChange={handleImport}
          />
          <button className="export" onClick={handleExport}>
            <img src="images/save.png" alt="Export" /> Export Characters
          </button>
        </div>
      </div>
      
      {activeCharacterIndex !== null && characters.length > 0 && (
        <div className="character-container">
          <CharacterStats 
            character={characters[activeCharacterIndex]} 
            setCharacters={setCharacters} 
          />
          <CharacterFeatsSkills 
            character={characters[activeCharacterIndex]} 
            setCharacters={setCharacters} 
          />
          <CharacterSpellcasting 
            character={characters[activeCharacterIndex]} 
            setCharacters={setCharacters} 
          />
          <CharacterInventory 
            character={characters[activeCharacterIndex]} 
            setCharacters={setCharacters} 
          />
          <button 
            className="delete-character" 
            onClick={() => handleDeleteCharacter(activeCharacterIndex)}
          >
            Delete Character
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterManager;
