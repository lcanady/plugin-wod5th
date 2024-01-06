import { divider, formatStat, IMStat, IMStatEntry, Obj } from "../deps.ts";
import { getStat } from "../lib/getStats.ts";

export const disciplines = async (obj: Obj) => {
  const splat = await getStat(obj.dbobj, "splat");

  const totalDisciplines: any[] = [];

  const disciplines = obj.data?.stats
    ?.filter((s: IMStat) => s.type === "discipline")
    .sort((a: IMStat, b: IMStat) => a.name.localeCompare(b.name)) || [];

  // split the disciplines into two columns. using a columns array.

  const columns: any[][] = [[], []];
  for (let i = 0; i < disciplines.length; i++) {
    columns[i % 2].push(disciplines[i]);
  }

  columns[0] = columns[0].sort((a, b) => a.name.localeCompare(b.name));
  columns[1] = columns[1].sort((a, b) => a.name.localeCompare(b.name));

  for (const col of columns) {
    const colDisciplines = [];
    for (const stat of col) {
      colDisciplines.push(
        formatStat(stat.name, await getStat(obj.dbobj, stat.name), 37),
      );

      for (
        const s of obj.data?.stats
          ?.filter((s: IMStatEntry) => s.type === stat.name)
          .sort((a: IMStatEntry, b: IMStatEntry) => a.value - b.value) || []
      ) {
        colDisciplines.push(
          "   " + formatStat(s.name, await getStat(obj.dbobj, s.name), 34),
        );
      }

      colDisciplines.push(" ".repeat(37));
    }
    totalDisciplines.push(colDisciplines);
  }

  let output = divider("Disciplines") + "%r ";
  const max = Math.max(totalDisciplines[0].length, totalDisciplines[1].length);
  totalDisciplines[0].push(
    ...Array(max - totalDisciplines[0].length).fill(" ".repeat(37)),
  );
  totalDisciplines[1].push(
    ...Array(max - totalDisciplines[1].length).fill(" ".repeat(37)),
  );

  output += totalDisciplines[0]
    .map((d: any, i: number) => ` ${d}  ${totalDisciplines[1][i]}`)
    .join("\n")
    .trim();

  if (!max) return "";
  return output + "%r";
};
