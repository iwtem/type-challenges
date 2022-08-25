// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type test1 = {
  key: "cat";
  value: "green";
};

type testExpect1 = {
  key: "cat";
  value: "green";
  home: boolean;
};

type test2 = {
  key: "dog" | undefined;
  value: "white";
  sun: true;
};

type testExpect2 = {
  key: "dog" | undefined;
  value: "white";
  sun: true;
  home: 1;
};

type test3 = {
  key: "cow";
  value: "yellow";
  sun: false;
};

type testExpect3 = {
  key: "cow";
  value: "yellow";
  sun: false;
  isMotherRussia: false | undefined;
};

type cases = [
  Expect<Equal<AppendToObject<test1, "home", boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, "home", 1>, testExpect2>>,
  Expect<
    Equal<
      AppendToObject<test3, "isMotherRussia", false | undefined>,
      testExpect3
    >
  >
];

// ============= Your Code Here =============
// 思路： 把原始对象和新 Key, Value 合在一起
type AppendToObject<T, U extends PropertyKey, V> = { // PropertyKey 等同于 string | number | symbol
  [P in keyof T | U]: P extends keyof T ? T[P] : V;
};

// 另外一种解法，但是现在会报：Type 'false' does not satisfy the constraint 'true'.ts(2344)，和 TS 版本有关系？
// type AppendToObject<Obj, Key extends string, Value> = Obj & {
//   [K in Key]: Value
// }
