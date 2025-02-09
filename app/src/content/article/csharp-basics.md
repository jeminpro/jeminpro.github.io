---
title: C# basics
description: Learning a new programming language can feel overwhelming, but what if I told you that just 20% of C# concepts cover 80% of real-world applications? By focusing on the most frequently used and essential concepts, you can become highly proficient in C# without spending years mastering every little detail.
publishedDate: '2019-05-13'
category:  Back End

---

Learning a new programming language can feel overwhelming, but what if I told you that just 20% of C# concepts cover 80% of real-world applications? By focusing on the most frequently used and essential concepts, you can become highly proficient in C# without spending years mastering every little detail.

Whether you're a complete beginner or an experienced developer looking to brush up on fundamentals, this guide will help you focus on what really counts. 

## 1. Variables & Data Types

Variables store **data** in memory. In C#, you must declare a variable **with a type**.

### Types of Variables
1. **Primitive Types** (Value Types)
   - Stored directly in memory.
   - Examples: `int`, `double`, `bool`, `char`

2. **Reference Types**
   - Stores a reference (address) in memory.
   - Examples: `string`, `object`, `dynamic`

### **Example: Declaring Variables**
```csharp
int age = 30;          // Integer
double price = 99.99;  // Decimal
bool isAvailable = true; // Boolean
char grade = 'A';      // Character
string name = "Alice"; // String
```

### **Nullable Types**
Nullable types allow a **value type** to hold `null`.

Nullable types are useful when handling **database fields** that may have `NULL` values.

```csharp
int? score = null;
score = 85; // Now it has a value
```

---

## 2. Control Structures (Flow Control)
Flow control **decides the execution path** of the program.

### Conditional Statements
```csharp
int number = 5;

if (number > 0)
    Console.WriteLine("Positive Number");
else if (number < 0)
    Console.WriteLine("Negative Number");
else
    Console.WriteLine("Zero");
```

### Switch Case
```csharp
char grade = 'B';

switch (grade)
{
    case 'A': Console.WriteLine("Excellent!"); break;
    case 'B': Console.WriteLine("Good!"); break;
    default: Console.WriteLine("Needs Improvement"); break;
}
```

### Loops
Loops are useful in **iterating over data collections** like arrays or lists.

#### For Loop
```csharp
for (int i = 1; i <= 5; i++)
    Console.WriteLine($"Iteration {i}");
```

#### While Loop
```csharp
int i = 0;
while (i < 3)
{
    Console.WriteLine($"Count: {i}");
    i++;
}
```

---

## 3. Object-Oriented Programming (OOP)
OOP is a programming paradigm that **organizes code using objects**.

It helps in **code organization, reusability, and scalability** in large applications.

### Classes & Objects
```csharp
class Car
{
    public string Brand;
    public void Drive() => Console.WriteLine($"{Brand} is driving.");
}

Car myCar = new Car { Brand = "Toyota" };
myCar.Drive();
```

### Encapsulation (Hiding Data)
```csharp
class BankAccount
{
    private double balance = 0;
    
    public void Deposit(double amount) => balance += amount;
    public double GetBalance() => balance;
}
```

### Inheritance (Reusing Code)
```csharp
class Animal { public void Speak() => Console.WriteLine("Animal Sound"); }
class Dog : Animal { public void Bark() => Console.WriteLine("Bark!"); }

Dog myDog = new Dog();
myDog.Speak(); // Inherited method
myDog.Bark();  // Own method
```

### Polymorphism (Different Behaviors)
```csharp
class Base
{
    public virtual void Show() => Console.WriteLine("Base class");
}
class Derived : Base
{
    public override void Show() => Console.WriteLine("Derived class");
}

Base obj = new Derived();
obj.Show(); // Output: Derived class
```


---

## 4. Collections & LINQ
Collections **store multiple values dynamically**.

Collections & LINQ help in **managing and querying data efficiently**.

### Lists
```csharp
List<string> names = new List<string> { "Alice", "Bob" };
names.Add("Charlie");
Console.WriteLine(names[1]); // Output: Bob
```

### Dictionaries (Key-Value Pairs)
```csharp
Dictionary<int, string> students = new Dictionary<int, string>
{
    {1, "John"},
    {2, "Jane"}
};
Console.WriteLine(students[1]); // Output: John
```

### LINQ (Querying Data)
```csharp
var numbers = new List<int> { 1, 2, 3, 4, 5 };
var evenNumbers = numbers.Where(n => n % 2 == 0).ToList();
Console.WriteLine(string.Join(", ", evenNumbers)); // Output: 2, 4
```

---

## 5. Methods & Properties
Methods **group reusable logic**. They are useful for **code modularity**.

### Example: Methods
```csharp
void Greet(string name) => Console.WriteLine($"Hello, {name}!");
Greet("Alice");
```

### Properties
```csharp
class Person
{
    public string Name { get; set; }
}

Person p = new Person { Name = "John" };
Console.WriteLine(p.Name);
```

---

## 6. Asynchronous Programming
Async allows code to **run without blocking execution**.

Useful for **API calls and I/O operations**.

### Example
```csharp
async Task FetchData()
{
    Console.WriteLine("Fetching...");
    await Task.Delay(2000);
    Console.WriteLine("Data Fetched");
}

await FetchData();
```

---

## 7. File Handling
Reading/Writing files in **C#**. Storing and retrieving **user data**.

### Example
```csharp
using System.IO;

File.WriteAllText("data.txt", "Hello, World!");
string content = File.ReadAllText("data.txt");
Console.WriteLine(content);
```

---

## 8. Delegates, Events, and Lambda Expressions
A **delegate** is a function pointer. Used for **event handling**.

### Example
```csharp
delegate void MyDelegate(string message);
void PrintMessage(string msg) => Console.WriteLine(msg);

MyDelegate del = PrintMessage;
del("Hello from delegate!");
```

## Lambda Expressions
```csharp
Func<int, int, int> add = (a, b) => a + b;
Console.WriteLine(add(5, 3)); // Output: 8
```

---

## 9. Dependency Injection & SOLID
DI **reduces dependencies** between classes. 
Improves **code maintainability**.

### Example
```csharp
interface IService { void Serve(); }
class Service : IService { public void Serve() => Console.WriteLine("Service Called"); }

class Client
{
    private readonly IService _service;
    public Client(IService service) => _service = service;
    public void Start() => _service.Serve();
}

IService service = new Service();
Client client = new Client(service);
client.Start();
```

---

## 10. Error Handling & Debugging
Handles **runtime errors**. Prevents **application crashes**.

### Example
```csharp
try
{
    int result = 10 / 0;
}
catch (DivideByZeroException ex)
{
    Console.WriteLine("Cannot divide by zero.");
}
finally
{
    Console.WriteLine("Execution completed.");
}
```
