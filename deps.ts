export * from "https://raw.githubusercontent.com/UrsaMU/ursamu/main/mod.ts";

import {
  Condition,
  Obj,
} from "https://raw.githubusercontent.com/UrsaMU/ursamu/main/mod.ts";

import { attributes } from "./data/attributes.ts";
import { backgrounds } from "./data/backgrounds.ts";
import { bio } from "./data/bio.ts";
import { flaws } from "./data/flaws.ts";
import { merits } from "./data/merits.ts";
import { skills } from "./data/skills.ts";
import { disciplines } from "./data/disciplines.ts";
import { other } from "./data/other.ts";
import * as dpath from "https://deno.land/std@0.208.0/path/mod.ts";
import { join } from "https://deno.land/std@0.210.0/path/mod.ts";

export const __dirname = dpath.dirname(dpath.fromFileUrl(import.meta.url));
export const __data = join(__dirname, "..", "data");
export { join };
export const allStats = [
  ...bio,
  ...attributes,
  ...skills,
  ...merits,
  ...flaws,
  ...backgrounds,
  ...disciplines,
  ...other,
];

export {
  attributes,
  backgrounds,
  bio,
  disciplines,
  flaws,
  merits,
  other,
  skills,
};

export interface IMStat {
  name: string;
  values: any[];
  calcValue?: CalcValue;
  type: string;
  template?: string[];
  lock?: string;
  category?: string;
  default?: any;
  data?: any;
  hasInstance?: boolean;
  instances?: string[];
  hasSpecialties?: boolean;
  specialties?: IMStat[];
  error?: string;
  check?: ((obj: Obj) => boolean | Promise<boolean>) | Condition;
  callback?: (obj: Obj) => Promise<void> | { [key: string]: any };
}

export interface IMStatEntry {
  name: string;
  value: any;
  temp?: any;
  type?: string;
  category?: string;
}

export interface INote {
  title: string;
  text: string;
  date: number;
  category: string;
  hidden: boolean;
  locked: boolean;
  approvedBy?: string;
  approved: boolean;
  approvedOn?: number;
}

export interface CalcValue {
  $set?: { [key: string]: number | CalcValue };
  $add?: (string | number)[];
  $sub?: (string | number)[];
  $mul?: (string | number)[];
  $div?: (string | number)[];
  [key: string]: any;
}
