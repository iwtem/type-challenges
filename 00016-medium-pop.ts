// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<["a", "b", "c", "d"]>, ["a", "b", "c"]>>
];

// ============= Your Code Here =============
// 思路： 通过...infer M 获取到 n-1项, infer N 是最后一项，一定要用 N 进行占位表示最后一项，然后返回 M 即可
type Pop<T extends any[]> = T extends [...infer M, infer N] ? M : never;
