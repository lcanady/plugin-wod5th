import { divider, Obj } from "../deps.ts";
import { displayDamageTrack } from "../lib/displayDamageTrack.ts";

export const health = async (obj: Obj) => {
  let output = divider("Character Status") + "\n";

  output += await displayDamageTrack(obj, "physical");
  output += "%r";
  output += await displayDamageTrack(obj, "mental");
  output += "%r"; // Include additional tracks or information as needed

  return output;
};
