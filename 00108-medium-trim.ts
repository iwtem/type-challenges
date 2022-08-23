// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>,
  Expect<Equal<Trim<"">, "">>,
  Expect<Equal<Trim<" \n\t ">, "">>
];

// ============= Your Code Here =============
// 思路：同 TrimLeft，不过多了一个 TrimRight，可以通过添加联合类型或者多一个三元运算符进行递归去除空白
type WhiteSpace = " " | "\n" | "\t";

type Trim<S extends string> = S extends
  | `${WhiteSpace}${infer R}`
  | `${infer R}${WhiteSpace}`
  ? Trim<R>
  : S;
