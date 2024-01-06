import { Obj } from "../deps.ts";

export const blankSheet = async (obj: Obj) => {
  return {
    ...obj.dbobj.data,
    stats: [],
    attributes: [],
    damage: {
      physical: { superficial: 0, aggravated: 0 },
      mental: { superficial: 0, aggravated: 0 },
    },
  };
};
