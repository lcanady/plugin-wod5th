import { allStats, formatStat, Obj } from "../deps.ts";
import { getStat } from "../lib/getStats.ts";

export const bio = async (obj: Obj) => {
  const splat = await getStat(obj.dbobj, "splat");

  let bioList = allStats
    .filter(
      (stat) =>
        stat.type === "bio" && (!stat.splat || stat.splat.includes(splat)),
    )
    .map(async (stat) =>
      formatStat(stat.name, await getStat(obj.dbobj, stat.name), 28, true)
    ) || [];

  const bio = await Promise.all(bioList);

  let output = "";
  for (let i = 0; i < bio.length; i++) {
    if (i % 2 === 0) {
      output += "%r%b";
    }
    output += bio[i] + "  ";
  }

  return output + "%r";
};
