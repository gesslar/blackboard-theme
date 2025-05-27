export default class Evaluator {
  evaluate({vars,theme}) {
    return this.#resolveTheme({
      vars: this.#resolveVariables(vars),
      theme,
    })
  }

  #resolveVariables(vars) {
    const work = this.#findAssoc(vars)

    // console.debug("vars %o", work)

    return vars
  }

  #findAssoc(arr) {
    const result = []
    const pattern = /(\(\(.*?\)\))/g

    // Array<Object<{path: Array<string>, key: string, value: string}>>
    arr.forEach((item, index, arr) => {
      console.debug(`item.value %o`, item.value)
      const matches = item.value.match(pattern)

      if(matches) {
        result.push([item, matches])
      } else {
        result.push([item,[]])
      }
    })

    return result
  }

  #resolveTheme({vars,theme}) {
    const work = this.#findAssoc(theme)

    // console.debug("theme %o", work)

    return theme
  }
}
