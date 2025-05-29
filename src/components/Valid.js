import _assert from "node:assert/strict"

import * as DataUtil from "./DataUtil.js"

const {isType} = DataUtil

/**
 * Validates a value against a type
 *
 * @param {*} value - The value to validate
 * @param {string} type - The expected type in the form of "object",
 *                        "object[]", "object|object[]"
 * @param {object} [options] - Additional options for validation.
 */
function validType(value, type, options) {
  assert(
    isType(value, type, options),
    `Invalid type. Expected ${type}, got ${JSON.stringify(value)}`,
    1,
  )
}

/**
 * Asserts a condition
 *
 * @param {boolean} condition - The condition to assert
 * @param {string} message - The message to display if the condition is not
 *                           met
 * @param {number} [arg] - The argument to display if the condition is not
 *                         met (optional)
 */
function assert(condition, message, arg = null) {
  _assert(
    isType(condition, "boolean"),
    `Condition must be a boolean, got ${condition}`,
  )
  _assert(
    isType(message, "string"),
    `Message must be a string, got ${message}`,
  )
  _assert(
    arg !== null || arg !== undefined && typeof arg === "number",
    `Arg must be a number, got ${arg}`,
  )

  if(!condition)
    throw new Error(`${message}${arg ? `: ${arg}` : ""}`)
}

export {assert, validType}
