// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];

// ============= Your Code Here =============
// 思路：通过 ... 和 infer 获取数组最后的一个类型即可
type Last<T extends any[]> = T extends [...infer M, infer N] ? N : any;
