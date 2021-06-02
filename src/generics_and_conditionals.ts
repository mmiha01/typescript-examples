type FalseyValues = 0 | "" | false | null | undefined;

() => {
  function generic<T>(input: T): T {
    return input;
  }

  const x = generic(1123);
};

() => {
  function takesNumbers(input: number[]) {}

  // takesNumbers([1, 2, 3, null, false, "", undefined] ) // throws error

  function clearArray<A>(input: (A | FalseyValues)[]): A[] {
    function isNotFalsy(input: A | FalseyValues): input is A {
      return !!input;
    }

    return input.filter(isNotFalsy);
  }

  /*
    This won't work because "dirtyArray" can be changed at any point before going to the clean array
    const dirtyArray = [1, 2, 3, null, false, "", undefined];
    const cleanArray = clearArray(dirtyArray);

    Can be solved by "locking" the the array into "const / readonly" (see misc.ts)
    const dirtyArray = [1, 2, 3, null, false, "", undefined] as const;
    Notice: Would need to change clearArray input type to allow readonly too
  */

  const cleanArray = clearArray([1, 2, 3, null, false, "", undefined]);

  takesNumbers(cleanArray);
};

() => {
  function printOut<T extends number | string>(
    input: T,
    casing: T extends string ? "upper" | "lower" : undefined
  ) {}

  printOut("", "lower");
  printOut(0, undefined);
};

() => {
  function printOut<T extends number | string>(
    ...[input, casing]: T extends string
      ? [string, "upper" | "lower"]
      : [number]
  ) {}

  printOut("", "lower");
  printOut(4);
};

() => {
  function addOneIfNumber<T extends string | number>(
    input: T
  ): T extends string ? undefined : number {
    if (typeof input === "number") {
      return (input + 1) as T extends string ? undefined : number;
    }

    return undefined as T extends string ? undefined : number;
  }

  const result1 = addOneIfNumber("foo");
  const result2 = addOneIfNumber(2);
};
