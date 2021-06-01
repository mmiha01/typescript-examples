interface Product {
  model: string;
  date: {
    year: number;
    month: number;
  };
  manufacturer: string;
  additionalNotes?: string; // yields very similar result as additionalNotes: string | undefined
}

// 1. Partial
type PartialProduct = Partial<Product>;

// Works as all fields are optional now
const partialProduct: PartialProduct = {};

// 2. Pick
type PickedProduct = Pick<Product, "model" | "manufacturer">;

const pickedProduct: PickedProduct = {
  model: "foobar",
  manufacturer: "John Doe",
};

// Possible got'cha moment - Pick also inherit "optionality"
function sendMail(to: string, content: string) {}

function sendAdditionalNotesToManufacturer({
  manufacturer,
  additionalNotes,
}: Pick<Product, "manufacturer" | "additionalNotes">) {
  if (additionalNotes) {
    sendMail(manufacturer, additionalNotes);
  }

  sendMail(manufacturer, "No additional notes regarding product");
}

sendAdditionalNotesToManufacturer({ manufacturer: "somebody" }); // Notice, "additionalNotes" is never passed and no error is raised!

// Firt solution: use indexing
function _sendAdditionalNotesToManufacturer({
  manufacturer,
  additionalNotes,
}: {
  manufacturer: Product["manufacturer"];
  additionalNotes: Product["additionalNotes"];
}) {
  if (additionalNotes) {
    sendMail(manufacturer, additionalNotes);
  }

  sendMail(manufacturer, "No additional notes regarding product");
}

// _sendAdditionalNotesToManufacturer({manufacturer: 'somebody'}) --> this would throw error
_sendAdditionalNotesToManufacturer({
  manufacturer: "somebody",
  additionalNotes: undefined,
}); // this is fine, as it can be undefined
_sendAdditionalNotesToManufacturer({
  manufacturer: "somebody",
  additionalNotes: "some notes",
}); // this is fine, as it can be string

// 3. Required - tl:dr; Oposite of "Partial"

type RequiredType = Required<Product>;

const requiredType: RequiredType = {
  manufacturer: "John Doe",
  date: {
    year: 2000,
    month: 4,
  },
  model: "Foobar",
  additionalNotes: "Some notes", // leaving this out or making it undefined would throw an error
};

// 4. Omit - remove a property completely

type OmittedProduct = Omit<Product, "date">;

const omittedProduct: OmittedProduct = {
  manufacturer: "John Doe",
  model: "Foo bar",
  additionalNotes: "Foo bar",
};

// 5. Exclude - like Omit but for types, not for properties

type Something = string | number | null;

(() => {
  const bar: Something = "Okay";

  // const fizz: Exclude<Something, string> = 'Okay' // would throw error
  const fizz: Exclude<Something, string> = 123; // would throw error
})();

// 6. Extract - tld:dr; find extract common types between A and B
type Extracted = Extract<string | number | null, number | null>;

// const extracted: Extracted = 'foo' // would throw error
const extracted: Extracted = null; // would throw error

// 7. ReturnType - return type of function, combine with "typeof"

(() => {
  function foobar() {
    if (Math.random() > 0.5) {
      return {
        foo: 200,
        bar: 200,
      };
    }

    return {
      foo: "123",
      bar: 100,
    };
  }

  const x: ReturnType<typeof foobar> = {
    foo: "foo bar",
    bar: 200,
  };
})();
