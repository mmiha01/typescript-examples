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
