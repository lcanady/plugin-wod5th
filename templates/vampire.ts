import { IMStatEntry } from "../deps.ts";
import { divider } from "../deps.ts";
import { Obj } from "../deps.ts";

export default (targ: Obj) => {
  let output = "";

  const statsAtFour = targ.data.stats.filter((s: IMStatEntry) =>
    s.value >= 4 &&
    s.type === "attribute"
  );
  const statsAtThree = targ.data.stats.filter((s: IMStatEntry) =>
    s.value === 3 && s.type === "attribute"
  );
  const statsAtTwo = targ.data.stats.filter((s: IMStatEntry) =>
    s.value === 2 && s.type === "attribute"
  );
  const statsAtOne = targ.data.stats.filter((s: IMStatEntry) =>
    s.value === 1 && s.type === "attribute"
  );

  const skills = targ.data.stats.filter((s: IMStatEntry) => s.type === "skill");

  // attributes

  output += ` * ${statsAtFour.length} of 1 attributes at 4. [${
    statsAtFour.length === 1 ? "%ch%cgYES%cn" : "%ch%crNO%cn"
  }]\n`;

  output += ` * ${statsAtThree.length} of 3 attributes at 3. [${
    statsAtThree.length === 3 ? "%ch%cgYES%cn" : "%ch%crNO%cn"
  }]\n`;

  output += ` * ${statsAtTwo.length} of 4 attributes at 2. [${
    statsAtTwo.length === 4 ? "%ch%cgYES%cn" : "%ch%crNO%cn"
  }]\n`;

  output += ` * ${statsAtOne.length} of 1 attributes at 1. [${
    statsAtOne.length === 1 ? "%ch%cgYES%cn" : "%ch%crNO%cn"
  }]\n`;

  // skills  27pts total.  add all the skill points together in a reduce.
  const skillPoints = skills.reduce((acc: number, skill: IMStatEntry) => {
    return acc + skill.value;
  }, 0);

  output += `\n * ${skillPoints} of 27 skill points spent. [${
    skillPoints === 27 ? "%ch%cgYES%cn" : "%ch%crNO%cn"
  }]\n`;

  return output;
};
