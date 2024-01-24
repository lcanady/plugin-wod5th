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

  if (keys.length > 1 && !keys.includes("error")) {
    throw new Error(
      `Invalid condition object with multiple keys: ${keys.join(", ")}`,
    );
  }

  const key = keys.find((k) => k !== "error");

  if (key === undefined || !(key in condition)) {
    throw new Error("Invalid condition: key is undefined or not in condition");
  }

  const value = condition[key];

  try {
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
      default:
        return await checkSingleCondition(key, value, charObj, condition.error);
    }
  } catch (error) {
    if (condition.error) {
      throw new Error(condition.error);
    }
    throw error;
  }
};

const checkSingleCondition = async (
  key: string,
  value: any,
  charObj: Obj,
  error?: string,
) => {
  // Check for stats comparison condition
  if (
    value.stats && Array.isArray(value.stats) && typeof value.value === "number"
  ) {
    const total = await totalStats(charObj, value.stats);
    let metCondition;
    switch (key) {
      case "$lt":
        metCondition = total < value.value;
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
        return metCondition;
      case "$lte":
        metCondition = total <= value.value;
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
        return metCondition;
      case "$gt":
        metCondition = total > value.value;
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
        return metCondition;
      case "$gte":
        metCondition = total >= value.value;
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
        return metCondition;
      case "$eq":
        metCondition = total === value.value;
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
        return metCondition;
      case "$ne":
        metCondition = total !== value.value;
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
        return metCondition;
      default:
        throw new Error(`Invalid stats comparison condition: ${key}`);
    }
  } else {
    const conditionKey = Object.keys(value)[0];
    const conditionValue = value[conditionKey];
    const charValue = await getStat(charObj, conditionKey);
    let metCondition;
    switch (key) {
      case "$lt":
        metCondition = charValue < conditionValue;
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
        return metCondition;
      case "$lte":
        metCondition = charValue <= conditionValue;
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
        return metCondition;
      case "$gt":
        metCondition = charValue > conditionValue;
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
        return metCondition;
      case "$gte":
        metCondition = charValue >= conditionValue;
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
        return metCondition;
      case "$ne":
        metCondition = charValue !== conditionValue;
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
        return metCondition;
      case "$eq":
        metCondition = charValue === conditionValue;
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
        return metCondition;
      case "$in":
        metCondition = conditionValue.includes(charValue);
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
      case "$nin":
        metCondition = !conditionValue.includes(charValue);
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
      case "$flags":
        metCondition = flags.check(charObj.flags, conditionValue);
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
      case "$regex":
        metCondition = new RegExp(value[conditionKey]).test(charValue);
        if (!metCondition && (error || value.error)) {
          throw new Error(error || value.error);
        }
      default:
        throw new Error(`Invalid check condition: ${key}`);
    }
  }
};
