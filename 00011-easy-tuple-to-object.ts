// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: "tesla";
        "model 3": "model 3";
        "model X": "model X";
        "model Y": "model Y";
      }
    >
  >
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;

// ============= Your Code Here =============
// 思路：通过 Tuple[number] 可以将 Tuple 转换为联合类型，然后通过 in 操作符对联合类型进行遍历
type TupleToObject<T extends readonly (keyof any)[]> = {
  [P in T[number]]: P;
};
