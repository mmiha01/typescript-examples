interface Product {
  model: string;
  date: {
    year: number;
    month: number;
  };
}

function foo(input: Product["date"]) {
  return input;
}

foo({ year: 2000, month: 2 });
