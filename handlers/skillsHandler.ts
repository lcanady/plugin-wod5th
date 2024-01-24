import { allStats, divider, formatStat, IMStatEntry, Obj } from "../deps.ts";
import { getStat } from "../lib/getStats.ts";

export const skills = async (obj: Obj) => {
  const physical = allStats.filter(
    (stat) => stat.type === "skill" && stat.category === "physical",
  );

  const totalPhysical = [];

  for (const stat of physical) {
    totalPhysical.push(
      formatStat(stat.name, await getStat(obj.dbobj, stat.name)),
    );

    for (
      const s of obj.data?.stats?.filter((s: IMStatEntry) =>
        s.type === stat.name
      ) ||
        []
    ) {
      totalPhysical.push(
        "   " + formatStat(s.name, await getStat(obj.dbobj, s.name), 21),
      );
    }
  }

  const social = allStats.filter(
    (stat) => stat.type === "skill" && stat.category === "social",
  );

  const totalSocial = [];

  for (const stat of social) {
    totalSocial.push(
      formatStat(stat.name, await getStat(obj.dbobj, stat.name)),
    );

    obj.data?.stats
      ?.filter((s: IMStatEntry) => s.type === stat.name)
      .forEach(async (s: IMStatEntry) => {
        totalSocial.push(
          "   " + formatStat(s.name, await getStat(obj.dbobj, s.name), 21),
        );
      });
  }

  const mental = allStats.filter(
    (stat) => stat.type === "skill" && stat.category === "mental",
  );

  const totalMental = [];

  for (const stat of mental) {
    totalMental.push(
      formatStat(stat.name, await getStat(obj.dbobj, stat.name)),
    );

    obj.data?.stats
      ?.filter((s: IMStatEntry) => s.type === stat.name)
      .forEach(async (s: IMStatEntry) => {
        totalMental.push(
          "   " + formatStat(s.name, await getStat(obj.dbobj, s.name), 21),
        );
      });
  }

  const total = Math.max(
    totalPhysical.length,
    totalSocial.length,
    totalMental.length,
  );

  // fill the left over space with empty strings.
  totalPhysical.push(
    ...Array(total - totalPhysical.length).fill("                        "),
  );
  totalMental.push(
    ...Array(total - totalMental.length).fill("                        "),
  );
  totalSocial.push(
    ...Array(total - totalSocial.length).fill("                        "),
  );

  let output = divider("Skills") + "%r";
  for (let i = 0; i < total; i++) {
    output += ` ${totalPhysical[i] || ""}  ${totalSocial[i] || ""}  ${
      totalMental[i] || ""
    }\n`;
  }

  return output;
};
