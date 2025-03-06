import React from "react";

const CharacterInventory = ({
  activeCharacter,
  handleAddWeapon,
  handleRemoveWeapon,
  handleAddArmor,
  handleRemoveArmor,
  handleAddMagicItem,
  handleRemoveMagicItem,
  handleAddItem,
  handleRemoveItem,
  handleUploadImage,
}) => {
  if (!activeCharacter) return null;

  return (
    <div className="character-inventory">
      <h3>Equipment & Inventory</h3>

      {/* Weapons Section */}
      <div className="inventory-section">
        <h4>Weapons</h4>
        {(activeCharacter.weapons?.length || 0) > 0 ? (
          activeCharacter.weapons.map((weapon, index) => (
            <div key={index} className="inventory-entry">
              {weapon.image && <img src={weapon.image} alt="Weapon" className="item-image" />}
              <input type="text" placeholder="Weapon Name" value={weapon.name} readOnly />
              <input type="text" placeholder="Damage" value={weapon.damage} readOnly />
              <input type="text" placeholder="Properties" value={weapon.properties} readOnly />
              <input
                type="file"
                onChange={(e) => handleUploadImage(e, "weapons", index)}
                className="file-upload"
              />
              <button className="remove-btn" onClick={() => handleRemoveWeapon(index)}>
                <img src="remove.png" alt="Remove" />
              </button>
            </div>
          ))
        ) : (
          <p>No weapons added yet.</p>
        )}
        <button className="add-btn" onClick={handleAddWeapon}>
          <img src="add.png" alt="Add Weapon" />
        </button>
      </div>

      {/* Armor Section */}
      <div className="inventory-section">
        <h4>Armor</h4>
        {(activeCharacter.armor?.length || 0) > 0 ? (
          activeCharacter.armor.map((armor, index) => (
            <div key={index} className="inventory-entry">
              {armor.image && <img src={armor.image} alt="Armor" className="item-image" />}
              <input type="text" placeholder="Armor Name" value={armor.name} readOnly />
              <input type="text" placeholder="AC Bonus" value={armor.acBonus} readOnly />
              <input type="text" placeholder="Max Dex" value={armor.maxDex} readOnly />
              <input
                type="file"
                onChange={(e) => handleUploadImage(e, "armor", index)}
                className="file-upload"
              />
              <button className="remove-btn" onClick={() => handleRemoveArmor(index)}>
                <img src="remove.png" alt="Remove" />
              </button>
            </div>
          ))
        ) : (
          <p>No armor added yet.</p>
        )}
        <button className="add-btn" onClick={handleAddArmor}>
          <img src="add.png" alt="Add Armor" />
        </button>
      </div>

      {/* Magic Items Section */}
      <div className="inventory-section">
        <h4>Magic Items</h4>
        {(activeCharacter.magicItems?.length || 0) > 0 ? (
          activeCharacter.magicItems.map((item, index) => (
            <div key={index} className="inventory-entry">
              {item.image && <img src={item.image} alt="Magic Item" className="item-image" />}
              <input type="text" placeholder="Item Name" value={item.name} readOnly />
              <textarea placeholder="Effect" value={item.effect} readOnly />
              <input
                type="file"
                onChange={(e) => handleUploadImage(e, "magicItems", index)}
                className="file-upload"
              />
              <button className="remove-btn" onClick={() => handleRemoveMagicItem(index)}>
                <img src="remove.png" alt="Remove" />
              </button>
            </div>
          ))
        ) : (
          <p>No magic items added yet.</p>
        )}
        <button className="add-btn" onClick={handleAddMagicItem}>
          <img src="add.png" alt="Add Magic Item" />
        </button>
      </div>

      {/* General Inventory Section */}
      <div className="inventory-section">
        <h4>Inventory</h4>
        {(activeCharacter.inventory?.length || 0) > 0 ? (
          activeCharacter.inventory.map((item, index) => (
            <div key={index} className="inventory-entry">
              <input type="text" placeholder="Item Name" value={item.name} readOnly />
              <input type="text" placeholder="Quantity" value={item.quantity} readOnly />
              <button className="remove-btn" onClick={() => handleRemoveItem(index)}>
                <img src="remove.png" alt="Remove" />
              </button>
            </div>
          ))
        ) : (
          <p>No items in inventory.</p>
        )}
        <button className="add-btn" onClick={handleAddItem}>
          <img src="add.png" alt="Add Item" />
        </button>
      </div>
    </div>
  );
};

export default CharacterInventory;
