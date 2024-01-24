import { Obj } from "../deps.ts";
import { CalcValue } from "../deps.ts";
import { getStat } from "./getStats.ts";
import { setStat } from "./setStat.ts";

export const parseCalcValue = async (
  obj: Obj,
  calcValue: CalcValue | number,
): Promise<number> => {
  if (typeof calcValue === "number") {
    return calcValue;
  }

  for (const operation in calcValue) {
    const operands = calcValue[operation];

    switch (operation) {
      case "$add":
        let total = 0;
        for (const operand of operands as (string | number)[]) {
          if (typeof operand === "number") {
            return total += operand;
          }

          if (typeof operand === "string") {
            return total += await getStat(obj, operand);
          }
        }

      case "$sub":
        total = 0;
        for (const operand of operands as (string | number)[]) {
          if (typeof operand === "number") {
            return total -= operand;
          }

          if (typeof operand === "string") {
            return total -= await getStat(obj, operand);
          }
        }

      case "$mul":
        total = 0;
        for (const operand of operands as (string | number)[]) {
          if (typeof operand === "number") {
            return total *= operand;
          }

          if (typeof operand === "string") {
            return total *= await getStat(obj, operand);
          }
        }
      case "$div":
        total = 0;
        for (const operand of operands as (string | number)[]) {
          if (typeof operand === "number") {
            return total /= operand;
          }

          if (typeof operand === "string") {
            return total /= await getStat(obj, operand);
          }
        }
      case "$set":
        const resultSet = operands as { [key: string]: number | CalcValue };
        for (const key in resultSet) {
          const value = resultSet[key];
          await setStat(obj, key, await parseCalcValue(obj, value));
        }
        break;
      default:
        throw new Error(`Operation ${operation} is not supported.`);
    }
  }
  throw new Error(`Invalid calc value: ${calcValue}`);
};
