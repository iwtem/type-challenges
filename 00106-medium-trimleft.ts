// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<TrimLeft<"str">, "str">>,
  Expect<Equal<TrimLeft<" str">, "str">>,
  Expect<Equal<TrimLeft<"     str">, "str">>,
  Expect<Equal<TrimLeft<"     str     ">, "str     ">>,
  Expect<Equal<TrimLeft<"   \n\t foo bar ">, "foo bar ">>,
  Expect<Equal<TrimLeft<"">, "">>,
  Expect<Equal<TrimLeft<" \n\t">, "">>
];

// ============= Your Code Here =============
// 思路： TS 处理这类问题只能用递归，关键点在 infer 也能用在字符串内进行推导
type WhiteSpace = " " | "\n" | "\t";

type TrimLeft<S extends string> = S extends `${WhiteSpace}${infer R}`
  ? TrimLeft<R>
  : S;
