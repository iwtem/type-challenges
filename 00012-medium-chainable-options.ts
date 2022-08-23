// ============= Test Cases =============
import type { Alike, Expect } from "./test-utils";

declare const a: Chainable;

const result1 = a
  .option("foo", 123)
  .option("bar", { value: "Hello World" })
  .option("name", "type-challenges")
  .get();

const result2 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", "last name")
  .get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};

// ============= Your Code Here =============
// 思路：因为是链式，所以每个 option 函数的返回类型都是 Chainable，因为返回值一定会包含 option 和 get 两个函数；
//       其次每次的链式调用都需要把上一次的类型给到下一次的调用的类型，所以需要声明一个 T，用于保存这个类型，也就是 get 的返回类型，即最后的类型；
//       然后在每一次调用 option 函数的时候，将当前的入参合并到 T 中即可，最后通过 get 返回出去。
type Chainable<T = {}> = {
  option<M extends string, N>(
    key: M extends keyof T ? (N extends T[M] ? never : M) : M,
    value: N
  ): Chainable<Omit<T, M> & Record<M, N>>;
  get(): T;
};
