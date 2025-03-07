import React from "react";
import { Character, Weapon, Armor, MagicItem } from "./types";
import { updateCharacter } from "./CharacterManagerActions";
import { handleEquipmentImageUpload, handleRemoveEquipment } from "./CharacterManagerHandlers";

interface CharacterInventoryProps {
  character: Character;
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
}

const CharacterInventory: React.FC<CharacterInventoryProps> = ({ character, setCharacters }) => {
  if (!character) return <div>Loading inventory information...</div>;

  // Handlers for adding equipment
  const handleAddWeapon = () => {
    const newWeapon: Weapon = {
      id: Date.now(),
      name: "",
      damage: "",
      criticalRange: "20",
      criticalMultiplier: "×2",
      type: "",
      description: "",
      thumbnail: null
    };
    
    updateCharacter(
      character.id, 
      "equippedWeapons", 
      [...character.equippedWeapons, newWeapon], 
      setCharacters
    );
  };

  const handleAddArmor = () => {
    const newArmor: Armor = {
      id: Date.now(),
      name: "",
      armorBonus: "0",
      maxDexBonus: "",
      armorCheckPenalty: "",
      type: "",
      description: "",
      thumbnail: null
    };
    
    updateCharacter(
      character.id, 
      "equippedArmor", 
      [...character.equippedArmor, newArmor], 
      setCharacters
    );
  };

  const handleAddMagicItem = () => {
    const newItem: MagicItem = {
      id: Date.now(),
      name: "",
      slot: "",
      description: "",
      thumbnail: null
    };
    
    updateCharacter(
      character.id, 
      "equippedItems", 
      [...character.equippedItems, newItem], 
      setCharacters
    );
  };

  const handleAddInventoryItem = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      quantity: "1",
      description: "",
      thumbnail: null
    };
    
    updateCharacter(
      character.id, 
      "inventory", 
      [...character.inventory, newItem], 
      setCharacters
    );
  };

  // Handler for image uploads
  const handleUploadImage = (e, itemType, itemId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        
        const updatedCharacters = setCharacters(prevCharacters => 
          prevCharacters.map(char => 
            char.id === character.id 
              ? { 
                  ...char, 
                  [itemType]: char[itemType].map(item => 
                    item.id === itemId ? { ...item, thumbnail: imageData } : item
                  )
                } 
              : char
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  // Handlers with confirmation
  const handleConfirmRemoveEquipment = (itemId: number, itemType: string) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      handleRemoveEquipment(character.id, itemId, itemType as any, [character], setCharacters);
    }
  };

  // Add this function to the component
  const handleConfirmRemoveInventoryItem = (itemId: number) => {
    if (window.confirm("Are you sure you want to remove this inventory item?")) {
      const updatedInventory = character.inventory.filter(i => i.id !== itemId);
      updateCharacter(character.id, "inventory", updatedInventory, setCharacters);
    }
  };

  
  return (
    <div className="character-section">
      <h2>Equipment & Inventory</h2>

      {/* Weapons Section */}
      <div className="inventory-section">
        <div className="section-header">
          <h3>Weapons</h3>
          <button className="add-weapon" onClick={handleAddWeapon}>
            <img src="images/add.png" alt="Add" /> Add Weapon
          </button>
        </div>
        
        {character.equippedWeapons.length === 0 ? (
          <p>No weapons added yet.</p>
        ) : (
          character.equippedWeapons.map((weapon) => (
            <div key={weapon.id} className="inventory-entry">
              {weapon.thumbnail && <img src={weapon.thumbnail} alt="Weapon" className="item-image" />}
              <div className="equipment-details">
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    value={weapon.name}
                    onChange={(e) => {
                      const updatedWeapons = character.equippedWeapons.map(w =>
                        w.id === weapon.id ? { ...w, name: e.target.value } : w
                      );
                      updateCharacter(character.id, "equippedWeapons", updatedWeapons, setCharacters);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Damage</label>
                  <input 
                    type="text" 
                    value={weapon.damage}
                    onChange={(e) => {
                      const updatedWeapons = character.equippedWeapons.map(w =>
                        w.id === weapon.id ? { ...w, damage: e.target.value } : w
                      );
                      updateCharacter(character.id, "equippedWeapons", updatedWeapons, setCharacters);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Critical</label>
                  <input 
                    type="text" 
                    value={weapon.criticalRange}
                    onChange={(e) => {
                      const updatedWeapons = character.equippedWeapons.map(w =>
                        w.id === weapon.id ? { ...w, criticalRange: e.target.value } : w
                      );
                      updateCharacter(character.id, "equippedWeapons", updatedWeapons, setCharacters);
                    }}
                  />
                  <input 
                    type="text" 
                    value={weapon.criticalMultiplier}
                    onChange={(e) => {
                      const updatedWeapons = character.equippedWeapons.map(w =>
                        w.id === weapon.id ? { ...w, criticalMultiplier: e.target.value } : w
                      );
                      updateCharacter(character.id, "equippedWeapons", updatedWeapons, setCharacters);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="file"
                    onChange={(e) => handleUploadImage(e, "equippedWeapons", weapon.id)}
                  />
                </div>
                <button className="remove-button" onClick={() => handleConfirmRemoveEquipment(weapon.id, "equippedWeapons")}>
                  <img src="images/remove.png" alt="Remove" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Armor Section */}
      <div className="inventory-section">
        <div className="section-header">
          <h3>Armor</h3>
          <button className="add-armor" onClick={handleAddArmor}>
            <img src="images/add.png" alt="Add" /> Add Armor
          </button>
        </div>
        
        {character.equippedArmor.length === 0 ? (
          <p>No armor added yet.</p>
        ) : (
          character.equippedArmor.map((armor) => (
            <div key={armor.id} className="inventory-entry">
              {armor.thumbnail && <img src={armor.thumbnail} alt="Armor" className="item-image" />}
              <div className="equipment-details">
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    value={armor.name}
                    onChange={(e) => {
                      const updatedArmor = character.equippedArmor.map(a =>
                        a.id === armor.id ? { ...a, name: e.target.value } : a
                      );
                      updateCharacter(character.id, "equippedArmor", updatedArmor, setCharacters);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>AC Bonus</label>
                  <input 
                    type="text" 
                    value={armor.armorBonus}
                    onChange={(e) => {
                      const updatedArmor = character.equippedArmor.map(a =>
                        a.id === armor.id ? { ...a, armorBonus: e.target.value } : a
                      );
                      updateCharacter(character.id, "equippedArmor", updatedArmor, setCharacters);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Max Dex Bonus</label>
                  <input 
                    type="text" 
                    value={armor.maxDexBonus || ""}
                    onChange={(e) => {
                      const updatedArmor = character.equippedArmor.map(a =>
                        a.id === armor.id ? { ...a, maxDexBonus: e.target.value } : a
                      );
                      updateCharacter(character.id, "equippedArmor", updatedArmor, setCharacters);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="file"
                    onChange={(e) => handleUploadImage(e, "equippedArmor", armor.id)}
                  />
                </div>
                <button className="remove-button" onClick={() => handleConfirmRemoveEquipment(armor.id, "equippedArmor")}>
                  <img src="images/remove.png" alt="Remove" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Magic Items Section */}
      <div className="inventory-section">
        <div className="section-header">
          <h3>Magic Items</h3>
          <button className="add-magic-item" onClick={handleAddMagicItem}>
            <img src="images/add.png" alt="Add" /> Add Magic Item
          </button>
        </div>
        
        {character.equippedItems.length === 0 ? (
          <p>No magic items added yet.</p>
        ) : (
          character.equippedItems.map((item) => (
            <div key={item.id} className="inventory-entry">
              {item.thumbnail && <img src={item.thumbnail} alt="Magic Item" className="item-image" />}
              <div className="equipment-details">
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    value={item.name}
                    onChange={(e) => {
                      const updatedItems = character.equippedItems.map(i =>
                        i.id === item.id ? { ...i, name: e.target.value } : i
                      );
                      updateCharacter(character.id, "equippedItems", updatedItems, setCharacters);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Slot</label>
                  <input 
                    type="text" 
                    value={item.slot}
                    onChange={(e) => {
                      const updatedItems = character.equippedItems.map(i =>
                        i.id === item.id ? { ...i, slot: e.target.value } : i
                      );
                      updateCharacter(character.id, "equippedItems", updatedItems, setCharacters);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    value={item.description || ""}
                    onChange={(e) => {
                      const updatedItems = character.equippedItems.map(i =>
                        i.id === item.id ? { ...i, description: e.target.value } : i
                      );
                      updateCharacter(character.id, "equippedItems", updatedItems, setCharacters);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="file"
                    onChange={(e) => handleUploadImage(e, "equippedItems", item.id)}
                  />
                </div>
                <button className="remove-button" onClick={() => handleConfirmRemoveEquipment(item.id, "equippedItems")}>
                  <img src="images/remove.png" alt="Remove" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* General Inventory Section */}
      <div className="inventory-section">
        <div className="section-header">
          <h3>General Inventory</h3>
          <button className="add-item" onClick={handleAddInventoryItem}>
            <img src="images/add.png" alt="Add" /> Add Item
          </button>
        </div>
        
        {character.inventory.length === 0 ? (
          <p>No items in inventory.</p>
        ) : (
          character.inventory.map((item) => (
            <div key={item.id} className="inventory-entry">
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  value={item.name}
                  onChange={(e) => {
                    const updatedInventory = character.inventory.map(i =>
                      i.id === item.id ? { ...i, name: e.target.value } : i
                    );
                    updateCharacter(character.id, "inventory", updatedInventory, setCharacters);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input 
                  type="text" 
                  value={item.quantity}
                  onChange={(e) => {
                    const updatedInventory = character.inventory.map(i =>
                      i.id === item.id ? { ...i, quantity: e.target.value } : i
                    );
                    updateCharacter(character.id, "inventory", updatedInventory, setCharacters);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={item.description || ""}
                  onChange={(e) => {
                    const updatedInventory = character.inventory.map(i =>
                      i.id === item.id ? { ...i, description: e.target.value } : i
                    );
                    updateCharacter(character.id, "inventory", updatedInventory, setCharacters);
                  }}
                />
              </div>
              <button className="remove-button" onClick={() => handleConfirmRemoveInventoryItem(item.id)}>
                <img src="images/remove.png" alt="Remove" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CharacterInventory;
