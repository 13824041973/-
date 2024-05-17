enum Enum {
  A,
  B,
  C = "c",
  D = 4,
  E,
}

console.log(Enum.A);
console.log(Enum.B);
console.log(Enum.C);
console.log(Enum.D);
console.log(Enum.E);

let arr: number[] = [];

const arr1: ReadonlyArray<number> = [1, 2, 3];

arr[0] = arr1[0];
