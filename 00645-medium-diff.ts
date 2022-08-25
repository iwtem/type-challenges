// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];

// ============= Your Code Here =============
// 思路：这个方法比较麻烦，排除既属于 O1 又属于 O 的 key，然后再生成剩下的值
// type Diff<O, O1> = {
//   [P in keyof O | keyof O1 as P extends keyof O
//     ? P extends keyof O1
//       ? never
//       : P
//     : P]: P extends keyof O ? O[P] : P extends keyof O1 ? O1[P] : never;
// };

// 思路：通过 & 可以获取两者的所有类型，然后通过 keyof O & keyof O1 获取两者共同拥有的 key，然后通过 Omit 将共同的 key 省略即可
type Diff<O, O1> = Omit<O & O1, keyof O & keyof O1>;
