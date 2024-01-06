import { IDBOBJ, Obj } from "../deps.ts";
import { blankSheet } from "./blankSheet.ts";
import { calculateDamage } from "./calculateDamage.ts";
import { getStat } from "./getStats.ts";

export const displayDamageTrack = async (obj: Obj, type: string) => {
  let output = "";
  let splat = await getStat(obj, "splat");
  obj.data ||= blankSheet(obj);
  obj.data.damage ||= {
    physical: { superficial: 0, aggravated: 0 },
    mental: { superficial: 0, aggravated: 0 },
  };

  const superficial = parseInt(obj.data?.damage[type]?.superficial || 0);
  const aggravated = parseInt(obj.data?.damage[type]?.aggravated || 0);
  let maxBoxes;

  if (type === "physical") {
    maxBoxes = (await getStat(obj, "stamina")) + 3;
  } else if (type === "mental") {
    const composure = await getStat(obj, "composure");
    const resolve = await getStat(obj, "resolve");
    maxBoxes = composure + resolve;
  } else {
    throw new Error("Invalid damage type");
  }

  const { damageBoxes, status } = calculateDamage(
    superficial,
    aggravated,
    maxBoxes,
    splat,
  );
  let trackLabel = type === "physical" ? "Health:    " : "Willpower: ";

  if (status) {
    output += ` ${trackLabel}%ch%cr${damageBoxes.join("")}%cn`;
    output += ` %ch%cr(${status})%cn`;
  } else {
    output += ` ${trackLabel}${damageBoxes.join("")} `;
  }

  return output;
};
