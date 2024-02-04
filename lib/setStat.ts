import { allStats, checkCondition, IMStatEntry, Obj } from "../deps.ts";

import { parseCalcValue } from "./parseCalcValue.ts";
import { getStat } from "./getStats.ts";

export const setStat = async (
  character: Obj,
  stat: string,
  value: any,
  temp?: boolean,
) => {
  let tar, val;
  let specialty = "";
  let instance = "";

  const parts = stat.split("/");
  if (parts.length > 1) {
    tar = parts[0].trim().toLowerCase();
    stat = parts[1].trim().toLowerCase();
  }

  // Either use the target or the enactor if no target exists.
  character.data ||= {};
  character.data.stats ||= [];

  // check to see if stat has an instance to it.
  const instanced = stat.trim().match(/\((.*)\)/g);

  if (instanced) {
    stat = stat.replace(/\((.*)\)/g, "").trim();

    instance = instanced[0];
  }

  // get the full stat name from the partial name.
  const fullStat = allStats.find((s) =>
    s.name.toLowerCase().startsWith(stat!.toLowerCase().trim()) &&
    (s.template?.includes(character?.template.toLowerCase() || "") ||
      !s.template)
  );

  if (!fullStat) throw new Error("Invalid stat.");

  // check to see  if the stat us even inatnaced.
  if (instance && !fullStat.hasInstance) throw new Error("Invalid instance().");

  if (instance && fullStat.hasInstance && fullStat.instances?.length) {
    const inst = fullStat.instances?.find(
      (i: any) => i.toLowerCase() === instance.toLowerCase(),
    );
    if (!inst) throw new Error("Invalid instance().");
  }

  if (fullStat.hasInstance && !instance) throw new Error("Missing instance().");

  // check to see if the instance is valid.

  // Check for specialities.
  // --------------------------------------------------------------------
  // ie.  when the value has a / in it.
  // ex:  +stats me/academics=1/library research
  if (!character) throw new Error("Invalid character.");

  if (value?.includes("/")) {
    const [value1, value2] = value.split("/");
    value = value1.trim();
    specialty = value2.trim().toLowerCase();

    //  convert value if needed.
    if (!isNaN(+value)) value = +value;

    //  if there's a check on the specialty, see if it passes.
    if (fullStat.specialties) {
      const specObj = fullStat.specialties?.find((s: any) =>
        s.name === specialty
      );

      if (!specObj && fullStat.specialties?.length) {
        throw new Error("Invalid specialty.");
      }

      if (
        specObj && specObj.values && !specObj.values.includes(value) && value
      ) {
        throw new Error("Invalid specialty value.");
      }

      if (
        specObj && specObj.check && typeof (specObj.check) === "function" &&
        !checkCondition(specObj.check, character)
      ) {
        throw new Error(specObj.error || "Permission denied.");
      }

      if (specObj && typeof (specObj.check) === "object") {
        try {
          const result = await checkCondition(specObj.check, character);
          if (!result) throw new Error(specObj.error || "Permission denied.");
        } catch (error) {
          throw new Error(error || "Permission denied.");
        }
      }
    }
  }

  if (
    typeof value === "string" &&
    (value.startsWith("+") || value.startsWith("-"))
  ) {
    const current = await getStat(character, fullStat.name);
    value = current + +value;
  }

  //  convert value if needed.
  if (!isNaN(+value)) value = +value;

  // Check the value
  if (
    !fullStat.values.includes(value) && fullStat.values.length > 0 && value
  ) {
    throw new Error(
      `Invalid value '${value}' for ${fullStat.name.toUpperCase()}.`,
    );
  }

  // Check the template
  if (fullStat.template && !fullStat.template.includes(character.template)) {
    throw new Error(fullStat.error || "Permission denied.");
  }

  // if there's a check on the stat, see if it passes.
  if (
    fullStat.check && typeof (fullStat.check) === "function" &&
    !checkCondition(fullStat.check, character)
  ) {
    throw new Error(fullStat.error || "Permission denied.");
  }

  if (fullStat.check && typeof (fullStat.check) === "object") {
    try {
      const result = await checkCondition(fullStat.check, character);
      if (!result) throw new Error(fullStat.error || "Permission denied.");
    } catch (error) {
      throw new Error(error || "Permission denied.");
    }
  }

  // Set the stats (or specialty!)!
  // --------------------------------------------------------------------
  if (instance) {
    stat = fullStat.name + instance;
  } else {
    stat = fullStat.name;
  }

  const name = specialty || stat;
  const type = specialty ? fullStat.name : fullStat.type;

  if (!value && !temp) {
    character.data.stats = character.data.stats.filter(
      (s: IMStatEntry) => s.name.toLowerCase() !== name,
    );

    // remove any specialties that exist for this stat.
    if (fullStat.hasSpecialties) {
      character.data.stats = character.data.stats.filter(
        (s: IMStatEntry) => s.type !== fullStat.name,
      );
    }

    await character.save();
    return name;
  } else if (!value && temp) {
    character.data.stats = character.data.stats.map((s: IMStatEntry) => {
      if (s.name.toLowerCase() === name) {
        s.temp = s.value;
      }
      return s;
    });

    await character.save();
    return name;
  }

  // does the user already have an instance of the stat?
  const statEntry = character.data.stats.find((s: IMStatEntry) =>
    s.name === name
  );

  if (statEntry) {
    if (!temp) {
      statEntry.value = value;
      statEntry.temp = value;
    } else {
      statEntry.temp = value;
    }
  } else {
    character.data.stats.push({
      name,
      value,
      temp: value,
      type,
      category: fullStat.category,
    });
  }

  // check for calcualted values.
  if (fullStat.calcValue) {
    parseCalcValue(character, fullStat.calcValue);
  }

  await character.save();

  return name;
};
