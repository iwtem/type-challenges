// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, "title">>>,
  Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>,
  // @ts-expect-error
  MyPick<Todo, "title" | "completed" | "invalid">
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}

// ============= Your Code Here =============
// 思路：遍历 T 的 key，并且判断 key 是否在 K 中（通过 extends 判断）
//       如果 key 在 K 中，那么生成该类型，否则 never
type MyPick<T, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]: T[P];
};
