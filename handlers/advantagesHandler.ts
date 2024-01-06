import { divider, formatStat, IMStat, Obj } from "../deps.ts";
import { getStat } from "../lib/getStats.ts";

export const advantages = (obj: Obj) => {
  let output = `${divider("Backgrounds", "%cr-%cn", 26)}${
    divider(
      "Advantages",
      "%cr-%cn",
      26,
    )
  }${divider("Flaws", "%cr-%cn", 26)}\n`;

  const backgrounds = obj.data?.stats
    ?.filter((s: IMStat) => s.type === "background")
    .map(async (s: IMStat) =>
      formatStat(s.name, await getStat(obj.dbobj, s.name))
    ) ||
    [];

  const merits = obj.data?.stats
    ?.filter((s: IMStat) => s.type === "merit")
    .map(async (s: IMStat) =>
      formatStat(s.name, await getStat(obj.dbobj, s.name))
    ) ||
    [];
  const flaws = obj.data?.stats
    ?.filter((s: IMStat) => s.type === "flaw")
    .map(async (s: IMStat) =>
      formatStat(s.name, await getStat(obj.dbobj, s.name))
    ) ||
    [];

  const max = Math.max(backgrounds.length, merits.length, flaws.length);
  const totalBackgrounds = [];
  const totalMerits = [];
  const totalFlaws = [];

  totalBackgrounds.push(
    ...backgrounds,
    ...Array(max - backgrounds.length).fill(" ".repeat(24)),
  );
  totalMerits.push(
    ...merits,
    ...Array(max - merits.length).fill(" ".repeat(24)),
  );
  totalFlaws.push(...flaws, ...Array(max - flaws.length).fill(" ".repeat(24)));

  for (let i = 0; i < max; i++) {
    output += ` ${totalBackgrounds[i]}  ${totalMerits[i]}  ${totalFlaws[i]}\n`;
  }
  if (max) {
    return output;
  }

  return "";
};
