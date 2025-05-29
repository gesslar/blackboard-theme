export default class Evaluator {
  maxIterations = 10
  #match = /(\(\(.*?\)\))/g
  #extract = /\(\((.*)\)\)/

  evaluate({vars,theme}) {
    this.#resolveVariables(vars)
    this.#resolveTheme({theme, vars})

    return theme
  }

  #resolveVariables(vars) {
    let it = 0

    do {
      const assoc = this.#findAssoc(vars)

      this.#substitute(vars, assoc, [])
    } while(it++ < this.maxIterations && this.#hasUnresolvedTokens(vars))
  }

  #resolveTheme({theme,vars}) {
    let it = 0

    do {
      const assoc = this.#findAssoc(theme)

      this.#substitute(theme, assoc, vars)
    } while(it++ < this.maxIterations && this.#hasUnresolvedTokens(theme))
  }

  #substitute(source, assoc, vars) {
    assoc.forEach(([, matches], index) => {
      matches.forEach(match => {
        const flatPath = match.match(this.#extract)

        if(flatPath) {
          const target =
            source.find(element => element.flatPath === flatPath[1]) ||
            vars.find(element => element.flatPath === flatPath[1])

          if(target) {
            source[index].value = source[index].value.replace(match, target.value)
          } else {
            console.warn(`Could not find resolution for %s`, flatPath[1])
          }
        }
      })
    })
  }

  #hasUnresolvedTokens(arr) {
    return arr.some(item => item?.value?.match(this.#match) ?? true)
  }

  #findAssoc(arr) {
    const result = []

    // Array<Object<{path: Array<string>, key: string, value: string}>>
    arr.forEach(item => {
      const matches = item?.value?.match(this.#match)

      if(matches) {
        result.push([item, matches])
      } else {
        result.push([item,[]])
      }
    })

    return result
  }
}
