import { isArrayUniform } from "./DataUtil.js"
import Evaluator from "./Evaluator.js"
import { loadDataFile, resolveFilename } from "./File.js"

export default class Compiler {
  #evaluator = new Evaluator()

  async compile(source) {
    const {config} = source

    const header = {name: config.name,type: config.type}
    const decomposed = {
      vars: this.#decomposeObject(source.vars),
      theme: this.#decomposeObject(source.theme),
    }
    const evaluated = this.#evaluator.evaluate(decomposed)
    const reduced = evaluated.reduce((a, c) => this.#reducer(a, c), {})
    const result = Object.assign({},
      header,
      config.custom ?? {},
      {colors: reduced}
    );

    const imported = await this.#import(header, {
      colors: source.config?.import?.colors ?? [],
      tokenColors: source.config?.import?.tokenColors ?? [],
    })

    Object.assign(result, imported)

    return result
  }

  #reducer(acc, curr) {
    acc[curr.flatPath] = curr.value

    return acc
  }

  async #import(header, imports) {
    const result = {}

    for(const [k,v] of Object.entries(imports)) {
      if(!v)
        continue;

      if(typeof v === "string")
        v = [v]
      if(!isArrayUniform(v, "string"))
        throw new TypeError(
          `Import '${k}' must be a string or an array of strings.`
        )

      const resolved = v.map(f => {
        const subbing = this.#decomposeObject({path: f})
        const subbingWith = this.#decomposeObject(header)

        return this.#evaluator.evaluate({theme: subbing, vars: subbingWith})[0]
      })

      const files = await Promise.all(resolved.map(f => resolveFilename(f.value)))
      const datas = await Promise.all(files.map(f => loadDataFile(f)))
      const imported = Object.assign({}, ...datas)

      Object.assign(result, imported)
    }

    return result
  }

  #decomposeObject(work, path = []) {
    const cb = this.#decomposer
    const isObject = this.#isObject

    const result = []

    for(const key in work) {
      const currPath = [...path, key]
      const item = work[key]

      if(isObject(item)) {
        result.push(...this.#decomposeObject(work[key], currPath))
      } else if(Array.isArray(work[key])) {
        item.forEach((item, index, arr) => {
          let curr

          if(typeof item === "object" && item !== null) {
            console.info("Calling decomposeObject [2]")
            curr = this.#decomposeObject(item, currPath)
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
        result.push({key, value: item, path, flatPath: currPath.join(".")})
      }
    }

    return result
  }

  #decomposer({path,value}) { return {path,value}; }

  #isObject(value) {
    return typeof value === "object" &&
           value !== null &&
           !Array.isArray(value)
  }
}
