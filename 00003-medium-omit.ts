// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>
];

// @ts-expect-error
type error = MyOmit<Todo, "description" | "invalid">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

// ============= Your Code Here =============
// 思路：Omit 的使用场景是 K 一定是 keyof 的子集，所以参数需要进行指定；通过 in 遍历 T 的 key，然后通过再判断 P 是否是 K 的子集，如果是则 never，否则获取当前key的值
type MyOmit<T extends Object, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
