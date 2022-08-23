// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>
];

// @ts-expect-error
type error = MyAwaited<number>;

// ============= Your Code Here =============
// 思路：通过 infer 获取 Promise 的泛型类型 R，如果 R 仍然是 Promise 的子类型，那么递归进行判断，否则返回 R，即 await 后的类型
type MyAwaited<T extends Promise<any>> = T extends Promise<infer R>
  ? R extends Promise<any>
    ? MyAwaited<R>
    : R
  : never;
