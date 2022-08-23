// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}


// ============= Your Code Here =============
// 思路：遍历 T 的 key，然后对项添加 readonly 即可
type MyReadonly<T extends Object> = {
  readonly [P in keyof T]: T[P];
}
