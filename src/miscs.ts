// Read only

const readonlyArray = [1, 2, 3, 4] as const;

// readonlyArray.reverse()  // won't work

const readOnlyObject = { foo: "bar" } as const;

// readOnlyObject.foo = 'test test' // won't work

// Tuples
const tupple1: [number, string] = [1, "foo bar"];
const tupple2: [...number[], string] = [1, 2, 3, 4, "foo bar"];
// const tupple2: [...number[], string, ...number[]] = [1,2,3,4, 'foo bar'] // won't work
const tupple3: [number, string, ...number[]] = [1, "foo bar"]; // optional numbers

// Whole objects can go to partial
interface User {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  eyeColour: string;
}

() => {
  function printUserFullName({
    firstName,
    lastName,
  }: Pick<User, "firstName" | "lastName">) {
    console.log(firstName, lastName);
  }

  const user: User = {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "04-04-1974",
    eyeColour: "blue",
  };

  printUserFullName(user);
};

// Enums
enum Actions {
  Update = "Update",
  Delete = "Delete",
}

// Can use methods like:
Object.keys(Actions);

// "Stripped out at compile time"
const enum OtherActions {
  Update = "Update",
}

console.log(OtherActions.Update);

// Object.keys(OtherActions) won't work
