// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<KebabCase<"FooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"fooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"foo-bar">, "foo-bar">>,
  Expect<Equal<KebabCase<"foo_bar">, "foo_bar">>,
  Expect<Equal<KebabCase<"Foo-Bar">, "foo--bar">>,
  Expect<Equal<KebabCase<"ABC">, "a-b-c">>,
  Expect<Equal<KebabCase<"-">, "-">>,
  Expect<Equal<KebabCase<"">, "">>,
  Expect<Equal<KebabCase<"😎">, "😎">>
];

// ============= Your Code Here =============
// 思路：每次递归取第一个字符，只要小写不等于原始值就是大写。
//      所以判断条件就是 Uncapitalize<F> extends F 的 false 分支.
type KebabCase<S extends string> = S extends `${infer R}${infer Rest}`
  ? Rest extends Uncapitalize<Rest>
    ? `${Lowercase<R>}${KebabCase<Rest>}`
    : `${Lowercase<R>}-${KebabCase<Rest>}`
  : S;
