import JSON5 from "json5"
import Evaluate from "./Evaluator.js"

import { assert } from "./Valid.js"
import { isArrayUniform } from "./DataUtil.js"
import Evaluator from "./Evaluator.js"

const requiredFields = {
  name:  v => typeof(v) === "string" && v.length > 0,
  type:  v => typeof(v) === "string" && v.length > 0,
  theme: v => typeof(v) === "object",
}

export default class Compile {
  async compile(source) {
    this.#validateSource(source)

    const result = {
      name: source.name,
      type: source.type
    }

    const decomposer = ({path,value}) => ({path,value})
    const decomposed = {
      vars: this.#decomposeObject(source.vars, decomposer),
      theme: this.#decomposeObject(source.theme, decomposer),
    }

    const evaluated = new Evaluator().evaluate(decomposed)
    const reduced = evaluated.reduce((acc,curr) => {
      const {value,path} = curr
      const key = path.join(".")
      acc[key] = value
      return acc
    }, {})

    result.colors = reduced

    return result
  }

  #decomposeObject(work, cb, path = []) {
    const result = []
    const isObject = value =>
      typeof value === "object" && value !== null && !Array.isArray(value)

    for(const key in work) {
      const currPath = [...path, key]

      if(isObject(work[key])) {
        result.push(...this.#decomposeObject(work[key], cb, currPath))
      } if(Array.isArray(work[key])) {
        // console.debug(`%o is an array`, work[key])

        result.push(...(work[key].map((item, index, arr) => {
          // console.debug(`item: %s`, item)

          const curr = typeof item === "object" && item !== null
            ? this.#decomposeObject(item, cb, currPath)
            : arr[index]

          const result = {
            key,
            value: item,
            path: [...currPath, String(index+1)],
            object: work
          }

          // console.debug("result %o", result)

          return result
        })))

      } else {
        result.push(cb({key, value: work[key], path: currPath, object: work}))
      }

      result
    }

    // console.debug('result %O', result)

    return result
  }

  // not going to worry about validation just yet, because it's complicated.
  // let's just get the 🐄 moooo-ving first.
  #validateSource(source) {
    // Ensure we have all of the required fields in the source
    // object.
    this.#validateKeys(source)

    // Now ensure we have only strings and objects in the theme and vars.
    // If not vars, just put in an empty object, tis le fine.
    const subset = {
      vars: source.vars ?? {},
      theme: source.theme,
    }

    this.#validateStructure(subset)
  }

  #validateKeys(source) {
    for(const [k,v] of Object.entries(requiredFields)) {
      if(!source[k])
        throw new Error(`Missing key '${k}' in theme source.`)

      if(!v(source[k]))
        throw new TypeError(`Invalid value for key '${k}' in theme source.`)
    }
  }

  #validateStructure(source) {
    return
  }
}
