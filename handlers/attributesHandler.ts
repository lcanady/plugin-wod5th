import { center, divider, formatStat, Obj } from "../deps.ts";
import { getStat } from "../lib/getStats.ts";

export const attributes = async (obj: Obj) => {
  const physical = [
    center("Physical", 24, " "),
    formatStat("strength", await getStat(obj.dbobj, "strength")),
    formatStat("dexterity", await getStat(obj.dbobj, "dexterity")),
    formatStat("stamina", await getStat(obj.dbobj, "stamina")),
  ];

  const social = [
    center("Social", 24, " "),

    formatStat("charisma", await getStat(obj.dbobj, "charisma")),
    formatStat("manipulation", await getStat(obj.dbobj, "manipulation")),
    formatStat("composure", await getStat(obj.dbobj, "composure")),
  ];

  const mental = [
    center("Mental", 24, " "),
    formatStat("intelligence", await getStat(obj.dbobj, "intelligence")),
    formatStat("wits", await getStat(obj.dbobj, "wits")),
    formatStat("resolve", await getStat(obj.dbobj, "resolve")),
  ];

  let output = divider("Attributes") + "%r";

  for (let i = 0; i < 4; i++) {
    output += ` ${physical[i]}  ${social[i]}  ${mental[i]}\n`;
  }

  return output;
};
