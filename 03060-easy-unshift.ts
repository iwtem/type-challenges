// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'


type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2 ]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
]


// ============= Your Code Here =============
// 思路：通过 infer 获取数组中的元素，然后通过 ... 拓展运算符将两者组合起来即可，U 放置在最前面
type Unshift<T extends any[], U> = T extends [...infer R] ? [U, ...R] : never;
