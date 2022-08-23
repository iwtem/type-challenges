// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], "3">, [1, 2, "3"]>>,
  Expect<Equal<Push<["1", 2, "3"], boolean>, ["1", 2, "3", boolean]>>
];

// ============= Your Code Here =============
// 思路：通过 extends + infer 获取数组中的元素，然后通过 ... 拓展运算符将 U 放进去返回即可
type Push<T extends any[], U> = T extends [...infer R] ? [...R, U] : never;
