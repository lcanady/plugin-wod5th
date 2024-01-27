import { Obj } from "../deps.ts";
import { getAttribute } from "../deps.ts";
import { registerConditionPlugin } from "../deps.ts";
import { getStat } from "../lib/getStats.ts";

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

export default () => {
  registerConditionPlugin({
    key: "$gte",
    handle: async (value: any, charObj: Obj, error?: string) => {
      let metCondition;

      if ("stats" in value && "value" in value) {
        // Handle StatComparison structure
        const total = await totalStats(charObj, value.stats);
        metCondition = total >= value.value;
      } else {
        // Handle individual stat comparison
        const conditionKey = Object.keys(value)[0];
        const conditionValue = value[conditionKey];
        const statValue = await getStat(charObj, conditionKey);
        metCondition = statValue >= conditionValue;
      }

      if (!metCondition && (error || value.error)) {
        throw new Error(error || value.error);
      }
      return metCondition;
    },
  });

  registerConditionPlugin({
    key: "$lte",
    handle: async (value: any, charObj: Obj, error?: string) => {
      let metCondition;

      if ("stats" in value && "value" in value) {
        // Handle StatComparison structure
        const total = await totalStats(charObj, value.stats);
        metCondition = total <= value.value;
      } else {
        // Handle individual stat comparison
        const conditionKey = Object.keys(value)[0];
        const conditionValue = value[conditionKey];
        const statValue = await getStat(charObj, conditionKey);
        metCondition = statValue <= conditionValue;
      }

      if (!metCondition && (error || value.error)) {
        throw new Error(error || value.error);
      }
      return metCondition;
    },
  });

  registerConditionPlugin({
    key: "$gt",
    handle: async (value: any, charObj: Obj, error?: string) => {
      let metCondition;

      if ("stats" in value && "value" in value) {
        // Handle StatComparison structure
        const total = await totalStats(charObj, value.stats);
        metCondition = total > value.value;
      } else {
        // Handle individual stat comparison
        const conditionKey = Object.keys(value)[0];
        const conditionValue = value[conditionKey];
        const statValue = await getStat(charObj, conditionKey);
        metCondition = statValue > conditionValue;
      }

      if (!metCondition && (error || value.error)) {
        throw new Error(error || value.error);
      }
      return metCondition;
    },
  });

  registerConditionPlugin({
    key: "$lt",
    handle: async (value: any, charObj: Obj, error?: string) => {
      let metCondition;

      if ("stats" in value && "value" in value) {
        // Handle StatComparison structure
        const total = await totalStats(charObj, value.stats);
        metCondition = total < value.value;
      } else {
        // Handle individual stat comparison
        const conditionKey = Object.keys(value)[0];
        const conditionValue = value[conditionKey];
        const statValue = await getStat(charObj, conditionKey);
        metCondition = statValue < conditionValue;
      }

      if (!metCondition && (error || value.error)) {
        throw new Error(error || value.error);
      }
      return metCondition;
    },
  });

  registerConditionPlugin({
    key: "$eq",
    handle: async (value: any, charObj: Obj, error?: string) => {
      let metCondition;

      if ("stats" in value && "value" in value) {
        // Handle StatComparison structure
        const total = await totalStats(charObj, value.stats);
        metCondition = total === value.value;
      } else {
        // Handle individual stat comparison
        const conditionKey = Object.keys(value)[0];
        const conditionValue = value[conditionKey];
        const statValue = await getStat(charObj, conditionKey);
        metCondition = statValue === conditionValue;
      }

      if (!metCondition && (error || value.error)) {
        throw new Error(error || value.error);
      }
      return metCondition;
    },
  });

  registerConditionPlugin({
    key: "$ne",
    handle: async (value: any, charObj: Obj, error?: string) => {
      let metCondition;

      if ("stats" in value && "value" in value) {
        // Handle StatComparison structure
        const total = await totalStats(charObj, value.stats);
        metCondition = total !== value.value;
      } else {
        // Handle individual stat comparison
        const conditionKey = Object.keys(value)[0];
        const conditionValue = value[conditionKey];
        const statValue = await getStat(charObj, conditionKey);
        metCondition = statValue !== conditionValue;
      }

      if (!metCondition && (error || value.error)) {
        throw new Error(error || value.error);
      }
      return metCondition;
    },
  });

  registerConditionPlugin({
    key: "$in",
    handle: async (value: any, charObj: Obj, error?: string) => {
      let metCondition;

      if ("stats" in value && "value" in value) {
        // Handle StatComparison structure
        const total = await totalStats(charObj, value.stats);
        metCondition = value.value.includes(total);
      } else {
        // Handle individual stat comparison
        const conditionKey = Object.keys(value)[0];
        const conditionValue = value[conditionKey];
        const statValue = await getStat(charObj, conditionKey);
        metCondition = conditionValue.includes(statValue);
      }

      if (!metCondition && (error || value.error)) {
        throw new Error(error || value.error);
      }
      return metCondition;
    },
  });

  registerConditionPlugin({
    key: "$nin",
    handle: async (value: any, charObj: Obj, error?: string) => {
      let metCondition;

      if ("stats" in value && "value" in value) {
        // Handle StatComparison structure
        const total = await totalStats(charObj, value.stats);
        metCondition = !value.value.includes(total);
      } else {
        // Handle individual stat comparison
        const conditionKey = Object.keys(value)[0];
        const conditionValue = value[conditionKey];
        const statValue = await getStat(charObj, conditionKey);
        metCondition = !conditionValue.includes(statValue);
      }

      if (!metCondition && (error || value.error)) {
        throw new Error(error || value.error);
      }
      return metCondition;
    },
  });
};
