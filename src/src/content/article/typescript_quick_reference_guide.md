---
title: TypeScript - A Deep Dive with a Quick Reference Guide
description: TypeScript is Superset of JavaScript (i.e. adding new features on top of JavaScript) with syntax for types. It helps in catching errors during build time and therefore reducing the bugs in the applications. This article is a quick reference guide on type script main features with examples.
publishedDate: 2020-07-22
category: Front End
---

TypeScript is Superset of JavaScript (i.e. adding new features on top of JavaScript) with syntax for types. It helps in catching errors during build time and therefore reducing the bugs in the applications. This article is a quick reference guide on type script main features with examples.

For diving deeper understanding on these topic refer to 

Hands-on tutorial:  [Scrimba Learn Typescript](https://scrimba.com/learn/typescript) 
Documentation: [The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) & [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

### Static Typing

TypeScript's hallmark feature is its support for static typing. This means you can specify the type of variables, function parameters, returned values, and object properties.

```typescript
let isDone: boolean = false;
let age: number = 25;
let name: string = "Alice";`
```

###  Type Inference

Even if you don't specify types, TypeScript will infer them for you, helping to catch potential issues.

```typescript
let x = 3; // TypeScript knows x is a number
```

### Basic Types:

**Boolean**: Represents a true/false value.
**Number**: Represents both floating-point and integer values.
**String**: Represents a sequence of characters.

```typescript
let isDone: boolean = false;
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let color: string = "blue";
```

### Array Type:

 Represents a list of elements of a certain type.

```typescript
let list: number[] = [1, 2, 3];
let list2: (number, number, string)[] = [1, 2, "Hello"];
let list3: Array<number> = [1, 2, 3];

const reviews: { 
    name: string; 
    stars: number; 
    date: string; 
    }[] = [
    {
        name: 'Sheia',
        stars: 5,
        date: '01-04-2021'
    },
    {
        name: 'Andrzej',
        stars: 3,
        date: '28-03-2021'
    }
]
```
### Object Type:

In TypeScript, almost everything is an object, but when we refer to "object types," we're specifically talking about the shapes that values can have. You can define an object type using the curly braces `{}` syntax, specifying property names and their types.

```typescript
type Person = {
    firstName: string;
    lastName: string;
    age: number;
    isStudent: boolean;
};

const john: Person = {
    firstName: "John",
    lastName: "Doe",
    age: 25,
    isStudent: true
};
```

### Tuple:

Allows you to express an array where the type of a fixed number of elements is known, but they don't have to be the same type.

```typescript
let x: [string, number];
x = ["hello", 10];
```

### Enum:

A way of giving more friendly names to sets of numeric values.
By default, enums begin numbering their members starting from 0

```typescript
// Default to Red = 0, Gree = 1, Blue = 2
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Default value to Red = 0, Gree = 1, Blue = 2
enum Color {Red, Green, Blue}
let c: Color = Color.Green;	// c value is 1

// Specify the value
enum Color {Red = 10, Green = 20, Blue = 30}
let c: Color = Color.Green; // c value is 20

// Specify the value to string
enum Color {
	Red= "RED", 
	Green= "GREEN", 
	Blue = "BLUE"
}
let c: Color = Color.Green; // c value is GREEN
```

### Any:

Opt-out of type-checking and let the values pass through compile-time checks.
Useful when you don't know the type of a variable, such as when using a library you don't have typings for

```typescript
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;
```

### Functions:

In a function input parameter types and return type can be defined

```typescript
function sum(a: number, b: number): number{
    return a+b;
}

Absence of having any type at all. Commonly used as the return type of functions that do not return a value.

```typescript
function warnUser(): void {
    console.log("This is a warning message");
}
```

### Null and Undefined:

Subtypes of all other types. This means you can assign null and undefined to something like number.

```typescript
let u: undefined = undefined;
let n: null = null;
```

### Type Assertions:

A way to tell the compiler "trust me, I know what I'm doing."
No runtime impact; purely used by the compiler.

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
let strLength2: number = (someValue as string).length;
```

### Interfaces:

Describes the shape of an object, ensuring that an object has certain properties.
Can be used to describe function types, array types, and can be extended.

```typescript
interface LabelledValue {
    label: string;
}
function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}
```

#### Type Aliases vs. Interfaces

While type aliases and interfaces in TypeScript can often be used interchangeably, there are some differences:

1.  **Extensibility**: Interfaces are more extensible because they can be merged using declaration merging. Type aliases cannot be reopened to add new properties.
2.  **Complex Types**: Type aliases can represent complex types more easily, such as union or tuple types.
3.  **Descriptive Errors**: Some developers find error messages involving interfaces to be clearer than those involving type aliases.

### Classes:

Incorporates classes, interfaces, and inheritance just like in object-oriented languages like Java and C#.
Supports public, private, and protected modifiers.

```typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```
### Generics:

Allows you to create reusable components.
Provides a way to create functions, classes, and interfaces that work with a variety of data 

```typescript
function identity<T>(arg: T): T {
    return arg;
}
let output = identity<string>("myString");
```

### Modules:

Helps organize code and manage dependencies.
Can export or import functions, variables, classes, interfaces, etc.

```typescript
// In file math.ts
export function add(x: number, y: number): number {
    return x + y;
}

// In another file
import { add } from "./math";
console.log(add(1, 2));
```

### Access Modifiers:

- `public`: This is the default and means the member can be accessed from any location.
- `private`: This means the member can only be accessed from within the containing class.
- `protected`: This means the member can be accessed within the containing class and by subclasses.

### Decorators:

Special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter.
Used for modifying classes or class members at design time and runtime.

```typescript
function sealed(target: any) {
    Object.seal(target);
    Object.seal(target.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

### Type Aliases:

Gives a type a new name.
Can be used to avoid rewriting complex type definitions.

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

//Using it as below
let userName: Name;
```

### Union and Intersection Types:

Union Type: A value that can be one of several types. Use the | separator.
Intersection Type: Combines multiple types into one. Use the & separator.

```typescript
function padLeft(value: string, padding: string | number) { /*...*/ }
type Combined = TypeA & TypeB;
```

### Advanced Features:

-   **Mapped Types**: Allows you to create a new type based on the properties of an existing type.
-   **Conditional Types**: Adds the ability to express non-uniform type mappings.
-   **Type Guards**: A way to narrow down the type of an object within a conditional block.
-   **Readonly**: Makes properties immutable.
-   **Partial, Required, Readonly, and Pick**: Utility types that help with common type transformations.