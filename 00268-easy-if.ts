// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>


// ============= Your Code Here =============
// 思路：直接判断 C 是否是 true 的子类型即可
type If<C extends boolean, T, F> = C extends true ? T : F;
