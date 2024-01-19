import { allStats, formatStat, Obj } from "../deps.ts";
import { getStat } from "../lib/getStats.ts";

export const other = async (obj: Obj) => {
  const template = await getStat(obj.dbobj, "template");
  let output = "";

  const other = allStats.filter(
    (stat) =>
      stat.type === "other" &&
      (stat.template?.includes(template) || !stat.template),
  );

  let totalOther = [];

  for (const stat of other) {
    totalOther.push(formatStat(stat.name, await getStat(obj.dbobj, stat.name)));
  }
  totalOther = totalOther.sort((a, b) => a.localeCompare(b));
  output += "%cr-%cn".repeat(78);

  for (let i = 0; i < totalOther.length; i++) {
    if (i % 3 === 0) {
      output += "%r%b";
    }
    output += totalOther[i] + "  ";
  }

  return output + "%r";
};
