// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,

  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>
];

// ============= Your Code Here =============
// 思路：本题的解题思路在于需要对数组的每一项进行递归判断，主要判断每一项是否是 Promise，如果是则需要递归取出 Promise 的返回值，否则继续进行下一项。
//       因为最终的结果返回的 Promise，所以需要单独写一个 Type 进行内部的递归，最后再返回给 PromiseAll；
type SettleAll<T extends readonly any[]> = T extends [
  infer First,
  ...infer Rest
]
  ? First extends Promise<infer R>
    ? [R, ...SettleAll<Rest>]
    : [First, ...SettleAll<Rest>]
  : [];

declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<SettleAll<[...T]>>;
