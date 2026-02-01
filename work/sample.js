/* eslint-disable no-unused-vars */
/**
 * Sample JavaScript file for syntax highlighting testing
 * This file demonstrates as many token scopes as possible from the theme
 *
 * @file Comprehensive syntax highlighting demo
 * @author Theme Developer
 * @version 1.0.0
 */

// Single line comment (scope: comment - italic, pink-tinted)

  "devDependencies": {
<<<<<<< Updated upstream
    "@gesslar/sassy": "^2.0.0",
=======
>>>>>>> Stashed changes
    "@gesslar/uglier": "^1.2.0",
    "@vscode/vsce": "^3.7.1",
    "eslint": "^9.39.2",
    "ovsx": "^0.10.8"

/*
 * Multi-line block comment
 * Should also be italic with the comment color
 */

// =============================================================================
// IMPORTS & MODULES (scope: module.meta, entity.name.type.module)
// =============================================================================

import fs from "fs"
import path from "path"
import {EventEmitter} from "events"
import * as http from "http"
import defaultExport, {namedExport as alias} from "./module.js"

// Dynamic import
const dynamicModule = await import("./dynamic.js")

// =============================================================================
// CONSTANTS & VARIABLES (scope: constant.other, variable.other.constant)
// =============================================================================

const MAX_SIZE = 1024
const PI = 3.14159
const API_URL = "https://api.example.com"
const REGEX_PATTERN = /^[a-zA-Z0-9]+$/gi

const mutableVariable = 42
var legacyVariable = "old style"

// Built-in constants (scope: support.constant)
const nodeVersion = process.version
const envPath = process.env.PATH

// =============================================================================
// PRIMITIVE LITERALS
// =============================================================================

// Numbers (scope: constant.numeric)
const integer = 42
const float = 3.14
const scientific = 1.5e10
const hex = 0xFF
const octal = 0o77
const binary = 0b1010
const bigInt = 9007199254740991n
const negative = -273.15

// Strings (scope: string.quoted)
const singleQuote = "Hello, World!"
const doubleQuote = "Hello, World!"
const templateLiteral = `Hello, ${singleQuote}!`

// String interpolation (scope: punctuation.definition.template-expression)
const name = "Developer"
const greeting = `Welcome, ${name}! You have ${5 + 3} messages.`
const nested = `Outer ${`Inner ${1 + 2}`} End`

// Booleans and null (scope: constant.language.boolean)
const isEnabled = true
const isDisabled = false
const nothing = null
const notDefined = undefined

// =============================================================================
// REGULAR EXPRESSIONS (scope: regexp, constant.other.character-class.regexp)
// =============================================================================

const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/i
const phoneRegex = /^\+?(\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
const captureGroups = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
const characterClass = /[A-Za-z_][A-Za-z0-9_]*/
const quantifiers = /\w+\s*=\s*(['"]).*?\1/g

// =============================================================================
// OPERATORS (scope: keyword.operator)
// =============================================================================

// Arithmetic operators
const sum = 10 + 5
const difference = 10 - 5
const product = 10 * 5
const quotient = 10 / 5
const remainder = 10 % 3
const power = 2 ** 10

// Assignment operators
let counter = 0
counter += 1
counter -= 1
counter *= 2
counter /= 2
counter %= 3
counter **= 2

// Comparison operators
const isEqual = 5 === 5
const isNotEqual = 5 !== 3
const isGreater = 10 > 5
const isLess = 5 < 10
const isGreaterOrEqual = 10 >= 10
const isLessOrEqual = 5 <= 10

// Logical operators (scope: keyword.operator.logical - bold)
const andResult = true && false
const orResult = true || false
const notResult = !true
const nullishCoalesce = null ?? "default"

// Bitwise operators
const bitwiseAnd = 5 & 3
const bitwiseOr = 5 | 3
const bitwiseXor = 5 ^ 3
const bitwiseNot = ~5
const leftShift = 5 << 1
const rightShift = 5 >> 1
const unsignedRightShift = -5 >>> 1

// Ternary operator
const ternaryResult = isEnabled ? "Yes" : "No"

// Optional chaining and nullish coalescing
const optionalAccess = dynamicModule?.property?.nested
const withDefault = optionalAccess ?? "fallback"

// Spread and rest operators
const spreadArray = [...[1, 2, 3], 4, 5]
const spreadObject = {...{a: 1}, b: 2}

// =============================================================================
// CONTROL FLOW KEYWORDS (scope: keyword.control - pink)
// =============================================================================

// Conditionals
if(isEnabled) {
  console.log("Enabled")
} else if(isDisabled) {
  console.log("Disabled")
} else {
  console.log("Unknown")
}

// Switch statement
switch(counter) {
  case 0:
    console.log("Zero")
    break
  case 1:
    console.log("One")
    break
  default:
    console.log("Other")
}

// Loops
for(let i = 0; i < 10; i++) {
  if(i === 5)
    continue

  if(i === 8)
    break

  console.log(i)
}

for(const item of spreadArray) {
  console.log(item)
}

for(const key in spreadObject) {
  console.log(key)
}

while(counter < 10) {
  counter++
}

do {
  counter--
} while(counter > 0)

// Exception handling
try {
  throw new Error("Something went wrong")
} catch(error) {
  console.error(error.message)
} finally {
  console.log("Cleanup")
}

// =============================================================================
// FUNCTIONS (scope: entity.name.function, support.function - orange)
// =============================================================================

// Function declaration
function regularFunction(param1, param2) {
  return param1 + param2
}

// Function expression
const functionExpression = function namedExpression(x) {
  return x * 2
}

// Arrow functions
const arrowFunction = (a, b) => a + b
const arrowSingleParam = x => x * 2
const arrowWithBody = (x, y) => {
  const result = x + y

  return result
}

// Async functions (scope: storage.modifier - purple)
async function asyncFunction() {
  const result = await Promise.resolve(42)

  return result
}

const asyncArrow = async() => {
  await new Promise(resolve => setTimeout(resolve, 1000))
}

// Generator functions
function* generatorFunction() {
  yield 1
  yield 2
  yield 3
}

async function* asyncGenerator() {
  yield await Promise.resolve(1)
  yield await Promise.resolve(2)
}

// IIFE (Immediately Invoked Function Expression)
;(function() {
  console.log("IIFE executed")
})()

// Higher-order functions
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map(n => n * 2)
const evens = numbers.filter(n => n % 2 === 0)
const total = numbers.reduce((acc, n) => acc + n, 0)
numbers.forEach(n => console.log(n))

// =============================================================================
// CLASSES (scope: entity.name.class, support.class - classGold)
// =============================================================================

// Class declaration (scope: keyword.declaration.class)
class Animal {
  // Private field (scope: variable.other.property)
  #privateField = "secret"

  // Static property
  static kingdom = "Animalia"

  // Constructor with parameters (scope: variable.parameter)
  constructor(name, age) {
    // this reference (scope: variable.language.this - peach)
    this.name = name
    this.age = age
    this.createdAt = new Date()
  }

  // Getter (scope: storage.type.accessor)
  get info() {
    return `${this.name} is ${this.age} years old`
  }

  // Setter
  set info(value) {
    const [name, age] = value.split(",")
    this.name = name
    this.age = parseInt(age, 10)
  }

  // Instance method
  speak() {
    console.log(`${this.name} makes a sound`)
  }

  // Static method
  static create(name, age) {
    return new Animal(name, age)
  }

  // Private method
  #privateMethod() {
    return this.#privateField
  }

  // Async method
  async fetchData() {
    return await Promise.resolve(this.name)
  }
}

// Class inheritance (scope: entity.other.inherited-class)
class Dog extends Animal {
  breed

  constructor(name, age, breed) {
    // super reference (scope: support.class.super - peach)
    super(name, age)
    this.breed = breed
  }

  // Method override
  speak() {
    super.speak()
    console.log(`${this.name} barks!`)
  }

  // Instance method with computed property access
  getBreedInfo() {
    return {
      breed: this.breed,
      name: this["name"],
      kingdom: Dog.kingdom
    }
  }
}

// Class expression
const Cat = class extends Animal {
  constructor(name, age) {
    super(name, age)
  }

  meow() {
    console.log("Meow!")
  }
}

// =============================================================================
// OBJECTS & PROPERTIES (scope: meta.property-name, variable.other.property)
// =============================================================================

const person = {
  // Property names (scope: support.type.property-name - pink2)
  firstName: "John",
  lastName: "Doe",
  age: 30,
  isActive: true,

  // Computed property name
  ["computed" + "Key"]: "computed value",

  // Shorthand property
  mutableVariable,

  // Method shorthand
  greet() {
    return `Hello, I'm ${this.firstName}`
  },

  // Getter/Setter in object
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  },

  set fullName(value) {
    const [first, last] = value.split(" ")
    this.firstName = first
    this.lastName = last
  },

  // Nested object
  address: {
    street: "123 Main St",
    city: "Anytown",
    country: "USA"
  }
}

// Destructuring with defaults
const {firstName, lastName, nickname = "None"} = person
const {address: {city, state = "Unknown"}} = person

// Array destructuring
const [first, second, ...rest] = numbers
const [, , third] = numbers

// Object property access
const streetName = person.address.street
const cityName = person["address"]["city"]

// =============================================================================
// BUILT-IN OBJECTS & METHODS (scope: support.function, support.class)
// =============================================================================

// Array methods
const arr = Array.from({length: 5}, (_, i) => i)
const isArr = Array.isArray(arr)
const joined = arr.join(", ")
const sliced = arr.slice(1, 3)
const found = arr.find(x => x > 2)
const index = arr.findIndex(x => x > 2)
const includes = arr.includes(3)
const every = arr.every(x => x >= 0)
const some = arr.some(x => x > 3)
const flat = [[1, 2], [3, 4]].flat()
const flatMapped = arr.flatMap(x => [x, x * 2])

// Object methods
const keys = Object.keys(person)
const values = Object.values(person)
const entries = Object.entries(person)
const frozen = Object.freeze({immutable: true})
const sealed = Object.seal({sealed: true})
const merged = Object.assign({}, person, {extra: "field"})
const hasOwn = Object.hasOwn(person, "firstName")

// String methods
const str = "Hello, World!"
const upper = str.toUpperCase()
const lower = str.toLowerCase()
const trimmed = "  spaces  ".trim()
const split = str.split(", ")
const replaced = str.replace("World", "Universe")
const startsWith = str.startsWith("Hello")
const endsWith = str.endsWith("!")
const padded = "5".padStart(3, "0")
const repeated = "abc".repeat(3)

// Number methods
const parsed = parseInt("42", 10)
const parsedFloat = parseFloat("3.14")
const fixed = PI.toFixed(2)
const isNaN_ = Number.isNaN(NaN)
const isFinite_ = Number.isFinite(Infinity)
const maxSafe = Number.MAX_SAFE_INTEGER

// Math object
const random = Math.random()
const rounded = Math.round(3.7)
const floored = Math.floor(3.9)
const ceiled = Math.ceil(3.1)
const absolute = Math.abs(-5)
const maximum = Math.max(1, 2, 3)
const minimum = Math.min(1, 2, 3)
const squareRoot = Math.sqrt(16)
const powerOf = Math.pow(2, 8)

// Date object
const now = new Date()
const timestamp = Date.now()
const isoString = now.toISOString()
const localString = now.toLocaleDateString()
const year = now.getFullYear()
const month = now.getMonth()

// JSON methods
const jsonString = JSON.stringify({key: "value"}, null, 2)
const jsonParsed = JSON.parse('{"key": "value"}')

// Promise methods
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done"), 1000)
})
const allPromises = Promise.all([promise, Promise.resolve(1)])
const racePromise = Promise.race([promise, Promise.resolve(2)])
const allSettled = Promise.allSettled([promise, Promise.reject("error")])

// Map and Set
const map = new Map([["key1", "value1"], ["key2", "value2"]])
map.set("key3", "value3")
const mapValue = map.get("key1")
const mapHas = map.has("key1")
const mapSize = map.size

const set = new Set([1, 2, 3, 3, 3])
set.add(4)
const setHas = set.has(2)
const setSize = set.size

// WeakMap and WeakSet
const weakMap = new WeakMap()
const weakSet = new WeakSet()

// Symbol
const sym = Symbol("description")
const globalSym = Symbol.for("global")
const symKey = Symbol.keyFor(globalSym)

// =============================================================================
// TYPE CHECKING (scope: keyword.operator.expression)
// =============================================================================

const typeofString = typeof "hello"
const typeofNumber = typeof 42
const typeofBoolean = typeof true
const typeofUndefined = typeof undefined
const typeofObject = typeof {}
const typeofFunction = typeof function() {}
const typeofSymbol = typeof Symbol()
const typeofBigInt = typeof 9007199254740991n

const instanceOfArray = [] instanceof Array
const instanceOfDate = new Date() instanceof Date
const instanceOfDog = new Dog("Rex", 3, "German Shepherd") instanceof Animal

// =============================================================================
// DECORATORS (experimental, scope: decorator)
// =============================================================================

// Note: Decorators require appropriate configuration
// @decorator
// @decoratorWithArgs('arg')
// class DecoratedClass {
//   @propertyDecorator
//   property = 'value'
//
//   @methodDecorator
//   method() {}
// }

// =============================================================================
// JSX/TSX ELEMENTS (scope: entity.name.tag, entity.other.attribute-name)
// =============================================================================

// Note: JSX requires appropriate configuration
// const element = <div className="container" id="main">
//   <h1 style={{color: 'red'}}>Title</h1>
//   <p data-testid="content">Content with {variable}</p>
//   <CustomComponent propName={value} {...spreadProps} />
//   <SelfClosing />
// </div>

// =============================================================================
// ERROR TYPES (scope: support.class)
// =============================================================================

const errors = {
  error: new Error("Generic error"),
  typeError: new TypeError("Type mismatch"),
  rangeError: new RangeError("Out of range"),
  referenceError: new ReferenceError("Not defined"),
  syntaxError: new SyntaxError("Invalid syntax"),
  uriError: new URIError("Invalid URI"),
  evalError: new EvalError("Eval error"),
  aggregateError: new AggregateError([new Error("1"), new Error("2")], "Multiple errors")
}

// =============================================================================
// PROXIES AND REFLECT (scope: support.class)
// =============================================================================

const handler = {
  get(target, prop, receiver) {
    console.log(`Getting ${prop}`)

    return Reflect.get(target, prop, receiver)
  },
  set(target, prop, value, receiver) {
    console.log(`Setting ${prop} to ${value}`)

    return Reflect.set(target, prop, value, receiver)
  },
  has(target, prop) {
    return Reflect.has(target, prop)
  },
  deleteProperty(target, prop) {
    return Reflect.deleteProperty(target, prop)
  }
}

const proxy = new Proxy({value: 42}, handler)

// =============================================================================
// ITERATORS AND GENERATORS
// =============================================================================

// Custom iterator
const iterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0
    const data = this.data

    return {
      next() {
        if(index < data.length) {
          return {value: data[index++], done: false}
        }

        return {value: undefined, done: true}
      }
    }
  }
}

// Using generators for iteration
function* range(start, end, step = 1) {
  for(let i = start; i < end; i += step) {
    yield i
  }
}

// =============================================================================
// LABELED STATEMENTS (scope: entity.name.goto-label)
// =============================================================================

outerLoop: for(let i = 0; i < 3; i++) {
  innerLoop: for(let j = 0; j < 3; j++) {
    if(i === 1 && j === 1) {
      break outerLoop
    }

    continue innerLoop
  }
}

// =============================================================================
// EXPORT STATEMENTS (scope: keyword.control.export)
// =============================================================================

export default Animal
export {Dog, Cat}
export {person as personData}
export const exportedConst = "exported"
/**
 *
 */
export function exportedFunction() {}
export class ExportedClass {}

// Re-exports
// export {something} from './other-module.js'
// export * from './all-exports.js'
// export * as namespace from './namespace.js'
