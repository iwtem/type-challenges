// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Absolute<0>, "0">>,
  Expect<Equal<Absolute<-0>, "0">>,
  Expect<Equal<Absolute<10>, "10">>,
  Expect<Equal<Absolute<-5>, "5">>,
  Expect<Equal<Absolute<"0">, "0">>,
  Expect<Equal<Absolute<"-0">, "0">>,
  Expect<Equal<Absolute<"10">, "10">>,
  Expect<Equal<Absolute<"-5">, "5">>,
  Expect<Equal<Absolute<-1_000_000n>, "1000000">>,
  Expect<Equal<Absolute<9_999n>, "9999">>
];

// ============= Your Code Here =============
// 思路：通过模板字符串，将数字、Bigint 转换为字符串，并且会自动去除 bigint 中的 _ 和 n，然后通过 infer 去除 - 即可
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}`
  ? `${R}`
  : `${T}`;
