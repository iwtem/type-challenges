// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>;
type Result1 = (a: number, b: string, x: boolean) => number;

type Case2 = AppendArgument<() => void, undefined>;
type Result2 = (x: undefined) => void;

type cases = [Expect<Equal<Case1, Result1>>, Expect<Equal<Case2, Result2>>];

// ============= Your Code Here =============
// 思路：主要就是通过 infer 获取函数的参数与返回值，然后将新的参数拼接上原有的参数形成新的函数类型即可
type AppendArgument<Fn extends (...args: any[]) => any, A> = Fn extends (
  ...args: infer R
) => infer M
  ? (...args: [...R, A]) => M
  : never;
