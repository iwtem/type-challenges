// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type Animal = Cat | Dog;

type cases = [
  Expect<Equal<LookUp<Animal, "dog">, Dog>>,
  Expect<Equal<LookUp<Animal, "cat">, Cat>>
];

// ============= Your Code Here =============
// 解法一
// 思路：先利用 extend + infer 锁定 T 的类型是包含 type key 的对象，且将 infer U 指向了 type，所以在内部再利用三元运算符判断 U extends P ? 就能将 type 命中的类型挑出来。
type LookUp<U, T> = U extends { type: infer R }
  ? R extends T
    ? U
    : never
  : never;

// 解法二
// 直接用整个对象结构 { type: T } 判断，是更纯粹的 TS 思维，解法更简洁，推荐
// type LookUp<U, T> = U extends { type: T } ? U : never;
