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

    // console.debug(`Decomposed: %o`, decomposed)

    const evaluated = new Evaluator().evaluate(decomposed)
    // console.debug(`Evaluated: %j`, evaluated)
    const reduced = evaluated.reduce((acc,curr) => {
      acc[curr.flatPath] = curr.value

      return acc
    }, {});

    result.colors = reduced

    return result
  }

  #decomposeObject(work, cb, path = []) {
    const result = []
    const isObject = value =>
      typeof value === "object" && value !== null && !Array.isArray(value)

    for(const key in work) {
      const currPath = [...path, key]
      const item = work[key]

      if(isObject(item)) {
        result.push(...this.#decomposeObject(work[key], cb, currPath))
      } else if(Array.isArray(work[key])) {
        item.forEach((item, index, arr) => {
          let curr

          if(typeof item === "object" && item !== null) {
            console.info("Calling decomposeObject [2]")
            curr = this.#decomposeObject(item, cb, currPath)
          } else {
            curr = arr[index]
          }

          const path = [...currPath, String(index+1)]
          result.push({
            key,
            value: item,
            path,
            flatPath: path.join(".")
          })
        })
      } else {
        // console.debug(`Key %s = %s`, key, item)
        result.push({key, value: item, path, flatPath: currPath.join(".")})
      }
    }

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
