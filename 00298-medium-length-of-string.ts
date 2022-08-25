// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
];

// ============= Your Code Here =============
// 思路：此题需要知道一个前提，即 TS 访问数组类型的 [length] 属性可以拿到长度值，也就是说，我们需要把 'abc' 转化为 ['a', 'b', 'c']
//      其次，需要了解的前置知识是，用 infer 指代字符串时，第一个指代指向第一个字母，第二个指向其余所有字母
//      思路就是，每次把字符串第一个字母拿出来放到数组 N 的第一项，直到字符串被取完，直接拿此时的数组长度。
type LengthOfString<
  S extends string,
  M extends any[] = []
> = S extends `${infer R}${infer L}`
  ? LengthOfString<L, [...M, R]>
  : M["length"];
