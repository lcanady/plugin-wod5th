export * from "../ursamu/mod.ts";
import { IDBOBJ, Obj } from "../ursamu/mod.ts";

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
  calcValue?: (obj: IDBOBJ) => Promise<any>;
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
  check?: (obj: Obj) => boolean | Promise<boolean>;
  callback?: (obj: Obj) => Promise<void>;
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
  hidden: boolean;
  locked: boolean;
  approvedBy?: string;
  approved: boolean;
  approvedOn?: number;
}
