// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<
    Equal<AnyOf<[1, "test", true, [1], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[1, "", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "test", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { name: "test" }]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { 1: "test" }]>, true>>,
  Expect<
    Equal<AnyOf<[0, "", false, [], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[0, "", false, [], {}]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>
];

// ============= Your Code Here =============
type Falsy = "" | 0 | false | [] | Record<PropertyKey, never>;

// 思路1：判断数组内任意元素是否满足某个条件的题目，、用递归的方式解决，具体是先判断数组第一项是否是 Falsy，如果是则继续递归判断剩余项，否则表示存在真值终止判断
//        这种方式稍微有些麻烦
// type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer R]
//   ? F extends Falsy
//     ? AnyOf<R>
//     : true
//   : false;

// 思路2：数组转 Union，判断任意项是否是真值
type AnyOf<T extends any[]> = T[number] extends Falsy ? false : true;

// 难点： {} 并不表示空对象，而是表示所有对象类型，要把它换成 Record<PropertyKey, never> 或者 {[key: string | number | symbol]: never}，以锁定空对象