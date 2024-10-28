---
title: "Go pointers in a nutshell"
updated: "2023-08-06"
readTime: "5 min read"
---

# Go pointers in a nutshell

After moving from high-level languages like Python or JavaScript to Go, there is
one thing that will probably confuse most of the developers at the beginning,
and that are `pointers`. Despite Go being also a high-level language, its
compiled and that brings it closer to the machine compared to Python or
JavaScript. And because of that, we need to understand how pointers work in Go.

## What is a pointer in Go?

> ### TL;DR
>
> **A pointer is a variable that does not store a value itself but holds the
> memory address that direct us to this value. In other words, a pointer is just
> a variable with a memory address that you can share across functions.**\
> The type of the pointer `*T` is the type of the variable `T` it points to.

_Quick example_ let's say we have a variable `x` that stores the value `1` of
type `int`. We can create a pointer `y` that will store the address of the value
referenced by the variable `x`, so every time we will try to access the value of
`y` we will get the memory address of `x` not the value itself. The type of the
pointer `y` will be `*int`.

```go
package main

import "fmt"

func main() {
    var x = 1 // int
    var pointerX = &x // *int
    fmt.Println(pointerX) // 0xc0000b4008 (or some other address assigned by the OS)
    fmt.Println(&x) // 0xc0000b4008 (the same address as pointerX)
    fmt.Println(*pointerX) // 1

    x = 2
    fmt.Println(*pointerX) // 2
    //pointerX = 3 resolves with error: cannot use 3 (untyped int constant) as *int value in assignment
    *pointerX = 3
    fmt.Println(x) // 3
}
```

## The meaining of `&` and `*` operators in types and expressions

- The first operator `&` is used to return the address of a value in memory. I
  like to call it the _address operator_ or _reference operator_.

- The second operator `*` is called the _dereference_ or _indirection operator_.
  It returns the value stored at the given address, so we use it only with
  variables that are declared as pointers.

### Types

- `{type}` - 'normal' type of the variable, e.g. `string`
- `*{type}` - pointer to the type, e.g. `*string`

### Expressions

- `{variable}` - value of the variable e.g. `"hello"`
- `&{variable}` - address of the variable in memory e.g.
  `&"hello" = 0xc0000b4008`
- `*{variable}` - value at address e.g. `*"0xc0000b4008" = "hello"`

This is just a simplification, as `&"hello"` is not a valid expression in Go,
but it helps to understand the concept.

## So, should we use pointers?

We can write code without using them, and it will work just fine (well, without
using external libraries, because they often force us to work with pointers).
But nevertheless, there are a few reasons why we should use pointers in our
code. Here are some of them:

- mutate data in structs while using pointer receivers
- keep the code consistent and readable
- share data between functions without copying the whole data structure

[More about the reasons to use](#lets-dive-deeper-into-the-reasons-when-to-use-pointers)

There are also some reasons when we should not use pointers:

- when we don't want to check every time if the pointer is `nil` or not (this
  can cause error called `nil pointer dereference`)
- sometimes we have to add additional code to pass a pointer for example to a
  struct that requires `*T` type, it can make the code less pleasant to read
- potential additional overhead when passing pointers to functions

[More about problems](#common-problems-with-pointers)

## Let's dive deeper into the reasons when to use pointers

#### 1. Pointer receivers

If we have a method in a struct that needs to mutate the struct, we need to use
a pointer receiver. This can be useful method if for example we need to build a
pool of connections and we want to manage them in a struct. We can add and
remove connections from the pool by using methods on the struct. A simple
example can be seen below:

```go
package main

import "fmt"

type Pool struct {
    Connections []Connection
}

type Connection struct {
    Name string
}

func (p *Pool) AddConnection(c Connection) {
    p.Connections = append(p.Connections, c)
}

func (p Pool) RemoveConnectionUnsuccessfully(c Connection) {
    for i, connection := range p.Connections {
        if connection == c {
            p.Connections = append(p.Connections[:i], p.Connections[i+1:]...)
        }
    }
}

func (p *Pool) RemoveConnectionSuccessfully(c Connection) {
    for i, connection := range p.Connections {
        if connection == c {
            p.Connections = append(p.Connections[:i], p.Connections[i+1:]...)
        }
    }
}

func main() {
    var pool = Pool{}
    var connection = Connection{Name: "connection1"}
    pool.AddConnection(connection)
    fmt.Println("Start")
    fmt.Println(pool.Connections[0].Name) // connection1
    pool.RemoveConnectionUnsuccessfully(connection)
    fmt.Println("First removal attempt")
    if len(pool.Connections) > 0 {
        fmt.Println(pool.Connections[0].Name) // connection1
    }
    pool.RemoveConnectionSuccessfully(connection)
    fmt.Println("Second removal attempt")
    if len(pool.Connections) > 0 { // empty
        fmt.Println(pool.Connections[0].Name)
    }
}
```

#### 2. Consistency

If we use pointers everywhere, our code will be more consistent and easier to
read. We will know that if we see a pointer, we can expect that the value of the
struct will be mutated. Also, if we returning pointers from functions, we can
for example return something like `(nil, err)` instead of `(someStruct{}, err)`,
which can be unpleasant to read in some cases, eg.:

```go
package main

import "fmt"

type LongButDescriptiveStructName struct {
   Name string
}

func main() {
   x, err := someFunction()
   if err != nil {
       fmt.Println(err)
   }
   fmt.Println(x) // {}
   y, err := functionWithPointer()
   if err != nil {
       fmt.Println(err)
   }
   fmt.Println(y) // <nil>
}

func someFunction() (LongButDescriptiveStructName, error) {
   return LongButDescriptiveStructName{}, nil
}

func functionWithPointer() (*LongButDescriptiveStructName, error) {
   return nil, nil
}
```

What can be also noticed here is that we can not return a nil value of a type
that is not a pointer, so we need to return a zero-value of the type, this can
be sometimes seen as a disadvantage of using pointers, see
[Common problems with pointers](#common-problems-with-pointers).

#### 3. Sharing large data structures between functions

If we have a large data structure, we don't want to copy it every time we pass
it to a function. We can pass a pointer to the data structure instead, and it
will save us a little or a lot of memory, depending on the size of the data
structure.

## Common problems with pointers

#### 1. Dereferencing a nil pointer

The most common problem with pointers is that the zero-value of a pointer is
`nil`. If we try to access the value of a pointer that is `nil` we will get a
runtime error. See code below:

```go
package main

import "fmt"

func main() {
    var x *int
    fmt.Println(x) // <nil>
    fmt.Println(*x) // panic: runtime error: invalid memory address or nil pointer dereference
}
```

#### 2. Dereferencing a pointer that is not initialized

Another common problem is that we can not get the address of a value that is not
stored in memory, e.g. a literal. See code below:

```go
package main

import "fmt"

func main() {
    fmt.Println(&"hello") // cannot take the address of "hello"
}
```

This can be sometimes confusing, when we're using a library that forces us to
use pointers in struct, let's say of type `*string`, and we want to pass
hardcoded string to it, we need to either create a variable and pass a pointer
to it, or we can use a trick with a slice of given type, which in our case will
be `[]string`, and then we can get the address of the first element of the
slice. This solution is not very readable, but it can be useful in some cases,
also it's possible because when we pass a slice, we're passing the values of
that slice are passed by reference, so we can get the address of all of them.
See code below:

```go
package main

import "fmt"

type StructWithPointer struct {
	Name *string
}

func main() {
	hello := "variable"
	var s = StructWithPointer{Name: &hello}
	fmt.Println(*s.Name) // "variable"
	// slice of bytes approach
	var s2 = StructWithPointer{Name: &[]string{"struct"}[0]}
	fmt.Println(*s2.Name) // "struct"
}
```

#### 3. Additional overhead

Whenever we're passing a pointer to a function, compiler needs to escape
analysis to determine if variable should be allocated on the heap or stack. If
it will stored on the heap it can add some overhead to the program as heap
allocation is slower, and it will be garbage collected later.
