import * as Data from "./DataUtil.js"
import Evaluator from "./Evaluator.js"
import * as File from "./File.js"
export default class Compiler {
  #evaluator = new Evaluator()

  async compile(source) {
    const {config: sourceConfig} = source ?? {}
    const {vars: sourceVars} = source
    const {theme: sourceTheme} = source

    const evaluate = (...arg) => this.#evaluator.evaluate(...arg)

    const decomposedConfig = this.#decomposeObject(sourceConfig)
    const resolvedConfig = evaluate({
      vars: decomposedConfig,
      theme: decomposedConfig
    })
    const recomposedConfig = this.#composeObject(resolvedConfig)

    const header = {
      $schema: recomposedConfig.schema,
      name: recomposedConfig.name,
      type: recomposedConfig.type
    }

    // Let's get all of the imports!
    const imports = recomposedConfig.import ?? {}
    const imported = await this.#import(header, imports)

    const sourceObj = {}
    if(sourceVars && Object.keys(sourceVars).length > 0)
      sourceObj.vars = sourceVars

    if(sourceTheme && Object.keys(sourceTheme).length > 0)
      sourceObj.theme = sourceTheme

    const merged = Data.mergeObject({},
      imported.global,
      imported.colors,
      imported.tokenColors,
      sourceObj
    )

    const decomposedVars = this.#decomposeObject(merged.vars)

    const decomposedColors = this.#decomposeObject(merged.theme.colors)
    const evaluatedColors = evaluate({
      vars: decomposedVars, theme: decomposedColors
    })
    const colors = evaluatedColors.reduce((a, c) => this.#reducer(a, c), {})

    const decomposedtokenColors = this.#decomposeObject(
      merged.theme.tokenColors
    )

    const evaluatedTokenColors = evaluate({
      vars: decomposedVars, theme: decomposedtokenColors
    })
    const tokenColors = this.#composeArray(evaluatedTokenColors)
    const theme = {colors,tokenColors}
    const result = Data.mergeObject({},header,sourceConfig.custom ?? {},theme)

    return result
  }

  #reducer(acc, curr) {
    acc[curr.flatPath] = curr.value

    return acc
  }

  async #import(header, imports) {
    const result = {}

    for(const [sectionName,section] of Object.entries(imports)) {
      let inner = {}

      for(let [key,toImport] of Object.entries(section)) {
        if(!toImport)
          continue

        if(typeof toImport === "string")
          toImport = [toImport]

        if(!Data.isArrayUniform(toImport, "string"))
          throw new TypeError(
            `Import '${key}' must be a string or an array of strings.`
          )

        const resolved = toImport.map(target => {
          const subbing = this.#decomposeObject({path: target})
          const subbingWith = this.#decomposeObject(header)

          return this.#evaluator.evaluate({
            theme: subbing, vars: subbingWith
          })[0]
        })

        const files = await Promise.all(resolved.map(f =>
          File.resolveFilename(f.value)
        ))

        const datas = await Promise.all(files.map(f => File.loadDataFile(f)))
        const imported = Data.mergeObject({}, ...datas)

        inner = Data.mergeObject(inner, imported)
      }

      result[sectionName] = inner
    }

    return result
  }

  #decomposeObject(work, path = []) {
    const isObject = this.#isObject

    const result = []

    for(const key in work) {
      const currPath = [...path, key]
      const item = work[key]

      if(isObject(item)) {
        result.push(...this.#decomposeObject(work[key], currPath))
      } else if(Array.isArray(work[key])) {
        item.forEach((item, index) => {
          const path = [...currPath, String(index+1)]
          result.push({
            key,
            value: item,
            path,
            flatPath: path.join("."),
            array: {
              path: path.slice(0, -1),
              flatPath: path.slice(0, -1).join("."),
              index
            }
          })
        })
      } else {
        result.push({key, value: item, path, flatPath: currPath.join(".")})
      }
    }

    return result
  }

  #composeObject(decomposed) {
    const done = []

    return decomposed.reduce((acc, curr, _, arr) => {
      // Test for an array
      if("array" in curr) {
        const array = curr.array
        const fp = array.flatPath

        if(done.includes(array.flatPath))
          return acc

        const matches = arr.filter(a => "array" in a && a.array.flatPath === fp)
        const fps = matches.map(m => m.array.flatPath)
        const sorted = matches.sort((a,b) => a.array.index - b.array.index)
        const value = sorted.map(m => m.value)

        done.push(...fps)
        Data.setNestedValue(acc, array.path, value)
      } else {
        if(done.includes(curr.flatPath))
          return acc

        const keyPath = [...curr.path, curr.key]

        done.push(curr.flatPath)
        Data.setNestedValue(acc, keyPath, curr.value)
      }

      return acc
    }, {})
  }

  #composeArray(decomposed) {

    const sections = decomposed.reduce((acc,curr) => {
      if(!acc.includes(curr.path[0]))
        acc.push(curr.path[0])

      return acc
    }, [])
    const sorted = sections.sort((a,b) => parseInt(a) - parseInt(b))

    return sorted.map(curr => {
      const section = decomposed
        .filter(c => c.path[0] === curr)
        .map(c => {
          const newFlatPath = c.flatPath.slice(c.path[0].length+1)
          const newPath = c.path.slice(1)

          c.path = newPath
          c.flatPath = newFlatPath

          return c
        })

      return this.#composeObject(section)
    })
  }

  #isObject(value) {
    return typeof value === "object" &&
           value !== null &&
           !Array.isArray(value)
  }
}
