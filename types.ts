export interface Skill {
  name: string;
  ability: keyof Character;
  bonus: number;
}

export interface Feat {
  id: number;
  name: string;
  description: string;
}

export interface Spell {
  level: string;
  name: string;
  schoolDomain?: string;
  description?: string;
}

export interface Weapon {
  id: number;
  name: string;
  damage: string;
  criticalRange: string;
  criticalMultiplier: string;
  type: string;
  description?: string;
  thumbnail: string | null;
}

export interface Armor {
  id: number;
  name: string;
  armorBonus: string;
  maxDexBonus?: string;
  armorCheckPenalty?: string;
  type: string;
  description?: string;
  thumbnail: string | null;
}

export interface MagicItem {
  id: number;
  name: string;
  slot: string;
  description?: string;
  thumbnail: string | null;
}

export interface CastingProgression {
  className: string;
  spellSlots: { level: number; available: number; total: number }[];
}

export interface Power {
  level: string;
  name: string;
  description?: string;
  augmentCost?: number;
}

export interface Character {
  id: number;
  name: string;
  classType: string;
  level: string | number;
  race: string;
  alignment: string;
  deity: string;
  hp: string | number;
  portrait: string | null;
  background: string;
  personality: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  fortitude: number;
  reflex: number;
  will: number;
  bab: string | number;
  initiativeBonus: number;
  armorBonus: number;
  skills: Skill[];
  feats: Feat[];
  spellSlots: { level: string; available: string; total: string; type: string }[];
  knownSpells: Spell[];
  domains: string[];
  specialistSchool?: string;
  forbiddenSchools?: string[];
  equippedWeapons: Weapon[];
  equippedArmor: Armor[];
  equippedItems: MagicItem[];
  inventory: {
    id: number;
    name: string;
    quantity: string;
    description?: string;
    thumbnail: string | null;
  }[];
  spellcastingType?: string;
  isPsionic?: boolean;
  powerPoints?: number;
  maxPowerPoints?: number;
  isFocused?: boolean;
  castingProgressions?: CastingProgression[];
  knownPowers?: Power[];
}