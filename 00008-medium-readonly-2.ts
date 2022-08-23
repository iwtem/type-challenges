// ============= Test Cases =============
import type { Alike, Expect } from "./test-utils";

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>
];

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}

// ============= Your Code Here =============
// 思路：主要分两个步骤
//       1. 通过 Omit 函数获取除 K 以外的 T 的类型，保持不变
//       2. 通过 in 操作符得到所有 T 中的 K 的类型(1的反向操作)，并添加 readonly 修饰器
//       3. 通过 & 获取 1、2 两个类型的交叉类型，即将两个类型叠加到一起即为最后的结果
type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & {
  readonly [P in K]: T[P];
};
