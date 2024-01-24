import { Condition, flags, Obj } from "../deps.ts";
import { getStat } from "./getStats.ts";

const totalStats = async (
  charObj: Obj,
  statNames: string[],
): Promise<number> => {
  let total = 0;
  for (const statName of statNames) {
    const statValue = await getStat(charObj, statName);
    total += statValue;
  }
  return total;
};

export const checkCondition = async (
  condition: Condition,
  charObj: Obj,
): Promise<boolean> => {
  const keys = Object.keys(condition);

  if (keys.length > 1) {
    throw new Error(
      `Invalid condition object with multiple keys: ${keys.join(", ")}`,
    );
  }

  const key = keys[0];
  const value = condition[key];

  switch (key) {
    case "$and":
      for (const subCondition of value) {
        if (!await checkCondition(subCondition, charObj)) return false;
      }
      return true;
    case "$or":
      for (const subCondition of value) {
        if (await checkCondition(subCondition, charObj)) return true;
      }
      return false;
    case "$not":
      return !(await checkCondition(value, charObj));
    case "$total":
      const total = await totalStats(charObj, value.stats);
      const comparisonKey = Object.keys(value.condition)[0];
      const comparisonValue = value.condition[comparisonKey];
      return await checkSingleCondition(comparisonKey, {
        [comparisonKey]: comparisonValue,
      }, charObj);
    default:
      return await checkSingleCondition(key, value, charObj);
  }
};

const checkSingleCondition = async (key: string, value: any, charObj: Obj) => {
  const conditionKey = Object.keys(value)[0];
  const conditionValue = value[conditionKey];
  const charValue = await getStat(charObj, conditionKey);
  switch (key) {
    case "$lt":
      return charValue < conditionValue;
    case "$lte":
      return charValue <= conditionValue;
    case "$gt":
      return charValue > conditionValue;
    case "$gte":
      return charValue >= conditionValue;
    case "$ne":
      return charValue !== conditionValue;
    case "$eq":
      return charValue === conditionValue;
    case "$in":
      return conditionValue.includes(charValue);
    case "$nin":
      return !conditionValue.includes(charValue);
    case "$flags":
      return flags.check(charObj.flags, conditionValue);
    case "$regex":
      return new RegExp(value[conditionKey]).test(charValue);
    default:
      throw new Error(`Invalid check condition: ${key}`);
  }
};
