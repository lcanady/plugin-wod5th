import { allStats } from "../deps.ts";

export const statObj = (stat: string) => {
  return allStats.find((s) =>
    s.name.toLowerCase().startsWith(stat.toLowerCase())
  );
};
